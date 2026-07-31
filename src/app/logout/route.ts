import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import { makeSupabaseClient } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
  await supabase.auth.signOut()
  // Redirect relative to the incoming request's own origin (localhost, a
  // preview deployment, or production) — never a hardcoded/env-derived
  // domain, so logging out on localhost can't bounce you to production.
  return NextResponse.redirect(new URL('/login', request.url))
}
