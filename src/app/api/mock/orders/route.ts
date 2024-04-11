import { getOrders } from '@/models/order'
import { User } from '@/models/user'

export async function POST(request : Request) {
  const user = await request.json() as User
  console.log('user:', user)

  const orders = await getOrders(10000)
  return Response.json({ orders })
}
