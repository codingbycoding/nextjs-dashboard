import sql from '@/lib/db'

import { Customer } from '@/models/models'

const customersTableName = 'wdw_customers'

export async function getCustomers(user_id: number) : Promise<Customer[]> {
  console.debug('getCustomers user_id:', user_id)

  try {
    const sqlcustomers = await sql`SELECT * from wdw_customers WHERE user_id = ${user_id} AND delete_time IS NULL order by create_time desc`
    const customers: Customer[] = sqlcustomers.map((row) => ({
      id: row.id,
      userID: row.user_id,
      name: row.name,
      mobile: row.mobile,
      encoded_data: row.encoded_data,
      createTime: row.create_time,
      deleteTime: row.delete_time,
    }))
    return customers
  } catch (error) {
    console.error('Error getCustomers:', error)
    throw error
  }
}

export async function addCustomer(customer: Customer) : Promise<boolean> {
  console.debug('addCustomer customer:', customer)
  await sql`
        INSERT INTO wdw_customers (user_id, name, mobile, encoded_data, create_time)
        VALUES (${customer.userID}, ${customer.name}, ${customer.mobile}, ${customer.encoded_data}, now());
      `
  return true
}

export async function deleteCustomer(userID: number, customerID: number) : Promise<boolean> {
  await sql`UPDATE ${customersTableName} SET delete_time = now() where user_id = ${userID} AND id = ${customerID};`
  return true
}
