'use client'

import { Button, Checkbox } from 'antd'
import axios from 'axios'

import { Order } from '@/models/models'

type KV = {
  k: string;
  v: string;
}

const CalcCustomEntryVar = ({ order } : { order: Order }) => {
  const decodedEquation = JSON.parse(order.equation as string ?? '') as KV[]
  // const decodedEquation = JSON.parse(order.equation as unknown as string ?? '')

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

  const updateOrderStatus = async (status: number) => {
    console.log('order.id:', order.id)
    try {
      const res = await axios.patch(`api/mock/orders/${order.id}`, { status: status })
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
    <div id={`print-area-${order.id}`} className="parent">
      <Checkbox />
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ formatDateTime(order.createTime) }</td>
            {order.equation
    && Object.entries(decodedEquation).map(([, value]) => (
      <th key={value.k}>
        {' '}
        {value.v}
        {' '}
      </th>
    ))}

          </tr>
        </tbody>
      </table>
      <div className="child">
        <Button danger className="element-to-hide-when-print calcEntry" type="primary" onClick={deleteOrder}>删除</Button>
      </div>
      <div className="child">
        { order.status === 0
          ? <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={() => updateOrderStatus(1)}>付定金</Button>
          : <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printOrder}>打印</Button>}
      </div>
    </div>
  )
}

export default CalcCustomEntryVar
