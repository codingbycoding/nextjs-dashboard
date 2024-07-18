/* eslint-disable no-console */
import { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken'

import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getColors, addColor, addColors, deleteColor,
} from '@/models/color'
import { User, Color } from '@/models/models'

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

  console.debug('authStr:', authStr)
  const jsonStr = authStr.startsWith('j:') ? JSON.parse(authStr.slice(2)) : authStr

  /*
  const user = await request.json() as User
  console.log('user:', user)
  */
  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload
  console.debug('jwtDecoded :', jwtDecoded)
  const userID = jwtDecoded.user_id

  console.debug('user:', user)
  const colors = await getColors(userID)
  return Response.json({ colors })
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

  const color = await request.json() as Color
  if (color === undefined && color === null) {
    console.log('color', color)
    return Response.json({ error: 'color is wrong' }, { status: 401 })
  }

  color.userID = userID
  // const colors = [] as Color[]

  const list = JSON.parse(color.list ?? '')

  /*
  color.list
    && Object.entries(list).map(([key, value]) => {
      const g = { userID, name: key, note: value } as Color
      colors.push(g)
    })

  const result = await addColors(colors)
  */

  color.list
    && Promise.all(
      Object.entries(list).map(async ([key, value]) => {
        const g = { userID, name: key, note: value } as Color
        await addColor(g)
      }),
    )
      .then(() => {
        console.log('Colors added successfully')
      })
      .catch((error) => {
        console.log('Error adding colors:', error)
      })

  return Response.json({ result: 'true' })

//  return Response.json({ result })
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  console.log('delete')

  const userID = decodeUserID(request)
  const colorID = parseInt(params.slug, 10)

  const result = await deleteColor(userID, colorID)
  return Response.json({ result })
}
