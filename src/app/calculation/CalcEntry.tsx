'use client'

import { Button } from 'antd'

const CalcEntry = () => {
  const printTable = () => {
    const printContents = document.getElementById('print-area')?.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
  }

  return (
    <div id="print-area" className="parent">
      <table className="calc-entry">
        <thead>
          <tr>
            <th>单号</th>
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
            <td>2024-03-31-001</td>
            <td>张三 沟口</td>
            <td>极窄双扇1635</td>
            <td>2100</td>
            <td>1800</td>
            <td>1719</td>
            <td>1719</td>
            <td>699.3</td>
            <td>1800</td>
            <td>2096</td>
            <td>681.3</td>
            <td>1701</td>
          </tr>
        </tbody>
      </table>
      <div className="child">
        <Button danger className="calcEntry" type="primary" onClick={printTable}>删除</Button>
      </div>
      <div className="child">
        <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printTable}>打印</Button>
      </div>
    </div>
  )
}

export default CalcEntry
