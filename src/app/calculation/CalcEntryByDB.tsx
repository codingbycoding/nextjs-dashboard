import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CalcEntryVar from './CalcEntryVar'
import { Order } from '../../models/order'

const CalcEntryByDB = ({ userID }) => {
  const [dbOrders, setDbOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.post('/api/mock/orders', { user_id: userID })
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
    <div>
      {dbOrders.map((order) => (
        <CalcEntryVar key={order.id} order={order} />
      ))}
    </div>
  )
}

export default CalcEntryByDB
