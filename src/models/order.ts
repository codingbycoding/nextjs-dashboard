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
      note: row.note,
      width: row.width,
      height: row.height,
      shangXiaGui: row.shang_xia_gui,
      shangXiaFang: row.shang_xia_fang,
      guangQi: row.guang_qi,
      gouQi: row.gou_qi,
      bianFeng: row.bian_feng,
      glassWidth: row.glass_width,
      glassHeight: row.glass_height,
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
        INSERT INTO orders (user_id, format_id, format_name, note, width, height, shang_xia_gui, shang_xia_fang, guang_qi, gou_qi, bian_feng, glass_width, glass_height, create_time)
        VALUES (${order.userID}, ${order.formatID}, ${order.formatName}, ${order.note}, ${order.width}, ${order.height}, ${order.shangXiaGui}, ${order.shangXiaFang}, ${order.guangQi}, ${order.gouQi}, ${order.bianFeng}, ${order.glassWidth}, ${order.glassHeight}, now());
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
