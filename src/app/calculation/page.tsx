'use client'

import { Divider } from 'antd'

import CalcEntry from './CalcEntry'
import CalcComp from './calcComp'
import CalcEntryByDB from './CalcEntryByDB'

export default function Page() {
  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      <CalcComp idd={1} />

      <Divider dashed />
      <Divider dashed />
      <CalcEntry order_id={20240405001} />

      <Divider dashed />
      <Divider dashed />
      <CalcEntryByDB userID={1} />
    </div>
  )
}
