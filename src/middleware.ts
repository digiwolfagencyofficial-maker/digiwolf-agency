import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedPrefixes = ['/dashboard', '/admin', '/client']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix))

  if (isProtected) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/client/:path*',
  ],
}
