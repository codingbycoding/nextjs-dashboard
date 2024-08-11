import { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken'

import { getOrders, getOrdersByStatus, addOrder, deleteOrder, updateOrderStatus } from '@/models/order'
import { User, Order } from '@/models/models'

function decodeUserID(request : NextRequest) : number {
  const authStr = request.cookies.get('auth')?.value
  if (authStr === undefined) {
    return 0
  }

  const jsonStr = authStr.startsWith('j:') ? JSON.parse(authStr.slice(2)) : authStr

  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload
  const userID = jwtDecoded?.user_id

  console.debug('user:', user)
  return userID
}

export async function GET(request : NextRequest) {
  const authStr = request.cookies.get('auth')?.value
  if (authStr === undefined) {
    return Response.json({ })
  }

  const jsonStr = authStr.startsWith('j:') ? JSON.parse(authStr.slice(2)) : authStr

  /*
  const user = await request.json() as User
  console.debug('user:', user)
  */
  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload
  const userID = jwtDecoded?.user_id
  const strs = request.url.split('?')
  const params = strs[1].split('=')
  const status = params[1] as unknown as number

  console.debug('user:', user, ' url:', request.url, ' status:', status)
  const orders = await getOrdersByStatus(userID, status)
  return Response.json({ orders })
}

export async function PATCH(request : NextRequest, { params }: { params: { slug: string } }) {
  const authStr = request.cookies.get('auth')?.value
  if (authStr === undefined) {
    return Response.json({ })
  }

  const jsonStr = authStr.startsWith('j:') ? JSON.parse(authStr.slice(2)) : authStr

  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload
  const userID = jwtDecoded?.user_id

  console.debug('user:', user)

  const statusObj = await request.json() as {status : number}
  /*
  if (order === undefined && order === null) {
    console.debug('order', order)
    return Response.json({ error: 'order is wrong' }, { status: 401 })
  }
  */

  const orderID = parseInt(params.slug, 10)
  const result = await updateOrderStatus(userID, orderID, statusObj.status)
  return Response.json({ result })
}


export async function POST(request : NextRequest) {
  const authStr = request.cookies.get('auth')?.value
  if (authStr === undefined) {
    return Response.json({ })
  }

  const jsonStr = authStr.startsWith('j:') ? JSON.parse(authStr.slice(2)) : authStr

  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload
  const userID = jwtDecoded?.user_id

  console.debug('user:', user)

  const order = await request.json() as Order
  if (order === undefined && order === null) {
    console.debug('order', order)
    return Response.json({ error: 'order is wrong' }, { status: 401 })
  }

  order.userID = userID
  const result = await addOrder(order)
  return Response.json({ result })
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  console.debug('delete')

  const userID = decodeUserID(request)
  const orderID = parseInt(params.slug, 10)

  const result = await deleteOrder(userID, orderID)
  return Response.json({ result })
}
