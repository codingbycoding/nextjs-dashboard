import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Order } from '@/models/models'
import ColorEntryVar from './ColorEntryVar'

const ColorEntryByDB = ({ userID } : { userID: number }) => {
  const [dbOrders, setDbOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('/api/mock/orders')
        if (res.status === 200) {
          console.log('dbOrders:', res.data.orders)
          setDbOrders(res.data.orders)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getOrders()
  }, [userID]) // Depend on userID to refetch when it changes

  return (
    <div className="parent-div-for-orders">
      {dbOrders.map((order : Order) => (
        <ColorEntryVar key={order.id} order={order} />
      ))}
    </div>
  )
}

export default ColorEntryByDB
