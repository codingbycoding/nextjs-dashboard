'use client'

import { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import { Format, Order } from '@/models/models'

type Option = {
  value: string;
  label: string;
}

const options = [
  { value: 'a', label: '打85移门料子' },
  { value: 'b', label: '极窄双扇1635' },
  { value: 'c', label: '极窄三联动1635(不锈钢下轨)' },
]

const glassOptions: Option[] = [
  { value: 'a', label: '白波' },
  { value: 'b', label: '磨砂' },
  { value: 'c', label: '长虹' },
]

let selectedFormation

export default function CalcCustom({ idd, userID }:{ idd:number; userID:number }) {
  const [selectedFormationX, setSelectedFormation] = useState(undefined)
  const [selectedOption, setSelectedOption] = useState<string>('a')
  const [glassSelectedOption, setGlassSelectedOption] = useState<string>('a')
  const [glassFSelectedOption, setGlassFSelectedOption] = useState<string>('a')
  const [note, setNote] = useState<string>('')
  const [宽, set宽] = useState<string>('')
  const [高, set高] = useState<string>('')
  const [widthError, setWidthError] = useState<string>('')
  const [heightError, setHeightError] = useState<string>('')
  const [confirmError, setConfirmError] = useState<string>('')

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
    selectedFormation = dbFormats.find((format) => format.name === event.target.value)
    console.log('setSelectedOption:', selectedFormation)
    setSelectedFormation(selectedFormation)
  }

  const handleGlassOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGlassSelectedOption(event.target.value)
  }

  const handleGlassFOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGlassFSelectedOption(event.target.value)
  }

  const numberOrEmpty = (val: number) : string => (Number.isNaN(val) ? '' : val.toString())

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value && Number.isNaN(parseFloat(value))) {
      setWidthError('请输入有效的数字')
    } else {
      setWidthError('')
      set宽(value)
    }
  }

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value && Number.isNaN(parseFloat(value))) {
      setHeightError('请输入有效的数字')
    } else {
      setHeightError('')
      set高(value)
    }
  }

  const calculateOutputA = (formatName: string, lwidth: string, lheight: string) : Order => {
    const widthVal = parseFloat(lwidth)
    const heightVal = parseFloat(lheight)

    const guangQiVal = heightVal - 53
    const shangXiaFangVal = (widthVal - 35 + 85) / 2
    const gouQiVal = guangQiVal - 17
    const bianFengVal = heightVal
    const shangXiaGuiVal = widthVal - 56
    const glassWidthVal = shangXiaFangVal - 148
    const glassHeightVal = guangQiVal - 148

    return {
      formatName,
      guangQi: guangQiVal,
      shangXiaFang: shangXiaFangVal,
      gouQi: gouQiVal,
      bianFeng: bianFengVal,
      shangXiaGui: shangXiaGuiVal,
      glassWidth: glassWidthVal,
      glassHeight: glassHeightVal,
    } as Order
  }

  const formatValue = (value: number, decimalPlaces: number): number => {
    const isInteger = Number.isInteger(value)
    const formattedValue = isInteger ? value.toFixed(0) : value.toFixed(decimalPlaces)
    return Number.parseFloat(formattedValue)
  }

  const formatOutput = (lval: Order) : Order => ({
    formatName: lval.formatName,
    guangQi: formatValue(lval?.guangQi ?? 0, 1),
    shangXiaFang: formatValue(lval.shangXiaFang, 1),
    gouQi: formatValue(lval.gouQi, 1),
    bianFeng: formatValue(lval.bianFeng, 1),
    shangXiaGui: formatValue(lval.shangXiaGui, 1),
    glassWidth: formatValue(lval.glassWidth, 1),
    glassHeight: formatValue(lval.glassHeight, 1),
    id: 0,
    note,
    formatID: 0,
    width: parseFloat(宽),
    height: parseFloat(高),
    userID: 0,
  })

  const calculateOutputs = () : Order => {
    let outputVal: Order = {
      guangQi: 0,
      shangXiaFang: 0,
      gouQi: 0,
      bianFeng: 0,
      shangXiaGui: 0,
      glassWidth: 0,
      glassHeight: 0,
      id: 0,
      userID: 0,
      formatID: 0,
      formatName: '',
      note,
      width: parseFloat(宽),
      height: parseFloat(高),
    }

    if (widthError || heightError) return outputVal
    switch (selectedOption) {
      case 'a':
        outputVal = calculateOutputA(options[0].label, 宽, 高)
        break
      default:
    }

    // setOrder(outputVal)
    return formatOutput(outputVal)
  }

  const order = calculateOutputs()

  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  const [dbFormats, setDbFormats] = useState([])

  useEffect(() => {
    const getFormats = async () => {
      try {
        const res = await axios.get('/api/mock/formats')
        if (res.status === 200) {
          console.log('dbFormats', res.data.formats)
          while (options.pop()) ;

          const newFormats = res.data.formats.map((format: Format) => {
            try {
              format.equation = JSON.parse(format.equation)
              options.push({ value: format.name, label: format.name })
              return format
            } catch (err) {
              console.error('Error parsing equation:', err)
              return { name: format.name, equation: {} }
            }
          })

          console.log('options:', options)
          selectedFormation = newFormats[0]
          setSelectedFormation(selectedFormation)
          setDbFormats(newFormats)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getFormats()
  }, [userID]) // Depend on userID to refetch when it changes

  const handleAddOrder = async () => {
    console.log('outputs order:', order)
    if (Number.isNaN(width) || Number.isNaN(height) || note === '') {
      console.error('error width and heigth should be numbers')
      setConfirmError('请检查所有输入')
      return
    }

    try {
      const res = await axios.post('api/mock/orders', order)
      if (res.status === 200) {
        console.log('200')
      }
      refresh()
    } catch (err) {
      if (err instanceof Error) {
        // setError(err.message)
        console.log('err:', err)
      }
    } finally {
      // setSubmitting(false)
      console.log('finally')
    }
  }

  return (
    <div
      id={`calcComp-${idd}`}
      style={{
        display: 'flex', flexWrap: 'nowrap', height: '60px', margin: 0, padding: 0,
      }}
    >
      <div
        className="column"
        style={{
          flex: 1, padding: 5, maxWidth: 160, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`note-${idd}`}>备注</label>
        <input type="text" id={`note-${idd}`} style={{ maxWidth: 160 }} onChange={(e) => setNote(e.target.value)} />
      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`dropdown-${idd}`}>选择类型:</label>
        <select id={`dropdown-${idd}`} style={{ minHeight: 24 }} value={selectedOption} onChange={handleOptionChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`glass-dropdown-${idd}`}>正面玻璃:</label>
        <select id={`glass-dropdown-${idd}`} style={{ minHeight: 24 }} value={glassSelectedOption} onChange={handleGlassOptionChange}>
          {glassOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`glass-f-dropdown-${idd}`}>背面玻璃:</label>
        <select id={`glass-f-dropdown-${idd}`} style={{ minHeight: 24 }} value={glassFSelectedOption} onChange={handleGlassFOptionChange}>
          {glassOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, maxWidth: 100, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`width-${idd}`}>宽</label>
        <input type="text" id={`width-${idd}`} style={{ maxWidth: 80 }} value={宽} onChange={handleWidthChange} />
        {widthError && <span style={{ color: 'red' }}>{widthError}</span>}
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, maxWidth: 100, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`height-${idd}`}>高</label>
        <input type="text" id={`height-${idd}`} style={{ maxWidth: 80 }} value={高} onChange={handleHeightChange} />
        {heightError && <span style={{ color: 'red' }}>{heightError}</span>}
      </div>

      {selectedFormationX && selectedFormationX.equation ? (
        Object.entries(selectedFormationX.equation).map(([key, value]) => (
          <div
            key={key}
            className="column"
            style={{
              flex: 1,
              padding: 5,
              minWidth: 120,
              maxWidth: 150,
              boxSizing: 'border-box',
            }}
          >
            <label htmlFor={key}>{key}</label>
            <output id={key}>{高 !== '' && 宽 !== '' && (new Function('宽', '高', `return ${value}`))(宽, 高)}</output>

          </div>
        ))
      ) : (
        <div>No equation data available</div>
      )}

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <Button id="add-order" type="primary" onClick={handleAddOrder}>确认</Button>
        {confirmError && <span style={{ color: 'red' }}>{confirmError}</span>}
      </div>

    </div>
  )
}
