/* eslint-disable @typescript-eslint/no-implied-eval */

'use client'

import { useEffect, useState } from 'react'
import { Button } from 'antd'
import axios from 'axios'

import {
  Format, Color, Glass, Order, Customer,
} from '@/models/models'

type Option = {
  value: string;
  label: string;
}

type KV = {
  k: string;
  v: string;
}

const customerOpts = [] as Option[]
const formatOpts = [] as Option[]
const glassOpts = [] as Option[]
const colorOpts = [] as Option[]

export default function CalcCustom({ idd, userID }:{ idd:number; userID:number }) {
  const [selectedCustomer, setSelectedCustomer] = useState(undefined as unknown as Customer)
  const [selectedFormat, setSelectedFormat] = useState(undefined as unknown as Format)

  const [selectedColorOpt, setColorSelectedOpt] = useState<string>('')
  const [selectedGlassOpt, setGlassSelectedOpt] = useState<string>('')
  const [selectedGlassFOpt, setGlassFSelectedOpt] = useState<string>('')

  const [note, setNote] = useState<string>('')

  const [宽, set宽] = useState<string>('')
  const [高, set高] = useState<string>('')
  const [widthError, setWidthError] = useState<string>('')
  const [heightError, setHeightError] = useState<string>('')

  const [confirmError, setConfirmError] = useState<string>('')

  const [dbFormats, setDbFormats] = useState([] as Format[])
  const [dbCustomers, setDbCustomers] = useState([] as Customer[])

  const handleCustomerOptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomer(dbCustomers.find((customer) => customer.name === event.target.value) as Customer)
  }

  const handleFormatOptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormat(dbFormats.find((format) => format.name === event.target.value) as Format)
  }

  const handleColorOptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColorSelectedOpt(event.target.value)
  }

  const handleGlassOptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGlassSelectedOpt(event.target.value)
  }

  const handleGlassFOptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
  }

  const calcOrder = () => {
    const order = {
      formatName: selectedFormat?.name ?? '',
      customerID: selectedCustomer?.id,
      note,
      formatID: 0,
      width: parseFloat(宽),
      height: parseFloat(高),
      equation: [],
      userID: 0,
    } as unknown as Order

    if (selectedFormat === undefined || selectedFormat?.equation === undefined) {
      return order
    }

    order.equation = [
      ...(order.equation as object[] || []),
      { k: '客户', v: selectedCustomer?.name ?? '' },
      { k: '备注', v: note ?? '' },
      { k: '类型', v: selectedFormat?.name ?? '' },
      { k: '型材', v: selectedColorOpt ?? '' },
      { k: '宽', v: 宽 ?? '' },
      { k: '高', v: 高 ?? '' },
      { k: '正面玻璃类型', v: selectedGlassOpt ?? '' },
      { k: '背面玻璃类型', v: selectedGlassFOpt ?? '' }]

    // Use reduce instead of map to avoid creating a new object in each iteration
    const updatedOrder = Object.entries(selectedFormat.equation as object[]).reduce(
      (acc, [key, value]) => {
        const val = (new Function('宽', '高', `return ${value}`))(宽, 高)
        return { ...acc, equation: [...(acc.equation as object[] || []), { k: key, v: val }] }
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
          if (newColors.length > 0) {
            setColorSelectedOpt(newColors[0].name)
          }
          // setSelectedColor(newColors[0])
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
          if (newGlasses.length > 0) {
            setGlassSelectedOpt(newGlasses[0].name)
            setGlassFSelectedOpt(newGlasses[0].name)
          }
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
          setSelectedCustomer(newCustomers[0])
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
              format.equation = JSON.parse(format.equation as string) as object[]
              formatOpts.push({ value: format.name, label: format.name })
              return format
            } catch (err) {
              console.error('Error parsing equation:', err)
              return { name: format.name, equation: {} }
            }
          })

          console.log('options:', formatOpts)
          setSelectedFormat(newFormats[0])
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
    if (isNaN(parseFloat(宽)) || isNaN(parseFloat(高)) || note === '') {
      console.error('error 宽 and 高 should be numbers')
      setConfirmError('请检查所有输入')
      return
    }

    const order = calcOrder() as Order
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
        <select id={`dropdown-customer-${idd}`} style={{ minHeight: 24 }} value={selectedCustomer?.name ?? ''} onChange={handleCustomerOptChange}>
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
        <label htmlFor={`dropdown-format-${idd}`}>选择类型:</label>
        <select id={`dropdown-format-${idd}`} style={{ minHeight: 24 }} value={selectedFormat?.name ?? ''} onChange={handleFormatOptChange}>
          {formatOpts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
        <label htmlFor={`dropdown-color-${idd}`} style={{ display: 'block' }}>型材类型</label>
        <select id={`dropdown-color-${idd}`} style={{ minHeight: 24 }} value={selectedColorOpt} onChange={handleColorOptChange}>
          {colorOpts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
        <select id={`glass-dropdown-${idd}`} style={{ minHeight: 24 }} value={selectedGlassOpt} onChange={handleGlassOptChange}>
          {glassOpts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
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
        <select id={`glass-f-dropdown-${idd}`} style={{ minHeight: 24 }} value={selectedGlassFOpt} onChange={handleGlassFOptChange}>
          {glassOpts.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
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

      {selectedFormat && selectedFormat.equation ? (
        Object.entries(selectedFormat.equation).map(([key, value]) => (
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
            <output id={key}>{高 !== '' && 宽 !== '' && (new Function('宽', '高', `return Number(${value})`))(Number(宽), Number(高))}</output>
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
