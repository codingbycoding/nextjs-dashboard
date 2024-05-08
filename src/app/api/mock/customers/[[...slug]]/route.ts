import { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken'

import { getCustomers, addCustomer, deleteCustomer } from '@/models/customers'
import { User, Customer } from '@/models/models'

function decodeUserID(request : NextRequest) : number {
  const authStr = request.cookies.get('auth')?.value
  if (authStr === undefined) {
    return 0
  }

  const jsonStr = authStr.startsWith('j:') ? JSON.parse(authStr.slice(2)) : authStr

  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET)
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
  console.log('user:', user)
  */
  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET)
  const userID = jwtDecoded?.user_id

  console.debug('user:', user)
  const customers = await getCustomers(userID)
  return Response.json({ customers })
}

export async function POST(request : NextRequest) {
  const authStr = request.cookies.get('auth')?.value
  if (authStr === undefined) {
    return Response.json({ })
  }

  const jsonStr = authStr.startsWith('j:') ? JSON.parse(authStr.slice(2)) : authStr

  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET)
  const userID = jwtDecoded?.user_id

  console.debug('user:', user)

  const customer = await request.json() as Customer
  if (customer === undefined && customer === null) {
    console.log('customer', customer)
    return Response.json({ error: 'customer is wrong' }, { status: 401 })
  }

  customer.userID = userID
  const result = await addCustomer(customer)
  return Response.json({ result })
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  console.log('delete')

  const userID = decodeUserID(request)
  const customerID = parseInt(params.slug, 10)

  const result = await deleteCustomer(userID, customerID)
  return Response.json({ result })
}
