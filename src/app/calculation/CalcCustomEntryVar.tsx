'use client'

import { Button } from 'antd'
import axios from 'axios'

import { Order } from '@/models/models'

const CalcCustomEntryVar = ({ order } : { order: Order }) => {
  const decodedEquation = JSON.parse(order.equation ?? '')

  const printOrder = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('printOrder order.id:', order.id)
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

  const formatDateTime = (date : Date | undefined) : string => {
    const formattedDate = date ? date.toString().slice(0, 19).replace('T', ' ') : ''
    return formattedDate
  }

  const truncIfDotZero = (num : number) : number => {
    const str = num?.toString() ?? ''
    if (str.endsWith('.0')) {
      return parseInt(str, 10)
    }
    return num
  }

  return (
    <div id={`print-area-${order.id}`} className="parent">
      <table className="calc-entry">
        <thead>
          <tr>
            <th>日期</th>
            {order.equation
    && Object.entries(decodedEquation).map(([key, value]) => (
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
    && Object.entries(decodedEquation).map(([key, value]) => (
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
        <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printOrder}>打印</Button>
      </div>
    </div>
  )
}

export default CalcCustomEntryVar
