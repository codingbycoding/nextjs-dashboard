import { serializeCookie } from '@/lib/cookie'
import { getUserByMobile, comparePassword } from '@/models/user'
import * as jwt from 'jsonwebtoken'

async function oddReturn(request : Request) {
  /*
  request.formData().then((data) => {
    console.log(data)
    // do something with the formdata sent in the request
  })
  */

  const data = await request.json()
  const user = await getUserByMobile(data.mobile)
  if (user === undefined && user === null) {
    console.log('user', user)
    return Response.json({ login: false, error: 'name is not adam' }, { status: 401 })
  }

  const match = await comparePassword(data.password, user)

  /*
  await request.json().then((data) => {
    console.debug(data)

    userName = data.name
    if (data.name === null || data.name === undefined || data.name === '') {
      // return Response.json({ login: boolVal, error: 'name not found' }, { status: 401 })
      return 1
    }

    await getUser(data.name).then((user) => {
    })

    // do something with the formdata sent in the request
    return 0
  }).catch((e) => e)
  */

  console.debug('The End. user:', user)

  if (!match) {
    return Response.json({ login: false, error: 'user not found' }, { status: 401 })
  }

  const jwtToken = jwt.sign({ user_id: user?.id }, process.env.JWT_SECRET)

  const cookie = serializeCookie('auth', { jwt: jwtToken, user: { id: user?.id, name: user?.name, mobile: user?.mobile } }, { path: '/' })
  return Response.json({ login: true }, { headers: { 'Set-Cookie': cookie } })
}

export async function POST(request : Request) {
  return oddReturn(request)
}
