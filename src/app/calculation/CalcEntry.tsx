'use client'

import { Button } from 'antd'

const CalcEntry = () => {
  const printTable = () => {
    const printContents = document.getElementById('print-area').innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents
    window.print()
    document.body.innerHTML = originalContents
  }

  return (
    <div id="print-area" style={{ flex: 1 }}>
      <table className="calc-entry">
        <thead>
          <tr>
            <th>单号</th>
            <th>备注</th>
            <th>类型</th>
            <th>宽</th>
            <th>高</th>
            <th>光勾(2支)</th>
            <th>上下方(4支)</th>
            <th>边封</th>
            <th>上下轨</th>
            <th>玻璃宽度</th>
            <th>玻璃高度</th>
            <th><Button className="element-to-hide-when-print" type="primary" onClick={printTable}>打印</Button></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>20240331001</td>
            <td>张三 沟口</td>
            <td>极窄双扇1635</td>
            <td>2100</td>
            <td>1800</td>
            <td>1719</td>
            <td>699.3</td>
            <td>1800</td>
            <td>2096</td>
            <td>681.3</td>
            <td>1701</td>
            <td />
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default CalcEntry
