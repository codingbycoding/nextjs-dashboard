'use client'

import { Divider } from 'antd'
import CalcEntry from './CalcEntry'
import CalcComp from './calcComp'

export default function Page() {
  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      <Divider dashed />
      <CalcComp idd={1} />
      <CalcComp idd={2} />
      <CalcComp idd={3} />
      <CalcComp idd={4} />
      <CalcComp idd={5} />

      <Divider dashed />
      <Divider dashed />
      <CalcEntry />

    </div>
  )
}
