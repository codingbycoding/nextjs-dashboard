'use client'

import { Button } from 'antd'
import { Format } from '@/models/models'
import axios from 'axios'

const FormatEntryVar = ({ format } : { format: Format }) => {
  const printTable = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.debug('printTable format_id:', format.id)
    const printContents = document?.getElementById(`print-area-${format.id}`)?.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents ?? ''

    window.print()
    document.body.innerHTML = originalContents
  }

  const deleteFormat = async () => {
    console.debug('format_id:', format.id)
    try {
      const res = await axios.delete(`api/mock/formats/${format.id}`)
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

  const formatDateTime = (date : Date | undefined) : string => {
    const formattedDate = date ? date.toString().slice(0, 19).replace('T', ' ') : ''
    return formattedDate
  }

  return (
    <div id={`print-area-${format.id}`} className="parent">
      <table className="calc-entry">
        <thead>
          <tr>
            <th>日期</th>
            <th>类型名称</th>
            <th>上亮</th>
            {
    Object.entries(format.equation).map(([key]) => (
      <th key={key}>
        {' '}
        {key}
        {' '}
      </th>
    ))
        }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ formatDateTime(format.createTime) }</td>
            <td>{ format.name }</td>
            <td>{ format.hasUpWindows ? '有上亮' : '无上亮'}</td>
            {
    Object.entries(format.equation).map(([key, value]) => (
      <th key={key}>
        {' '}
        {value}
        {' '}
      </th>
    ))
        }
          </tr>
        </tbody>
      </table>
      <div className="child">
        <Button danger className="element-to-hide-when-print calcEntry" type="primary" onClick={deleteFormat}>删除</Button>
      </div>
      <div className="child">
        <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printTable}>打印</Button>
      </div>
    </div>
  )
}

export default FormatEntryVar
