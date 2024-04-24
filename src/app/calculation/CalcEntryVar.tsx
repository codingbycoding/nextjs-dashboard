'use client'

import { Button } from 'antd'
import { Order } from '@/models/models'

const CalcEntryVar = ({ order } : { order: Order }) => {
  const printTable = () => {
    const printContents = document?.getElementById('print-area')?.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents ?? ''

    window.print()
    document.body.innerHTML = originalContents
  }

  const deleteOrder = () => {
    console.log('order_id:', order.id)
  }

  const formatDateTime = (date : Date) : string => {
    const formattedDate = date.toString().slice(0, 19).replace('T', ' ')
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
            <th>勾企(2支)</th>
            <th>上下方(4支)</th>
            <th>边封</th>
            <th>上下轨</th>
            <th>玻璃宽度</th>
            <th>玻璃高度</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ formatDateTime(order.timestamp) }</td>
            <td>{ order.note }</td>
            <td>{ order.formatID }</td>
            <td>{ truncIfDotZero(order.width) }</td>
            <td>{ truncIfDotZero(order.height) }</td>
            <td>{ truncIfDotZero(order.guangQi) }</td>
            <td>{ truncIfDotZero(order.gouQi) }</td>
            <td>{ truncIfDotZero(order.shangXiaFang) }</td>
            <td>{ truncIfDotZero(order.bianFeng) }</td>
            <td>{ truncIfDotZero(order.shangXiaGui) }</td>
            <td>{ truncIfDotZero(order.glassWidth) }</td>
            <td>{ truncIfDotZero(order.glassHeight) }</td>
          </tr>
        </tbody>
      </table>
      <div className="child">
        <Button danger className="calcEntry" type="primary" onClick={deleteOrder}>删除</Button>
      </div>
      <div className="child">
        <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printTable}>打印</Button>
      </div>
    </div>
  )
}

export default CalcEntryVar
