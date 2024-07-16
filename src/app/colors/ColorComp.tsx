/* eslint-disable max-len */

'use client'

import { useState } from 'react'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button } from 'antd'
import axios from 'axios'

import ColorInput from './ColorInput'

export default function ColorComp({ idd }:{ idd:number }) {
  const [color, setcolor] = useState({ name: '', note: '', list: { } })
  const [note, setNote] = useState<string>('')
  const [nextId, setNextId] = useState(10)

  const [inputList, setInputList] = useState<{ idd:number }[]>([])

  const [confirmError, setConfirmError] = useState<string>('')

  const onAdd = (k:string, v:string) => {
    // console.log('name:', name, ' value:', val)
    setcolor({ ...color, list: { ...color.list, [k]: v } })
  }

  const onRemoveInput = (inputID : number) => {
    setInputList(inputList.filter((input) => input.idd !== inputID))
  }

  const handleAddInput = () => {
    console.log('color:', color)
    setNextId(nextId + 1)
    // setInputList([...inputList, <ColorInput key={inputList.length + 10} idd={inputList.length + 10} onAdd={onAdd} onRemoveInput={onRemoveInput} />])
    setInputList([...inputList, { idd: nextId }])
    // setAbcList([...abcList, { idd: nextId }])
  }

  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  const handleAddcolor = async () => {
    color.name = note
    console.log('outputs color:', color)

    let hasError = false
    if (JSON.stringify(color.list).length === 0) {
      hasError = true
    }

    /*
    if (color.name === '') {
      hasError = true
    }
    */

    Object.entries(color.list).map(([key, value]) => {
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
      const newcolor = {
        name: color.name,
        note: color.note,
        list: JSON.stringify(color.list),
      }

      const res = await axios.post('api/mock/colors', newcolor)
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
      id={`colorComp-${idd}`}
      style={{
        display: 'block', flexWrap: 'nowrap', height: 'auto', margin: 0, padding: 0,
      }}
    >

      <div
        className="color-header"
        style={{
          flexWrap: 'nowrap', margin: 5, padding: 5,
        }}
      >
        <div
          className="column"
          style={{
            display: 'flex', flex: 1, margin: 5, padding: 5, boxSizing: 'border-box',
          }}
        >
          <label htmlFor={`left-${3}`} className="color-left-w">型材类型名称</label>
          <label htmlFor={`left-${3}`} className="color-left-w">备注</label>
        </div>

        <ColorInput idd={3} leftV="" rightV="" onAdd={onAdd} readOnly={false} onRemoveInput={onRemoveInput} />

        {inputList.map((input) => (
          <div key={input.idd}>
            <ColorInput idd={input.idd} leftV="" rightV="" onAdd={onAdd} readOnly={false} onRemoveInput={onRemoveInput} />
          </div>
        ))}
      </div>

      <div className="parent-of-confirm">
        <div className="color-column-plus-circle" style={{ flex: 1, padding: 1, boxSizing: 'border-box' }}>
          <PlusCircleTwoTone onClick={handleAddInput} />
        </div>

        <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
          <Button id="add-color" type="primary" onClick={handleAddcolor}>确认</Button>
          {confirmError && <span style={{ color: 'red' }}>{confirmError}</span>}
        </div>
      </div>

    </div>
  )
}
