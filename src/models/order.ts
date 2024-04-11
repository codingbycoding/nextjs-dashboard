import sql from '@/lib/db'

export interface Order {
  id: number;
  name: string;
  mobile: string;
  password: string;
}

export async function getOrders(user_id: number) {
  try {
    const orders = await sql`SELECT * from orders WHERE user_id = ${user_id}`
    return orders
  } catch (error) {
    console.error('Error getOrders:', error)
    throw error
  }
}

export async function addOrder(order: Order) : Promise<boolean> {
  await sql`
        INSERT INTO orders (name, mobile)
        VALUES (${order.name}, ${order.mobile});
      `
  return true
}
