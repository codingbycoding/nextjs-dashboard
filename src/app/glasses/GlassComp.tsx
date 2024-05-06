'use client'

import { useState } from 'react'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button } from 'antd'
import axios from 'axios'

import GlassInput from './GlassInput'

export default function GlassComp({ idd }:{ idd:number }) {
  const [glass, setGlass] = useState({ name: '', note: '', list: { } })
  const [name, setName] = useState<string>('')
  const [note, setNote] = useState<string>('')

  const [inputList, setInputList] = useState([])

  const [confirmError, setConfirmError] = useState<string>('')

  const onAdd = (k:string, v:string) => {
    // console.log('name:', name, ' value:', val)
    setGlass({ ...glass, list: { ...glass.list, [k]: v } })
  }

  const onRemoveInput = (inputID : number) => {
    const newInputList = inputList.filter((input) => input.idd !== inputID)
    setInputList(newInputList)
    // console.log('glass:', glass)
  }

  const handleAddInput = () => {
    console.log('glass:', glass)
    setInputList([...inputList, <GlassInput key={inputList.length + 10} idd={inputList.length + 10} onAdd={onAdd} onRemoveInput={onRemoveInput} />])
  }

  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    // location.reload()
  }

  const handleAddGlass = async () => {
    glass.name = note
    console.log('outputs glass:', glass)

    let hasError = false
    if (JSON.stringify(glass.list).length === 0) {
      hasError = true
    }

    /*
    if (glass.name === '') {
      hasError = true
    }
    */

    Object.entries(glass.list).map(([key, value]) => {
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
      const newGlass = {
        name: glass.name,
        note: glass.note,
        list: JSON.stringify(glass.list),
      }

      const res = await axios.post('api/mock/glasses', newGlass)
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
      id={`glassComp-${idd}`}
      style={{
        display: 'block', flexWrap: 'nowrap', height: 'auto', margin: 0, padding: 0,
      }}
    >

      <div
        className="glass-header"
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
          <label htmlFor={`left-${3}`} className="glass-left-w">玻璃类型名称</label>
          <label htmlFor={`left-${3}`} className="glass-left-w">备注</label>
        </div>

        <GlassInput idd={3} leftV="" rightV="" onAdd={onAdd} />

        {inputList.map((input, index:number) => (
          <div key={index}>{input}</div>
        ))}
      </div>

      <div className="parent-of-confirm">
        <div className="glass-column-plus-circle" style={{ flex: 1, padding: 1, boxSizing: 'border-box' }}>
          <PlusCircleTwoTone onClick={handleAddInput} />
        </div>

        <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
          <Button id="add-glass" type="primary" onClick={handleAddGlass}>确认</Button>
          {confirmError && <span style={{ color: 'red' }}>{confirmError}</span>}
        </div>
      </div>

    </div>
  )
}
