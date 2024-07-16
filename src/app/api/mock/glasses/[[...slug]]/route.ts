import { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken'

import {
  getGlasses, addGlass, addGlasses, deleteGlass,
} from '@/models/glass'
import { User, Glass } from '@/models/models'

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
  console.log('user:', user)
  */
  const user = jsonStr.user as User

  const jwtDecoded = jwt.verify(jsonStr.jwt, process.env.JWT_SECRET as jwt.Secret) as jwt.JwtPayload
  const userID = jwtDecoded?.user_id

  console.debug('user:', user)
  const glasses = await getGlasses(userID)
  return Response.json({ glasses })
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

  const glass = await request.json() as Glass
  if (glass === undefined && glass === null) {
    console.log('glass', glass)
    return Response.json({ error: 'glass is wrong' }, { status: 401 })
  }

  glass.userID = userID
  const glasses = [] as Glass[]

  const list = JSON.parse(glass.list ?? '')

  /*
  glass.list
    && Object.entries(list).map(([key, value]) => {
      const g = { userID, name: key, note: value } as Glass
      glasses.push(g)
    })

  const result = await addGlasses(glasses)
  */

  glass.list
    && Promise.all(
      Object.entries(list).map(async ([key, value]) => {
        const g = { userID, name: key, note: value } as Glass
        await addGlass(g)
      }),
    )
      .then(() => {
        console.log('Glasses added successfully')
      })
      .catch((error) => {
        console.log('Error adding glasses:', error)
      })

  return Response.json({ result: 'true' })

//  return Response.json({ result })
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  console.log('delete')

  const userID = decodeUserID(request)
  const glassID = parseInt(params.slug, 10)

  const result = await deleteGlass(userID, glassID)
  return Response.json({ result })
}
