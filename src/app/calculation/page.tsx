'use client'

import { Divider } from 'antd'

/* import CalcEntry from './CalcEntry'
import CalcComp from './CalcComp'
import CalcEntryByDB from './CalcEntryByDB'
*/
import CalcCustom from './CalcCustom'
import CalcCustomEntryByDB from './CalcCustomEntryByDB'

export default function Page() {
  return (
    <div style={{
      display: 'auto', flexWrap: 'nowrap', height: '100vh', margin: 0, padding: 0,
    }}
    >
      {/*
      <CalcComp idd={1} />
      <Divider dashed />
      <Divider dashed />
      */}
      <CalcCustom idd={2} userID={1} />

      {/*
      <Divider dashed />
      <Divider dashed />
      <CalcEntry order_id={20240405001} />
      */}

      <Divider dashed />
      <Divider dashed />
      <CalcCustomEntryByDB userID={1} />
      <Divider dashed />
      <Divider dashed />
      {/*
      <CalcEntryByDB userID={1} />
      */}
    </div>
  )
}
