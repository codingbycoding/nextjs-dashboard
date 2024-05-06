'use client'

import { Button } from 'antd'
import { Color } from '@/models/models'
import axios from 'axios'

const ColorEntryVar = ({ color } : { color: Color }) => {
  const printTable = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('printTable color_id:', color.id)
    const printContents = document?.getElementById(`print-area-${color.id}`)?.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents ?? ''

    window.print()
    document.body.innerHTML = originalContents
  }

  const deletecolor = async () => {
    console.log('color_id:', color.id)
    try {
      const res = await axios.delete(`api/mock/colors/${color.id}`)
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

  const colorDateTime = (date : Date | undefined) : string => {
    const colortedDate = date ? date.toString().slice(0, 19).replace('T', ' ') : ''
    return colortedDate
  }

  return (
    <div id={`print-area-${color.id}`} className="parent">
      <table className="calc-entry">
        <thead>
          <tr>
            <th>日期</th>
            <th>型材类型名称</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ colorDateTime(color.createTime) }</td>
            <td>{ color.name }</td>
            <td>{ color.note }</td>
          </tr>
        </tbody>
      </table>
      <div className="child">
        <Button danger className="element-to-hide-when-print calcEntry" type="primary" onClick={deletecolor}>删除</Button>
      </div>
      <div className="child">
        <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printTable}>打印</Button>
      </div>
    </div>
  )
}

export default ColorEntryVar
