'use client'

import { Button } from 'antd'
import { Order } from '@/models/models'
import axios from 'axios'

const ColorEntryVar = ({ order } : { order: Order }) => {
  const printTable = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('printTable order_id:', order.id)
    const printContents = document?.getElementById(`print-area-${order.id}`)?.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents ?? ''

    window.print()
    document.body.innerHTML = originalContents
  }

  const deleteOrder = async () => {
    console.log('order_id:', order.id)
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
            <th>备注</th>
            <th>类型</th>
            <th>宽</th>
            <th>高</th>
            <th>光企(2支)</th>
            <th>{ truncIfDotZero(order.gouQi) === 0 ? '' : '勾企(2支)' }</th>
            <th>上下方(4支)</th>
            <th>边封</th>
            <th>上下轨</th>
            <th>玻璃宽度</th>
            <th>玻璃高度</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ formatDateTime(order.createTime) }</td>
            <td>{ order.note }</td>
            <td>{ order.formatName }</td>
            <td>{ truncIfDotZero(order.width) }</td>
            <td>{ truncIfDotZero(order.height) }</td>
            <td>{ truncIfDotZero(order.guangQi) }</td>

            <td>{ truncIfDotZero(order.gouQi) === 0 ? '' : truncIfDotZero(order.gouQi) }</td>

            <td>{ truncIfDotZero(order.shangXiaFang) }</td>
            <td>{ truncIfDotZero(order.bianFeng) }</td>
            <td>{ truncIfDotZero(order.shangXiaGui) }</td>
            <td>{ truncIfDotZero(order.glassWidth) }</td>
            <td>{ truncIfDotZero(order.glassHeight) }</td>
          </tr>
        </tbody>
      </table>
      <div className="child">
        <Button danger className="element-to-hide-when-print calcEntry" type="primary" onClick={deleteOrder}>删除</Button>
      </div>
      <div className="child">
        <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printTable}>打印</Button>
      </div>
    </div>
  )
}

export default ColorEntryVar
