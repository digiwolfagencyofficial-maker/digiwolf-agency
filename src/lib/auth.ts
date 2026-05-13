import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function makeSupabaseClient(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  )
}

export async function requireAuth() {
  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
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
