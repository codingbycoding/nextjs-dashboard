'use client'

import { Divider } from 'antd'

// import GlassEntry from './GlassEntry'
import GlassComp from './GlassComp'
import GlassEntryByDB from './GlassesByDB'

export default function Page() {
  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      <GlassComp idd={1} />

      <Divider dashed />
      <GlassEntryByDB userID={1} />
    </div>
  )
}
