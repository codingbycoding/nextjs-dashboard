'use client'

import { Button } from 'antd'

const CalcEntryVar = ({ order }) => {
  const printTable = () => {
    const printContents = document.getElementById('print-area').innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
  }

  const deleteOrder = () => {
    console.log('order_id:%s', order.id)
  }

  return (
    <div id="print-area" className="parent">
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
            <td>{ order.timestamp }</td>
            <td>{ order.note }</td>
            <td>{ order.format_id }</td>
            <td>{ order.width }</td>
            <td>{ order.height }</td>
            <td>{ order.guang_qi }</td>
            <td>{ order.gou_qi }</td>
            <td>{ order.shang_xia_fang }</td>
            <td>{ order.bian_feng }</td>
            <td>{ order.shang_xia_gui }</td>
            <td>{ order.glass_width }</td>
            <td>{ order.glass_height }</td>
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
