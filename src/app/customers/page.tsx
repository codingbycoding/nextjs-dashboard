'use client'

import { Divider } from 'antd'

import CustomerComp from './CustomerComp'
import CustomerEntryByDB from './CustomersByDB'

export default function Page() {
  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      <CustomerComp idd={1} />

      <Divider dashed />
      <CustomerEntryByDB userID={1} />
    </div>
  )
}
