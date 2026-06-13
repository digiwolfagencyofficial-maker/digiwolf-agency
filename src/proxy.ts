import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { routing } from './i18n/routing'

const handleI18nRouting = createIntlMiddleware(routing)

const protectedPrefixes = ['/dashboard', '/admin', '/client']

export async function proxy(req: NextRequest) {
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

    return NextResponse.next()
  }

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/logout') ||
    pathname.startsWith('/auth')
  ) {
    return NextResponse.next()
  }

  return handleI18nRouting(req)
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
