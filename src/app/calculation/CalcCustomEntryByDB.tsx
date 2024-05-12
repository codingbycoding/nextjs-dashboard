import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Order } from '@/models/models'
import CalcCustomEntryVar from './CalcCustomEntryVar'

const CalcCustomEntryByDB = ({ userID } : { userID: number }) => {
  const [dbOrders, setDbOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('/api/mock/orders')
        if (res.status === 200) {
          console.log('res.data.orders:', res.data.orders)
          setDbOrders(res.data.orders)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getOrders()
  }, [userID])

  return (
    <div className="parent-div-for-orders">
      {dbOrders.map((order : Order) => (
        <CalcCustomEntryVar key={order.id} order={order} />
      ))}
    </div>
  )
}

export default CalcCustomEntryByDB
