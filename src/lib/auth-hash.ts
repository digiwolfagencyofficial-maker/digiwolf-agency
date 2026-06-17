import type { SupabaseClient } from '@supabase/supabase-js'

export type AuthHashType = 'recovery' | 'signup' | 'magiclink' | 'invite' | string

export function parseAuthHash(): {
  access_token: string
  refresh_token: string
  type: AuthHashType | null
} | null {
  if (typeof window === 'undefined') return null

  const hash = window.location.hash
  if (!hash.includes('access_token=')) return null

  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const access_token = params.get('access_token')
  const refresh_token = params.get('refresh_token')
  if (!access_token || !refresh_token) return null

  return {
    access_token,
    refresh_token,
    type: params.get('type'),
  }
}

export function clearAuthHashFromUrl() {
  if (typeof window === 'undefined') return
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}

/** Read Supabase implicit-flow tokens from the URL hash and store the session. */
export async function establishSessionFromUrlHash(supabase: SupabaseClient) {
  const parsed = parseAuthHash()
  if (!parsed) return { session: null, type: null as AuthHashType | null }

  const { data, error } = await supabase.auth.setSession({
    access_token: parsed.access_token,
    refresh_token: parsed.refresh_token,
  })

  clearAuthHashFromUrl()

  if (error) throw error
  return { session: data.session, type: parsed.type }
}
