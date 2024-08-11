import { NextRequest, NextResponse } from 'next/server'

type Middleware = (request: NextRequest) => NextResponse

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const redirectIfAuthenticated: Middleware = (request) => {
  const authSession = request.cookies.get('auth')?.value

  console.debug('redirectIfAuthenticated authSession:%s', authSession)
  const originalUrl = request.nextUrl.protocol + request.headers.get('host') + request.nextUrl.pathname

  if (authSession) {
    // return NextResponse.redirect(new URL('/calculation', request.url))
    const url = new URL('/calculation', originalUrl)
    return NextResponse.redirect(url)
    // return NextResponse.redirect(new URL('/calculation', originalUrl))
  }

  return NextResponse.next()
}

const authenticated: Middleware = (request) => {
  const authSession = request.cookies.get('auth')?.value

  const originalUrl = request.nextUrl.protocol + request.headers.get('host') + request.nextUrl.pathname

  if (!authSession) {
    const url = new URL('/calculation', originalUrl)
    const response = NextResponse.redirect(url)
    // const response = NextResponse.redirect(new URL('/login', originalUrl))
    response.cookies.set({
      name: 'redirect',
      value: url.toString(),
    })
    return response
  }

  const url = new URL('/calculation', originalUrl)
  const response = NextResponse.redirect(url)
  response.cookies.set({
    name: 'redirect',
    value: url.toString(),
  })
  return response
  // return NextResponse.next()
}

export default function middleware(request: NextRequest) {
  // Uncomment if you want to redirect if authenticated.
  if ([
    '/login',
    '/register',
  ].includes(request.nextUrl.pathname)) {
    return redirectIfAuthenticated(request)
  }

  if ([
    '/',
    '/pokemons',
    // '/calculation',
  ].includes(request.nextUrl.pathname)) {
    return authenticated(request)
  }

  return NextResponse.next()
}
