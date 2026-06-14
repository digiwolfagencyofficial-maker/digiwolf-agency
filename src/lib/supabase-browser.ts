import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { getPublicSupabaseAnonKey, getPublicSupabaseUrl } from '@/lib/supabase-env'

export function createSupabaseBrowserClient() {
  return createBrowserClient(getPublicSupabaseUrl(), getPublicSupabaseAnonKey())
}
