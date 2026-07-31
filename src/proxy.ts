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
      // Clone the incoming request's own URL rather than constructing a new
      // one from an env var, so this always redirects to /login on whatever
      // host is actually being browsed (localhost, preview, or production).
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/login'
      loginUrl.search = ''
      loginUrl.searchParams.set('callbackUrl', pathname)
      return applyCookiesTo(NextResponse.redirect(loginUrl))
    }

    if (pathname.startsWith('/admin')) {
      const role = await getProfileRole(supabase, user.id)
      if (role !== 'admin') {
        const dashboardUrl = req.nextUrl.clone()
        dashboardUrl.pathname = '/dashboard'
        dashboardUrl.search = ''
        return applyCookiesTo(NextResponse.redirect(dashboardUrl))
      }
    }

    return getResponse()
  }

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password') ||
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
