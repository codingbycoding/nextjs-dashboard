'use client'

import { Button } from 'antd'
import { Glass } from '@/models/models'
import axios from 'axios'

const GlassEntryVar = ({ glass } : { glass: Glass }) => {
  const printTable = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.debug('printTable glass_id:', glass.id)
    const printContents = document?.getElementById(`print-area-${glass.id}`)?.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents ?? ''

    window.print()
    document.body.innerHTML = originalContents
  }

  const deleteGlass = async () => {
    console.debug('glass_id:', glass.id)
    try {
      const res = await axios.delete(`api/mock/glasses/${glass.id}`)
      if (res.status === 200) {
        console.debug('status:', 200)
      }

      // eslint-disable-next-line no-restricted-globals
      location.reload()
    } catch (err) {
      if (err instanceof Error) {
        // setError(err.message)
        console.debug('err:', err)
      }
    } finally {
      // setSubmitting(false)
      console.debug('finally:')
    }
  }

  const glassDateTime = (date : Date | undefined) : string => {
    const glasstedDate = date ? date.toString().slice(0, 19).replace('T', ' ') : ''
    return glasstedDate
  }

  return (
    <div id={`print-area-${glass.id}`} className="parent">
      <table className="calc-entry">
        <thead>
          <tr>
            <th>日期</th>
            <th>玻璃类型名称</th>
            <th>备注</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ glassDateTime(glass.createTime) }</td>
            <td>{ glass.name }</td>
            <td>{ glass.note }</td>
          </tr>
        </tbody>
      </table>
      <div className="child">
        <Button danger className="element-to-hide-when-print calcEntry" type="primary" onClick={deleteGlass}>删除</Button>
      </div>
      <div className="child">
        <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printTable}>打印</Button>
      </div>
    </div>
  )
}

export default GlassEntryVar
