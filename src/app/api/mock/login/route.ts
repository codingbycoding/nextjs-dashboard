import { serializeCookie } from '@/lib/cookie'
import { getUserByMobile, comparePassword } from '@/models/user'

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

  console.debug('The End. user.name:%s', user?.name)

  if (!match) {
    return Response.json({ login: false, error: 'user not found' }, { status: 401 })
  }

  const cookie = serializeCookie('auth', { user: { name: user?.name } }, { path: '/' })
  return Response.json({ login: true }, { headers: { 'Set-Cookie': cookie } })
}

export async function POST(request : Request) {
  return oddReturn(request)
}
