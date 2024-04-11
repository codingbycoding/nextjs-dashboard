'use client'

import { Divider } from 'antd'

import { orders } from '@/app/lib/placeholder-data.mobile'
// import { getOrders } from '@/models/order'
import CalcEntry from './CalcEntry'
import CalcEntryVar from './CalcEntryVar'
import CalcComp from './calcComp'
import CalcEntryByDB from './CalcEntryByDB'

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

      <Divider dashed />
      <Divider dashed />
      <CalcEntry order_id="20240405-001" />

      <Divider dashed />
      <Divider dashed />

      {orders.map((order) => (
        <CalcEntryVar key={order.id} order={order} />
      ))}

      <Divider dashed />
      <Divider dashed />
      <CalcEntryByDB userID={1} />
    </div>
  )
}
