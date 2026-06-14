import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { makeSupabaseClient } from '@/lib/auth'

export async function GET() {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL || 'https://digiwolf.agency'))
}
