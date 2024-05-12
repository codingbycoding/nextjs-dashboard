'use client'

import { Divider } from 'antd'

// import GlassEntry from './GlassEntry'
import ColorComp from './ColorComp'
import GlassEntryByDB from './ColorsByDB'

export default function Page() {
  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      <ColorComp idd={1} />
      <Divider dashed />
      <GlassEntryByDB userID={1} />
    </div>
  )
}
