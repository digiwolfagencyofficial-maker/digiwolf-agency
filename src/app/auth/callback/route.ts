import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { makeSupabaseClient } from '@/lib/auth'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  if (code) {
    const cookieStore = await cookies()
    const supabase = makeSupabaseClient(cookieStore)
    await supabase.auth.exchangeCodeForSession(code)
  }
  return NextResponse.redirect(new URL('/admin', request.url))
}
