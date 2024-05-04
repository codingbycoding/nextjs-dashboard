'use client'

import { Divider } from 'antd'

// import FormatEntry from './FormatEntry'
import FormatComp from './FormatComp'
import FormatEntryByDB from './FormatsByDB'

export default function Page() {
  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      <FormatComp idd={1} />

      <Divider dashed />
      <FormatEntryByDB userID={1} />
    </div>
  )
}
