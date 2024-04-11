import { serializeCookie } from '@/lib/cookie'
import type { User } from '@/models/user'
import { addUser } from '@/models/user'

export async function POST(request : Request) {
  const user = await request.json() as User
  const added = await addUser(user)
  if (!added) {
    return Response.json({ login: false, error: 'user add failed' }, { status: 401 })
  }

  const cookie = serializeCookie('auth', { user: { name: user?.name } }, { path: '/' })
  return Response.json({ login: true }, { headers: { 'Set-Cookie': cookie } })
}
