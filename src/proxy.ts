import createIntlMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getProfileRole } from '@/lib/profile'
import { createSupabaseProxyClient } from '@/lib/supabase-proxy'
import { routing } from './i18n/routing'

const handleI18nRouting = createIntlMiddleware(routing)

const protectedPrefixes = ['/dashboard', '/admin', '/client']

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix))

  if (isProtected) {
    const { supabase, getResponse, applyCookiesTo } = createSupabaseProxyClient(req)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return applyCookiesTo(NextResponse.redirect(loginUrl))
    }

    if (pathname.startsWith('/admin')) {
      const role = await getProfileRole(supabase, user.id)
      if (role !== 'admin') {
        return applyCookiesTo(NextResponse.redirect(new URL('/dashboard', req.url)))
      }
    }

    return getResponse()
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
