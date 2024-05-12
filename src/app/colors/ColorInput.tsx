'use client'

import React, { useState } from 'react'
import { MinusCircleTwoTone } from '@ant-design/icons'

export default function ColorInput({
  idd, readOnly, leftV, rightV, onAdd, onRemoveInput,
// eslint-disable-next-line max-len
}:{ idd:number; readOnly:boolean | undefined; leftV: string | undefined; rightV: string | undefined;
  onAdd : (name: string, value: string) => void;
  onRemoveInput :(idd:number) => void;
}) {
  const [leftValue, setLeftValue] = useState(leftV ?? '')
  const [rightValue, setRightValue] = useState(rightV ?? '')

  const handleLeftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeftValue(event.currentTarget.value)
  }

  const handleRightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRightValue(event.currentTarget.value)
    if (leftValue !== '' && event.currentTarget.value !== '') {
      onAdd(leftValue, event.currentTarget.value)
    }

    console.log(`leftValue:${leftValue}, rightValue:${rightValue}, event.currentTarget.value:${event.currentTarget.value}`)
  }

  return (
    <div
      className="column"
      style={{
        flex: 1, padding: 2, boxSizing: 'border-box',
      }}
    >
      <input type="text" id={`left-${idd}`} className="glass-left-w" value={leftValue} onChange={handleLeftChange} readOnly={readOnly ?? false} />
      {/*
      <label htmlFor={`right-${idd}`} className="glass-equal-w"></label>
      */}
      <input
        type="text"
        id={`right-${idd}`}
        className="glass-right-w"
        value={rightValue}
        onChange={handleRightChange}
        readOnly={readOnly ?? false}
        style={{
          marginLeft: 10,
        }}
      />
      <MinusCircleTwoTone onClick={onRemoveInput} />
    </div>
  )
}
