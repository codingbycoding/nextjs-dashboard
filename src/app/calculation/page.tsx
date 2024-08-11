/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { Divider, Button } from 'antd'
import React, { useState } from 'react'

import CalcCustom from './CalcCustom'
import CalcCustomEntryByDB from './CalcCustomEntryByDB'

export default function Page() {
  const [orderStatus, setActiveButton] = useState<number>(0)

  const makeAsPrimary = (orderSt: number) => {
    setActiveButton(orderSt)
  }

  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      <CalcCustom idd={2} userID={1} />
      <Divider dashed />
      <div>
        <Button className="element-to-hide-when-print calcEntry" type={orderStatus === 0 ? 'primary' : 'default'} onClick={() => makeAsPrimary(0)}>未定金</Button>
        <Button className="element-to-hide-when-print calcEntry" type={orderStatus === 1 ? 'primary' : 'default'} onClick={() => makeAsPrimary(1)}>未打印</Button>
        <Button className="element-to-hide-when-print calcEntry" type={orderStatus === 2 ? 'primary' : 'default'} onClick={() => makeAsPrimary(2)}>未完成</Button>
      </div>
      <CalcCustomEntryByDB userID={1} orderStatus={orderStatus} />
      <Divider dashed />
    </div>
  )
}
