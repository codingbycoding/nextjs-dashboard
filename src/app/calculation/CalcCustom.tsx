'use client'

import { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from 'axios'

import {
  Format, Color, Glass, Order,
  Customer,
} from '@/models/models'

type Option = {
  value: string;
  label: string;
}

const customerOpts = [
  { value: 'a', label: '打85移门料子' },
  { value: 'b', label: '极窄双扇1635' },
  { value: 'c', label: '极窄三联动1635(不锈钢下轨)' },
]

const formatOpts = [
  { value: 'a', label: '打85移门料子' },
  { value: 'b', label: '极窄双扇1635' },
  { value: 'c', label: '极窄三联动1635(不锈钢下轨)' },
]

const glassOpts: Option[] = [
  { value: 'a', label: '白玻' },
  { value: 'b', label: '磨砂' },
  { value: 'c', label: '长虹' },
]

const colorOpts: Option[] = [
  { value: 'a', label: '白铝' },
  { value: 'b', label: '彩铝' },
  { value: 'c', label: '凤铝' },
]

let selectedFormat: Format
let selectedCustomer: Customer

export default function CalcCustom({ idd, userID }:{ idd:number; userID:number }) {
  const [selectedCustomerX, setSelectedCustomer] = useState(undefined as unknown as Format)
  const [selectedFormatX, setSelectedFormat] = useState(undefined as unknown as Format)
  const [selectedColor, setSelectedColor] = useState(undefined as unknown as Color)
  const [selectedGlass, setSelectedGlass] = useState(undefined as unknown as Glass)

  const [selectedCustomerOpt, setSelectedCustomerOpt] = useState<string>('a')
  const [selectedFormatOpt, setSelectedFormatOpt] = useState<string>('a')
  const [colorSelectedOpt, setColorSelectedOpt] = useState<string>('a')
  const [glassSelectedOpt, setGlassSelectedOpt] = useState<string>('a')
  const [glassFSelectedOpt, setGlassFSelectedOpt] = useState<string>('a')

  const [note, setNote] = useState<string>('')

  const [宽, set宽] = useState<string>('')
  const [高, set高] = useState<string>('')
  const [widthError, setWidthError] = useState<string>('')
  const [heightError, setHeightError] = useState<string>('')

  const [confirmError, setConfirmError] = useState<string>('')

  const [dbFormats, setDbFormats] = useState([] as Format[])
  const [dbCustomers, setDbCustomers] = useState([] as Customer[])

  const handleCustomerOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomerOpt(event.target.value)
    selectedCustomer = dbCustomers.find((customer) => customer.name === event.target.value) as Customer
    console.log('setSelectedCustomer:', selectedCustomer)
    setSelectedCustomer(selectedCustomer)
  }

  const handleFormatOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormatOpt(event.target.value)
    selectedFormat = dbFormats.find((format) => format.name === event.target.value) as Format
    console.log('setSelectedFormat:', selectedFormat)
    setSelectedFormat(selectedFormat)
  }

  const handleGlassOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGlassSelectedOpt(event.target.value)
  }

  const handleColorOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColorSelectedOpt(event.target.value)
  }

  const handleGlassFOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGlassFSelectedOpt(event.target.value)
  }

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

    /*
    if (value !== '' && 宽 !== '') {

    }
    */
  }

  const calcOrder = () => {
    const order = {
      formatName: selectedFormatX?.name ?? '',
      id: 0,
      note,
      formatID: 0,
      width: parseFloat(宽),
      height: parseFloat(高),
      equation: { 宽, 高 },
      userID: 0,
    } as unknown as Order

    if (selectedFormatX === undefined || selectedFormatX?.equation === undefined) {
      return order
    }

    // Use reduce instead of map to avoid creating a new object in each iteration
    const updatedOrder = Object.entries(selectedFormatX.equation).reduce(
      (acc, [key, value]) => {
        const val = (new Function('宽', '高', `return ${value}`))(宽, 高)
        return { ...acc, equation: { ...acc.equation, [key]: val } }
      },
      order,
    )

    console.log('order:', updatedOrder)
    return updatedOrder
  }

  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  useEffect(() => {
    const getColors = async () => {
      try {
        const res = await axios.get('/api/mock/colors')
        if (res.status === 200) {
          console.log('dbColors', res.data.colors)
          while (colorOpts.pop()) ;

          const newColors = res.data.colors
          newColors.forEach((color : Color) => {
            colorOpts.push({ value: color.name, label: color.name })
          })
          console.log('colorOptions:', colorOpts)
          setSelectedColor(newColors[0])
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }
    getColors()
  }, [userID])

  useEffect(() => {
    const getGlasses = async () => {
      try {
        const res = await axios.get('/api/mock/glasses')
        if (res.status === 200) {
          console.log('dbGlasses', res.data.glasses)
          while (glassOpts.pop()) ;

          const newGlasses = res.data.glasses
          newGlasses.forEach((glass : Glass) => {
            glassOpts.push({ value: glass.name, label: glass.name })
          })
          console.log('glassOptions:', glassOpts)
          setSelectedGlass(newGlasses[0])
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }
    getGlasses()
  }, [userID])

  useEffect(() => {
    const getCustomers = async () => {
      try {
        const res = await axios.get('/api/mock/customers')
        if (res.status === 200) {
          console.log('dbCustomers', res.data.customers)
          while (customerOpts.pop()) ;

          const newCustomers = res.data.customers.map((customer: Customer) => {
            try {
              // customers.equation = JSON.parse(customers.equation)
              customerOpts.push({ value: customer.name, label: customer.name })
              return customer
            } catch (err) {
              console.error('Error parsing equation:', err)
              return { name: customer.name, equation: {} }
            }
          })

          console.log('customerOpts:', customerOpts)
          selectedCustomer = newCustomers[0]
          setSelectedCustomer(selectedCustomer)
          setDbCustomers(newCustomers)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getCustomers()
  }, [userID])

  useEffect(() => {
    const getFormats = async () => {
      try {
        const res = await axios.get('/api/mock/formats')
        if (res.status === 200) {
          console.log('dbFormats', res.data.formats)
          while (formatOpts.pop()) ;

          const newFormats = res.data.formats.map((format: Format) => {
            try {
              format.equation = JSON.parse(format.equation)
              formatOpts.push({ value: format.name, label: format.name })
              return format
            } catch (err) {
              console.error('Error parsing equation:', err)
              return { name: format.name, equation: {} }
            }
          })

          console.log('options:', formatOpts)
          selectedFormat = newFormats[0]
          setSelectedFormat(selectedFormat)
          setDbFormats(newFormats)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getFormats()
  }, [userID])

  const handleAddOrder = async () => {
    if (isNaN(宽) || isNaN(高) || note === '') {
      console.error('error 宽 and 高 should be numbers')
      setConfirmError('请检查所有输入')
      return
    }

    const order = calcOrder()
    order.equation = JSON.stringify(order.equation)

    console.log('outputs order:', order)

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
        display: 'flex', flexWrap: 'nowrap', height: '60px', margin: 0, padding: 0, alignItems: 'left',
      }}
    >

      <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
        <label htmlFor={`dropdown-customer-${idd}`}>选择客户:</label>
        <select id={`dropdown-customer-${idd}`} style={{ minHeight: 24 }} value={selectedCustomerOpt} onChange={handleCustomerOptionChange}>
          {customerOpts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

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
        <select id={`dropdown-${idd}`} style={{ minHeight: 24 }} value={selectedFormatOpt} onChange={handleFormatOptionChange}>
          {formatOpts.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: '92px', boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`color-dropdown-${idd}`} style={{ display: 'block' }}>型材类型</label>
        <select id={`color-dropdown-${idd}`} style={{ minHeight: 24 }} value={colorSelectedOpt} onChange={handleColorOptionChange}>
          {colorOpts.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: '92px', boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`glass-dropdown-${idd}`} style={{ display: 'block' }}>正面玻璃</label>
        <select id={`glass-dropdown-${idd}`} style={{ minHeight: 24 }} value={glassSelectedOpt} onChange={handleGlassOptionChange}>
          {glassOpts.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className="column"
        style={{
          flex: 1, padding: 5, minWidth: '92px', boxSizing: 'border-box',
        }}
      >
        <label htmlFor={`glass-f-dropdown-${idd}`} style={{ display: 'block' }}>背面玻璃</label>
        <select id={`glass-f-dropdown-${idd}`} style={{ minHeight: 24 }} value={glassFSelectedOpt} onChange={handleGlassFOptionChange}>
          {glassOpts.map((option) => (
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

      {selectedFormatX && selectedFormatX.equation ? (
        Object.entries(selectedFormatX.equation).map(([key, value]) => (
          <div
            key={key}
            className="column"
            style={{
              flex: 1,
              padding: 5,
              minWidth: 70,
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
