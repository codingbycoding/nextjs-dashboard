'use client'

import { useState, useEffect } from 'react'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { Button, Checkbox } from 'antd'
import axios from 'axios'

import FormatInput from './FormatInput'

export default function FormatComp({ idd }:{ idd:number }) {
  const [format, setFormat] = useState({ name: '', hasUpWindows: true, equation: { } })
  const [note, setName] = useState<string>('')
  const [nextId, setNextId] = useState(10)
  const [hasUpWindows, setHasUpWindows] = useState<boolean>(true)

  const [confirmError, setConfirmError] = useState<string>('')

  const onAdd = (name : string, val:string) => {
    // setFormat({ ...format, equation: { ...format.equation, [name]: val } })

    setFormat((prevFormat) => ({
      ...prevFormat,
      equation: {
        ...prevFormat.equation,
        [name]: val,
      },
    }))

    console.log('FormatComp onAdd name:', name, ' val:', val, 'format.equation:', JSON.stringify(format.equation))
  }

  useEffect(() => {
    console.log('Format updated:', JSON.stringify(format.equation))
  }, [format.equation])

  const onRemoveInput = (inputID : number) => {
    setInputList(inputList.filter((input) => input.idd !== inputID))
  }

  const [inputList, setInputList] = useState<{ idd:number; hasUpWindows?:boolean; readOnly:boolean; leftV: string; rightV: string }[]>([
    {
      idd: 7, hasUpWindows: true, readOnly: false, leftV: '上亮玻璃宽(中柱数大于0)', rightV: '(宽-中柱数*3)/2',
    },
    {
      idd: 8, hasUpWindows: true, readOnly: false, leftV: '上亮玻璃宽(中柱数等于0)', rightV: '宽-5',
    },
  ])

  const handleAddInput = () => {
    console.debug('format:', format)

    setNextId(nextId + 1)
    setInputList([...inputList, { idd: nextId }])
  }

  const refresh = () => {
    // eslint-disable-next-line no-restricted-globals
    // location.reload()
  }

  const handleAddformat = async () => {
    format.name = note

    let hasError = false
    if (format.name === '') {
      hasError = true
    }

    format.hasUpWindows = hasUpWindows
    console.log('outputs format:', format)

    // const kvs := {[key, value]}
    const formatEquation = Object.fromEntries(Object.entries(format.equation)
      .filter(([key, value]) => {
        if (hasUpWindows !== true && key.startsWith('上亮')) {
          console.log(`key startsWith:${key}`)
          return false
        }

        if (key === '' || value === '') {
          console.log(`empty key:${key} or value:${value}`)
          return false
        }
        return true
      }))

    // Object.entries(format.equation).map(([key, value]) => {
    Object.entries(formatEquation).map(([key, value]) => {
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
        hasUpWindows,
        // equation: JSON.stringify(format.equation),
        equation: JSON.stringify(formatEquation),
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

        <Checkbox defaultChecked onChange={(e) => setHasUpWindows(e.target.checked)}>有上亮</Checkbox>
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

        <FormatInput key={3} idd={3} readOnly leftV="宽" rightV="宽" onAdd={undefined} onRemoveInput={onRemoveInput} />
        <FormatInput key={4} idd={4} readOnly leftV="高" rightV="高" onAdd={undefined} onRemoveInput={onRemoveInput} />

        {hasUpWindows === true
          && (
          <>
            <FormatInput key={5} idd={5} readOnly leftV="中柱数" rightV="中柱数" onRemoveInput={onRemoveInput} />
            <FormatInput key={6} idd={6} readOnly leftV="上亮玻璃高" rightV="上亮玻璃高" onRemoveInput={onRemoveInput} />
          </>
          )}

        {inputList.map((input) => (
          hasUpWindows !== true && input.hasUpWindows === true
            ? <></>
            : (
              <div key={input.idd}>
                <FormatInput idd={input.idd} readOnly={false} leftV={input.leftV} rightV={input.rightV} onAdd={onAdd} onRemoveInput={onRemoveInput} />
              </div>
            )
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
