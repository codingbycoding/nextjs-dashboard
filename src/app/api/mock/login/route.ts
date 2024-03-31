import { serializeCookie } from '@/lib/cookie'

let counter = 1

function oddReturn() {
  counter += 1
  const boolVal = counter % 2 === 0

  console.log('counter:%d, boolVal:', counter, boolVal)

  if (!boolVal) {
    return Response.redirect('/login', 401)
  }

  const cookie = serializeCookie('auth', { user: 'Andy' }, { path: '/' })
  return Response.json({ login: boolVal }, {
    headers: {
      'Set-Cookie': cookie,
    },
  })
}

export async function POST() {
  return oddReturn()
}
