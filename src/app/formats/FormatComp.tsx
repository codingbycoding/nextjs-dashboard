'use client'

import { useState } from 'react'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button } from 'antd'
import axios from 'axios'

import FormatInput from './FormatInput'

export default function FormatComp({ idd }:{ idd:number }) {
  const [format, setFormat] = useState({ name: '', equation: { } })
  const [note, setName] = useState<string>('')

  const [inputList, setInputList] = useState([])

  const [confirmError, setConfirmError] = useState<string>('')

  const onAdd = (name : string, val:string) => {
    // console.log('name:', name, ' value:', val)
    setFormat({ ...format, equation: { ...format.equation, [name]: val } })
  }

  const onRemoveInput = (inputID : number) => {
    const newInputList = inputList.filter((input) => input.idd !== inputID)
    setInputList(newInputList)
    // console.log('format:', format)
  }

  const handleAddInput = () => {
    console.log('format:', format)
    setInputList([...inputList, <FormatInput key={inputList.length + 10} idd={inputList.length + 10} onAdd={onAdd} onRemoveInput={onRemoveInput} />])
  }

  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    // location.reload()
  }

  const handleAddformat = async () => {
    format.name = note
    console.log('outputs format:', format)

    let hasError = false
    if (format.name === '') {
      hasError = true
    }

    Object.entries(format.equation).map(([key, value]) => {
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
      const newFormat = {
        name: format.name,
        equation: JSON.stringify(format.equation),
      }

      const res = await axios.post('api/mock/formats', newFormat)
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
      id={`formatComp-${idd}`}
      style={{
        display: 'block', flexWrap: 'nowrap', height: 'auto', margin: 0, padding: 0,
      }}
    >

      <div
        className="format-header"
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
          <label htmlFor={`note-${1}`} className="format-left-w">类型名称</label>
          <label htmlFor={`note-${1}`} className="format-equal-w">等于</label>
          <input type="text" id={`note-${1}`} className="format-right-w" placeholder="极窄三联动1635(不锈钢下轨)" style={{ display: 'inline' }} onChange={(e) => setName(e.target.value)} />
        </div>

        <FormatInput idd={3} readOnly leftV="宽" rightV="宽" />
        <FormatInput idd={4} readOnly leftV="高" rightV="高" />
        {/*
          <FormatInput idd={5} leftV="光企" rightV="高 - 32" onAdd={onAdd} />
        */
        }

        {inputList.map((input, index:number) => (
          <div key={index}>{input}</div>
        ))}
      </div>

      <div className="parent-of-confirm">
        <div className="column-plus-circle" style={{ flex: 1, padding: 1, boxSizing: 'border-box' }}>
          <PlusCircleTwoTone onClick={handleAddInput} />
        </div>

        <div className="column" style={{ flex: 1, padding: 5, boxSizing: 'border-box' }}>
          <Button id="add-format" type="primary" onClick={handleAddformat}>确认</Button>
          {confirmError && <span style={{ color: 'red' }}>{confirmError}</span>}
        </div>
      </div>

    </div>
  )
}
