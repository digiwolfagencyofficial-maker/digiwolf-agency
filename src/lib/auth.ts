import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
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
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')
  return session
}

export async function requireAdmin() {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')

  const role = await getProfileRole(supabase, session.user.id)
  if (role !== 'admin') redirect('/dashboard')

  return session
}

export async function getSession() {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export { makeSupabaseClient }
