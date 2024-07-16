'use client'

import { Button } from 'antd'
import axios from 'axios'

import { Customer } from '@/models/models'

/*
type KV = {
  k: string;
  v: string;
}
*/

const CustomerEntryVar = ({ customer } : { customer: Customer }) => {
  const printTable = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    console.log('printTable customer_id:', customer.id)
    const printContents = document?.getElementById(`print-area-${customer.id}`)?.innerHTML
    const originalContents = document.body.innerHTML
    document.body.innerHTML = printContents ?? ''

    window.print()
    document.body.innerHTML = originalContents
  }

  const deleteCustomer = async () => {
    console.log('customer_id:', customer.id)
    try {
      const res = await axios.delete(`api/mock/customers/${customer.id}`)
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

  const customerDateTime = (date : Date | undefined) : string => {
    const customertedDate = date ? date.toString().slice(0, 19).replace('T', ' ') : ''
    return customertedDate
  }

  return (
    <div id={`print-area-${customer.id}`} className="parent">
      <table className="calc-entry">
        <thead>
          <tr>
            <th>日期</th>
            <th>客户名称</th>
            {customer && customer.kvs && Object.entries(customer.kvs).map(([key]) => (
              <th key={key}>
                {' '}
                {key}
                {' '}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{ customerDateTime(customer.createTime) }</td>
            <td>{ customer.name }</td>
            { customer && customer.kvs
                && Object.entries(customer.kvs).map(([key, value]) => (
                  <th key={key}>
                    {' '}
                    {value}
                    {' '}
                  </th>
                ))}
          </tr>
        </tbody>
      </table>
      <div className="child">
        <Button danger className="element-to-hide-when-print calcEntry" type="primary" onClick={deleteCustomer}>删除</Button>
      </div>
      <div className="child">
        <Button className="element-to-hide-when-print calcEntry" type="primary" onClick={printTable}>打印</Button>
      </div>
    </div>
  )
}

export default CustomerEntryVar
