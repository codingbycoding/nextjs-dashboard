'use client'

import { useState } from 'react'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button } from 'antd'
import axios from 'axios'

import FormatInput from './FormatInput'

export default function FormatComp({ idd }:{ idd:number }) {
  const [format, setFormat] = useState({ name: '', equation: { } })
  const [note, setName] = useState<string>('')
  const [nextId, setNextId] = useState(10)

  const [inputList, setInputList] = useState<{ idd:number }[]>([])

  const [confirmError, setConfirmError] = useState<string>('')

  const onAdd = (name : string, val:string) => {
    setFormat({ ...format, equation: { ...format.equation, [name]: val } })
  }

  const onRemoveInput = (inputID : number) => {
    setInputList(inputList.filter((input) => input.idd !== inputID))
  }

  const handleAddInput = () => {
    console.debug('format:', format)

    setNextId(nextId + 1)
    setInputList([...inputList, { idd: nextId }])
  }

  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  const handleAddformat = async () => {
    format.name = note
    console.debug('outputs format:', format)

    let hasError = false
    if (format.name === '') {
      hasError = true
    }

    Object.entries(format.equation).map(([key, value]) => {
      console.debug(`key:${key} value:${value}`)
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
        console.debug('200')
      }
      refresh()
    } catch (err) {
      if (err instanceof Error) {
        // setError(err.message)
        console.debug('err:', err)
      }
    } finally {
      // setSubmitting(false)
      console.debug('finally')
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

        <FormatInput idd={3} readOnly leftV="宽" rightV="宽" onAdd={onAdd} onRemoveInput={onRemoveInput} />
        <FormatInput idd={4} readOnly leftV="高" rightV="高" onAdd={onAdd} onRemoveInput={onRemoveInput} />

        {inputList.map((input) => (
          <div key={input.idd}>
            <FormatInput idd={input.idd} readOnly={false} leftV="" rightV="" onAdd={onAdd} onRemoveInput={onRemoveInput} />
          </div>
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
