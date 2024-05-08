import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Customer } from '@/models/models'
import CustomersVar from './CustomerEntryVar'

const CustomersByDB = ({ userID } : { userID: number }) => {
  const [dbCustomers, setdbCustomers] = useState([])

  useEffect(() => {
    const getcustomers = async () => {
      try {
        const res = await axios.get('/api/mock/customers')
        if (res.status === 200) {
          console.log('res.data.customers:', res.data.customers)

          const newCustomers = res.data.customers.map((customer: Customer) => {
            try {
              customer.kvs = JSON.parse(customer.encoded_data)
              return customer
            } catch (err) {
              console.error('Error parsing equation:', err)
              return { name: customer.name, equation: {} }
            }
          })

          // setdbCustomers(res.data.customers)
          console.log('newCustomers:', newCustomers)
          setdbCustomers(newCustomers)
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    }

    getcustomers()

    console.log('dbCustomers:', dbCustomers)
  }, [userID]) // Depend on userID to refetch when it changes

  return (
    <div className="parent-div-for-customers">
      {dbCustomers.map((customer : Customer) => (
        <CustomersVar key={customer.id} customer={customer} />
      ))}
    </div>
  )
}

export default CustomersByDB
