'use client'

import React, { useState, useEffect } from 'react'
import { MinusCircleTwoTone } from '@ant-design/icons'

export default function FormatInput({
  idd, readOnly, leftV, rightV, onAdd, onRemoveInput,
}:{ idd:number; readOnly:boolean | undefined; leftV: string | undefined; rightV: string | undefined;
  onAdd?:(name: string, value: string) => void | undefined;
  onRemoveInput :(idd:number) => void;
}) {
  const [leftValue, setLeftValue] = useState(leftV ?? '')
  const [rightValue, setRightValue] = useState(rightV ?? '')

  // onAdd && onAdd(leftValue, rightValue)

  const handleLeftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeftValue(event.currentTarget.value)
  }

  const handleRightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRightValue(event.currentTarget.value)
    if (leftValue !== '' && event.currentTarget.value !== '') {
      // onAdd && onAdd(leftValue, event.currentTarget.value)
      if (onAdd !== undefined) {
        onAdd(leftValue, event.currentTarget.value)
        console.debug(`leftValue:${leftValue}, rightValue:${rightValue}, event.currentTarget.value:${event.currentTarget.value}`)
      }
    }
  }

  useEffect(() => {
    if (onAdd !== undefined) {
      console.log('onAdd leftValue:', leftValue, ' rightValue:', rightValue)
      onAdd(leftValue, rightValue)
    }
  }, [idd])

  return (
    <div
      className="column"
      style={{
        flex: 1, padding: 5, boxSizing: 'border-box',
      }}
    >
      <input type="text" id={`left-${idd}`} className="format-left-w" value={leftValue} onChange={handleLeftChange} readOnly={readOnly ?? false} />
      <label htmlFor={`right-${idd}`} className="format-equal-w">等于</label>
      <input type="text" id={`right-${idd}`} className="format-right-w" value={rightValue} onChange={handleRightChange} readOnly={readOnly ?? false} />
      <MinusCircleTwoTone onClick={() => onRemoveInput(idd)} />
    </div>
  )
}
