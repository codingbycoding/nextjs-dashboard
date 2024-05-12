'use client'

import { Divider } from 'antd'

import CalcCustom from './CalcCustom'
import CalcCustomEntryByDB from './CalcCustomEntryByDB'

export default function Page() {
  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      <CalcCustom idd={2} userID={1} />
      <Divider dashed />
      <Divider dashed />
      <CalcCustomEntryByDB userID={1} />
      <Divider dashed />
      <Divider dashed />
    </div>
  )
}
