import { createServerClient } from '@supabase/auth-helpers-nextjs'
import type { Session, User } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import { getPublicSupabaseAnonKey, getPublicSupabaseUrl } from '@/lib/supabase-env'
import { getProfileRole } from '@/lib/profile'

function makeSupabaseClient(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createServerClient(getPublicSupabaseUrl(), getPublicSupabaseAnonKey(), {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {}
      },
    },
  })
}

export async function requireAuth() {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')
  return session
}

export async function requireAdmin() {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) redirect('/login')

  const role = await getProfileRole(supabase, user.id)
  if (role !== 'admin') redirect('/dashboard')

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')
  return session
}

export async function getSession() {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

/** For API routes — returns JSON 401/403 instead of redirecting. */
export async function requireAdminApi(): Promise<
  { session: Session; error?: never } | { session?: never; error: NextResponse }
> {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)

  // getUser() validates the JWT with Supabase — more reliable than getSession() in route handlers.
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  const role = await getProfileRole(supabase, user.id)
  if (role !== 'admin') {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  return { session }
}

/**
 * For API routes that any signed-in user (not just admins) may call.
 * Returns the JWT-validated user, or a JSON 401 — never redirects.
 */
export async function requireAuthApi(): Promise<
  { user: User; error?: never } | { user?: never; error: NextResponse }
> {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)

  // getUser() validates the JWT with Supabase — more reliable than getSession() in route handlers.
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  return { user }
}

export { makeSupabaseClient }
