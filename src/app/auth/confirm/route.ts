import type { EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { makeSupabaseClient } from '@/lib/auth'
import { safeCallbackUrl } from '@/lib/auth-utils'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const tokenHash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null
  const next = safeCallbackUrl(requestUrl.searchParams.get('next')) ?? '/auth/update-password'

  if (!tokenHash || !type) {
    return NextResponse.redirect(new URL('/login?error=invalid_link', request.url))
  }

  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)

  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type })

  if (error) {
    console.error('[auth/confirm] verifyOtp failed:', error.message)
    return NextResponse.redirect(new URL('/login?error=link_expired', request.url))
  }

  return NextResponse.redirect(new URL(next, request.url))
}
