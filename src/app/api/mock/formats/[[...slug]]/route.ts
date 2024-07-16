import { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken'

import { getFormats, addFormat, deleteFormat } from '@/models/format'
import { User, Format } from '@/models/models'

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
  const formats = await getFormats(userID)
  return Response.json({ formats })
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

  const format = await request.json() as Format
  if (format === undefined && format === null) {
    console.log('format', format)
    return Response.json({ error: 'format is wrong' }, { status: 401 })
  }

  format.userID = userID
  const result = await addFormat(format)
  return Response.json({ result })
}

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
  console.log('delete')

  const userID = decodeUserID(request)
  const formatID = parseInt(params.slug, 10)

  const result = await deleteFormat(userID, formatID)
  return Response.json({ result })
}
