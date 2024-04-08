import { serializeCookie } from '@/lib/cookie'

let counter = 1

async function oddReturn(request : Request) {
  counter += 1
  const boolVal = counter % 2 === 0

  /*
  request.formData().then((data) => {
    console.log(data)
    // do something with the formdata sent in the request
  })
  */

  let userName
  await request.json().then((data) => {
    console.debug(data)

    userName = data.name
    if (data.name === null || data.name === undefined || data.name === '') {
      // return Response.json({ login: boolVal, error: 'name not found' }, { status: 401 })
      return 1
    }

    if (data.name !== 'adam') {
      // return Response.json({ login: boolVal, error: 'name is not adam' }, { status: 401 })
      return 1
    }
    // do something with the formdata sent in the request
    return 0
  }).catch((e) => e)

  console.debug('counter:%d, boolVal:', counter, boolVal)

  /*
  if (!boolVal) {
    // Redirect the user to the login page
    // Response.writeHead(302, { Location: '/login' })
    // res.end()
    // return

    // return Response.redirect('/login', 401)
    // return Response.redirect(new URL('/login'))

    return Response.json({ login: boolVal }, { status: 401 })
  }
  */

  console.debug('The End. userName:%s', userName)

  if (userName === 'adam') {
    const cookie = serializeCookie('auth', { user: { name: userName } }, { path: '/' })
    return Response.json({ login: boolVal }, {
      headers: {
        'Set-Cookie': cookie,
      },
    })
  }

  return Response.json({ login: boolVal, error: 'name is not adam' }, { status: 401 })
}

export async function POST(request : Request) {
  return oddReturn(request)
}
