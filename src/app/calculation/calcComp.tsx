'use client'

import { useState } from 'react'
import { Button } from 'antd'
import axios from 'axios'
import { Order } from '@/models/models'

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'a', label: '打85移门料子' },
  { value: 'b', label: '极窄双扇1635' },
  { value: 'c', label: '极窄三联动1635(不锈钢下轨)' },
]

export default function CalcComp({ idd }:{ idd:number }) {
  const [selectedOption, setSelectedOption] = useState<string>('a')
  const [note, setNote] = useState<string>('')
  const [width, setWidth] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [widthError, setWidthError] = useState<string>('')
  const [heightError, setHeightError] = useState<string>('')

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  const numberOrEmpty = (val: number) : string => (Number.isNaN(val) ? '' : val.toString())

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setWidth(value)
    if (value && Number.isNaN(parseFloat(value))) {
      setWidthError('请输入有效的数字')
    } else {
      setWidthError('')
    }
  }

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setHeight(value)
    if (value && Number.isNaN(parseFloat(value))) {
      setHeightError('请输入有效的数字')
    } else {
      setHeightError('')
    }
  }

  const calculateOutputA = (lwidth: string, lheight: string) : Order => {
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
      guangQi: guangQiVal,
      shangXiaFang: shangXiaFangVal,
      gouQi: gouQiVal,
      bianFeng: bianFengVal,
      shangXiaGui: shangXiaGuiVal,
      glassWidth: glassWidthVal,
      glassHeight: glassHeightVal,
    } as Order
  }

  const calculateOutputB = (lwidth: string, lheight: string) : Order => {
    const widthVal = parseFloat(lwidth)
    const heightVal = parseFloat(lheight)

    const guangQiVal = heightVal - 85 + 7
    const shangXiaFangVal = (widthVal - 34 + 16) / 2
    const bianFengVal = heightVal
    const shangXiaGuiVal = widthVal - 4
    const glassWidthVal = shangXiaFangVal - 18
    const glassHeightVal = guangQiVal - 18

    return {
      guangQi: guangQiVal,
      shangXiaFang: shangXiaFangVal,
      gouQi: 0,
      bianFeng: bianFengVal,
      shangXiaGui: shangXiaGuiVal,
      glassWidth: glassWidthVal,
      glassHeight: glassHeightVal,
    } as Order
  }

  const calculateOutputC = (inWidth: string, inHeight: string):Order => {
    const widthVal = parseFloat(inWidth)
    const heightVal = parseFloat(inHeight)

    const guangQiVal = heightVal - 88 + 7
    const shangXiaFangVal = (widthVal - 34 + 32) / 3
    const gouQiVal = guangQiVal
    const bianFengVal = heightVal
    const shangXiaGuiVal = widthVal - 4
    const glassWidthVal = shangXiaFangVal - 18
    const glassHeightVal = guangQiVal - 18

    return {
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
    width: parseFloat(width),
    height: parseFloat(height),
    userID: 0,
    timestamp: new Date(),
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
      note,
      width: parseFloat(width),
      height: parseFloat(height),
      timestamp: new Date(),
    }

    if (widthError || heightError) return outputVal
    switch (selectedOption) {
      case 'a':
        outputVal = calculateOutputA(width, height)
        break
      case 'b':
        outputVal = calculateOutputB(width, height)
        break
      case 'c':
        outputVal = calculateOutputC(width, height)
        break
      default:
    }

    // setOrder(outputVal)
    return formatOutput(outputVal)
  }

  const order = calculateOutputs()

  const handleAddOrder = async () => {
    console.log('outputs order:', order)
    try {
      const res = await axios.post('api/mock/orders', order)
      if (res.status === 200) {
        console.log('200')
      }
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

      <div
        className="column"
        style={{
          flex: 1, padding: 5, maxWidth: 100, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`width-${idd}`}>宽</label>
        <input type="text" id={`width-${idd}`} style={{ maxWidth: 80 }} value={width} onChange={handleWidthChange} />
        {widthError && <span style={{ color: 'red' }}>{widthError}</span>}
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, maxWidth: 100, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`height-${idd}`}>高</label>
        <input type="text" id={`height-${idd}`} style={{ maxWidth: 80 }} value={height} onChange={handleHeightChange} />
        {heightError && <span style={{ color: 'red' }}>{heightError}</span>}
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: 80, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`guang_gou-${idd}`}>
          {selectedOption === 'b' ? '光企(2支)' : '光企(4支)'}
        </label>
        <output id={`guang_gou-${idd}`}>{Number.isNaN(order.guangQi) ? '' : order.guangQi}</output>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: 120, maxWidth: 150, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`shang_xia_fang-${idd}`}>
          {selectedOption === 'c' ? '上下方(6支)' : '上下方(4支)'}
        </label>
        <output id={`shang_xia_fang-${idd}`}>{Number.isNaN(order.shangXiaFang) ? '' : order.shangXiaFang}</output>
      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`gou_qi-${idd}`}>
          {selectedOption === 'b' ? '' : '勾企'}
        </label>
        <output id={`gou_qi-${idd}`}>{selectedOption === 'b' ? '' : numberOrEmpty(order.gouQi)}</output>

      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`bian_feng-${idd}`}>
          边封
        </label>
        <output id={`bian_feng-${idd}`}>{Number.isNaN(order.bianFeng) ? '' : order.bianFeng}</output>
      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`shang_xia_gui-${idd}`}>
          上下轨
        </label>
        <output id={`shang_xia_gui-${idd}`}>{Number.isNaN(order.shangXiaGui) ? '' : order.shangXiaGui}</output>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: 80, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`glass_width-${idd}`}>
          玻璃宽度
        </label>
        <output id={`glass_width-${idd}`}>{Number.isNaN(order.glassWidth) ? '' : order.glassWidth}</output>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: 80, boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`glass_height-${idd}`}>
          玻璃高度
        </label>
        <output id={`glass_height-${idd}`}>{Number.isNaN(calculateOutputs().glassHeight) ? '' : calculateOutputs().glassHeight}</output>

      </div>

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <Button type="primary" onClick={handleAddOrder}>确认</Button>
      </div>

    </div>
  )
}

/*
          <Button variant="success" onClick={() => router.push('/pokemons/create')}>
            <FontAwesomeIcon icon={faPlus} fixedWidth />
            Add new
          </Button>

*/
