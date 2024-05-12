import sql from '@/lib/db'

import { Order } from '@/models/models'

export async function getOrders(user_id: number) : Promise<Order[]> {
  try {
    const sqlOrders = await sql`SELECT * from orders WHERE user_id = ${user_id} AND delete_time IS NULL order by create_time desc`
    const orders: Order[] = sqlOrders.map((row) => ({
      id: row.id,
      userID: row.user_id,
      formatID: row.format_id,
      formatName: row.format_name,
      equation: row.equation,
      createTime: row.create_time,
      deleteTime: row.delete_time,
    }))
    return orders
  } catch (error) {
    console.error('Error getOrders:', error)
    throw error
  }
}

export async function addOrder(order: Order) : Promise<boolean> {
  await sql`
        INSERT INTO orders (user_id, format_id, format_name, note, width, height, equation, create_time)
        VALUES (${order.userID}, ${order.formatID}, ${order.formatName}, ${order.note}, ${order.width}, ${order.height}, ${order.equation}, now());
      `
  return true
}

/*
export async function deleteOrder(userID: number, orderID: number) : Promise<boolean> {
  await sql`DELETE FROM orders where user_id = ${userID} AND id = ${orderID};`
  return true
}
*/

export async function deleteOrder(userID: number, orderID: number) : Promise<boolean> {
  await sql`UPDATE orders SET delete_time = now() where user_id = ${userID} AND id = ${orderID};`
  return true
}
