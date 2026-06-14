import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { makeSupabaseClient } from '@/lib/auth'
import { postLoginRedirect, safeCallbackUrl } from '@/lib/auth-utils'
import { getProfileRole } from '@/lib/profile'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = safeCallbackUrl(requestUrl.searchParams.get('next'))

  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)

  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const role = await getProfileRole(supabase, session.user.id)
  const destination = postLoginRedirect(role, next)

  return NextResponse.redirect(new URL(destination, request.url))
}
