'use client'

import {
  Button, Checkbox, Input, Modal,
} from 'antd'
import axios from 'axios'

import { ChangeEvent, useState } from 'react'

import { Order } from '@/models/models'
import form from 'antd/es/form'

type KV = {
  k: string;
  v: string;
}

const CalcCustomEntryVar = ({ order } : { order: Order }) => {
  console.log(`order : ${order}`)

  const [isModalVisible, setIsModalVisible] = useState <boolean>(false)
  const [isByArea, setIsByArea] = useState <boolean>(true)

  const [priceByAreaError, setPriceByAreaError] = useState<string>('')
  const [priceByNumberError, setPriceByNumberError] = useState<string>('')

  const [pricePerArea, setPricePerArea] = useState<number>(100.0)
  const [pricePerNumber, setPricePerNumber] = useState<number>(200.0)
  const [count, setCount] = useState<number>(1)

  const [totalPriceByArea, setTotalPriceByArea] = useState<number>(100 * (order.width / 1000) * (order.height / 1000))
  const [totalPriceByNumber, setTotalPriceByNumber] = useState<number>(200 * 1)

  const decodedEquation = JSON.parse(order.equation as string ?? '') as KV[]
  // const decodedEquation = JSON.parse(order.equation as unknown as string ?? '')

  const handlePricePerAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value && Number.isNaN(parseFloat(value))) {
      setPriceByAreaError('请输入有效的数字')
    } else {
      setPriceByAreaError('')

      const perPrice = Number(value)
      setPricePerArea(perPrice)
      setTotalPriceByArea(perPrice * (order.width / 1000) * (order.height / 1000))
    }
  }

  const handlePricePerNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value && Number.isNaN(parseFloat(value))) {
      setPriceByNumberError('请输入有效的数字')
    } else {
      setPriceByNumberError('')

      const perPrice = Number(value)
      setPricePerNumber(perPrice)
      setTotalPriceByNumber(perPrice)
    }
  }

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value && Number.isNaN(parseFloat(value))) {
      setPriceByAreaError('请输入有效的数字')
    } else {
      setPriceByAreaError('')

      const count = Number(value)
      setCount(count)
      setTotalPriceByArea(count * pricePerArea * (order.width / 1000) * (order.height / 1000))
      setTotalPriceByNumber(count * pricePerNumber)
    }
  }

  const updateOrderStatus = async (status: number) => {
    console.log('order.id:', order.id)

    let totalPrice = totalPriceByArea
    if (!isByArea) {
      totalPrice = totalPriceByNumber
    }

    try {
      const res = await axios.patch(`api/mock/orders/${order.id}`, { status, count, totalPrice })
      if (res.status === 200) {
        console.log('status:', 200)
      }

      // eslint-disable-next-line no-restricted-globals
      location.reload()
    } catch (err) {
      if (err instanceof Error) {
        // setError(err.message)
        console.log('err:', err)
      }
    } finally {
      // setSubmitting(false)
      console.log('finally:')
    }
  }

  const printOrder = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('printOrder order.id:', order.id)

    updateOrderStatus(2)
    const printContents = document?.getElementById(`print-area-${order.id}`)?.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents ?? ''

    window.print()
    document.body.innerHTML = originalContents
  }

  const deleteOrder = async () => {
    console.log('order.id:', order.id)
    try {
      const res = await axios.delete(`api/mock/orders/${order.id}`)
      if (res.status === 200) {
        console.log('status:', 200)
      }

      // eslint-disable-next-line no-restricted-globals
      location.reload()
    } catch (err) {
      if (err instanceof Error) {
        // setError(err.message)
        console.log('err:', err)
      }
    } finally {
      // setSubmitting(false)
      console.log('finally:')
    }
  }

  const formatDateTime = (date: Date | string | undefined): string => {
    if (!date) return ''

    // Parse date if it's a string
    if (typeof date === 'string') {
      date = new Date(date)
    }

    // Check if date is a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new TypeError('Invalid date')
    }
    //    console.log(
    //      'date:',
    //      date,
    //      date?.toLocaleString(),
    //      /** Returns a date as a string value appropriate to the host environment's current locale. */ date?.toLocaleDateString(),
    //      /** Returns a time as a string value appropriate to the host environment's current locale. */ date?.toLocaleTimeString(),
    //
    //    )

    //    console.log(
    //      'date:',
    //    new Date(date).toLocaleString(),
    //    new Date(date).toLocaleDateString(),
    //    new Date(date).toLocaleTimeString(),
    //    )
    //
    //    const formattedDate = date ? date.toString().slice(0, 19).replace('T', ' ') : ''
    //    return formattedDate

    if (!date) return ''

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  return (
    <>
      <Modal
        title="付定金"
        open={isModalVisible}
        onOk={() => updateOrderStatus(1)}
        onCancel={() => setIsModalVisible(false)}
        okText="确认"
        cancelText="取消"
      >

        <Checkbox checked={isByArea} onChange={(e) => setIsByArea(e.target.checked)}>按面积</Checkbox>
        <Checkbox checked={!isByArea} onChange={(e) => setIsByArea(!e.target.checked)}>按个数</Checkbox>

        {isByArea && (

        <div>
          <label htmlFor={`price-by-area-${order.id}`}>面积单价</label>
          <input type="text" id={`price-by-area-${order.id}`} style={{ maxWidth: 80 }} value={pricePerArea} onChange={handlePricePerAreaChange} />
          {priceByAreaError && <span style={{ color: 'red' }}>{priceByAreaError}</span>}
          <label htmlFor={`price-by-number-count${order.id}`}>数量</label>
          <input type="text" id={`price-by-number-count-${order.id}`} style={{ maxWidth: 80 }} value={count} onChange={handleCountChange} />
          <label htmlFor={`price-by-number-${order.id}`}>总面积总价</label>
          <input type="text" id={`price-by-number-${order.id}`} style={{ maxWidth: 80 }} value={totalPriceByArea} />
        </div>
        )}

        {!isByArea && (
        <div>
          <label htmlFor={`price-by-number-${order.id}`}>单个单价</label>
          <input type="text" id={`price-by-number-${order.id}`} style={{ maxWidth: 80 }} value={pricePerNumber} onChange={handlePricePerNumberChange} />
          {priceByNumberError && <span style={{ color: 'red' }}>{priceByNumberError}</span>}
          <label htmlFor={`price-by-number-count-${order.id}`}>数量</label>
          <input type="text" id={`price-by-number-count-${order.id}`} style={{ maxWidth: 80 }} value={count} onChange={handleCountChange} />
          <label htmlFor={`price-by-number-${order.id}`}>总个数总价</label>
          <input type="text" id={`price-by-number-${order.id}`} style={{ maxWidth: 80 }} value={totalPriceByNumber} />
        </div>
        )}

      </Modal>

      <div id={`print-area-${order.id}`} className="parent">
        <Checkbox checked />

        <table className="calc-entry">
          <thead>
            <tr>
              <th>日期</th>
              {order.equation
                && Object.entries(decodedEquation).map(([, value]) => (
                  <th key={value.k}>
                    {' '}
                    {value.k}
                    {' '}
                  </th>
                ))}
              <th>数量</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatDateTime(order.createTime)}</td>
              {order.equation
                && Object.entries(decodedEquation).map(([, value]) => (
                  <th key={value.k}>
                    {' '}
                    {value.v}
                    {' '}
                  </th>
                ))}
              <td>{order.count}</td>
              <td>{order.totalPrice}</td>
            </tr>
          </tbody>
        </table>
        <div className="child">
          <Button danger className="element-to-hide-when-print calcEntry" type="primary" onClick={deleteOrder}>删除</Button>
        </div>
        <div className="child">
          {order.status === 0
            ? <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={() => setIsModalVisible(true)}>付定金</Button>
            : <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printOrder}>打印</Button>}
        </div>
      </div>
    </>
  )
}

export default CalcCustomEntryVar
