import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { getPublicSupabaseAnonKey, getPublicSupabaseUrl } from '@/lib/supabase-env'

export function createSupabaseBrowserClient() {
  return createBrowserClient(getPublicSupabaseUrl(), getPublicSupabaseAnonKey(), {
    auth: {
      // Proxy refreshes tokens on every protected request; browser auto-refresh
      // races with that and can invalidate the shared refresh token.
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
