'use client'

import { useState } from 'react'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button } from 'antd'
import axios from 'axios'

import { Customer } from '@/models/models'
import CustomerInput from './CustomerInput'

export default function CustomerComp({ idd }:{ idd:number }) {
  const [customer, setCustomer] = useState({ name: '', mobile: 0, kvs: { } } as Customer)
  const [note, setName] = useState<string>('')

  const [inputList, setInputList] = useState([])

  const [confirmError, setConfirmError] = useState<string>('')

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRightValue(event.currentTarget.value)
  }

  const onAdd = (name : string, val:string) => {
    setCustomer({ ...customer, kvs: { ...customer.kvs, [name]: val } })
  }

  const onRemoveInput = (inputID : number) => {
    const newInputList = inputList.filter((input) => input.idd !== inputID)
    setInputList(newInputList)
  }

  const handleAddInput = () => {
    console.log('customer:', customer)
    setInputList([...inputList, <CustomerInput key={inputList.length + 10} idd={inputList.length + 10} onAdd={onAdd} onRemoveInput={onRemoveInput} />])
  }

  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    // location.reload()
  }

  const handleAddcustomer = async () => {
    customer.name = note
    console.log('outputs customer:', customer)

    let hasError = false
    if (customer.name === '') {
      hasError = true
    }

    Object.entries(customer.kvs).map(([key, value]) => {
      console.log(`key:${key} value:${value}`)
      if (key === '' || value === '') {
        hasError = true
      }
    })

    setConfirmError('')
    if (hasError) {
      setConfirmError('请检查所有输入')
      return
    }

    try {
      const newCustomer = {
        name: customer.name,
        mobile: customer.mobile,
        encoded_data: JSON.stringify(customer.kvs),
      } as Customer

      const res = await axios.post('api/mock/customers', newCustomer)
      if (res.status === 200) {
        console.log('200')
      }
      refresh()
    } catch (err) {
      if (err instanceof Error) {
        // setError(err.message)
        console.log('err:', err)
      }
    } finally {
      // setSubmitting(false)
      console.log('finally')
    }
  }

  return (
    <div
      id={`customerComp-${idd}`}
      style={{
        display: 'block', flexWrap: 'nowrap', height: 'auto', margin: 0, padding: 0,
      }}
    >

      <div
        className="customer-header"
        style={{
          flexWrap: 'nowrap', margin: 5, padding: 5,
        }}
      >
        <div
          className="column"
          style={{
            display: 'flex', flex: 1, padding: 5, boxSizing: 'border-box',
          }}
        >
          <label htmlFor={`note-${1}`} className="customer-left-w">客户名称</label>
          <input
            type="text"
            id={`note-${1}`}
            className="customer-right-w"
            placeholder="王大王天王窗"
            style={{ display: 'inline' }}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginLeft: 10,
            }}
          />
        </div>

        <CustomerInput idd={3} leftV="电话" rightV="" onAdd={onAdd} />
        <CustomerInput idd={4} leftV="住址" rightV="" onAdd={onAdd} />
        <CustomerInput idd={5} leftV="备注" rightV="" onAdd={onAdd} />

        {inputList.map((input, index:number) => (
          <div key={index}>{input}</div>
        ))}
      </div>

      <div className="parent-of-confirm">
        <div className="column-plus-circle" style={{ flex: 1, padding: 1, boxSizing: 'border-box' }}>
          <PlusCircleTwoTone onClick={handleAddInput} />
        </div>

        <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
          <Button id="add-customer" type="primary" onClick={handleAddcustomer}>确认</Button>
          {confirmError && <span style={{ color: 'red' }}>{confirmError}</span>}
        </div>
      </div>

    </div>
  )
}
