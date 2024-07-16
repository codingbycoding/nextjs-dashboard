import { serializeCookie } from '@/lib/cookie'
import type { User } from '@/models/models'
import { addUser } from '@/models/user'
import * as jwt from 'jsonwebtoken'

export async function POST(request : Request) {
  const user = await request.json() as User
  const added = await addUser(user)
  if (!added) {
    return Response.json({ login: false, error: 'user add failed' }, { status: 401 })
  }

  const jwtToken = jwt.sign({ user_id: user?.id }, process.env.JWT_SECRET as jwt.Secret)
  const cookie = serializeCookie('auth', { jwt: jwtToken, user: { id: user?.id, name: user?.name, mobile: user?.mobile } }, { path: '/' })
  return Response.json({ login: true }, { headers: { 'Set-Cookie': cookie } })
}
