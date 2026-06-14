import { createClient } from '@supabase/supabase-js'
import { getPublicSupabaseAnonKey, getPublicSupabaseUrl, getServiceRoleKey } from '@/lib/supabase-env'

export { isSupabaseConfigured } from '@/lib/supabase-env'

export const supabase = createClient(getPublicSupabaseUrl(), getPublicSupabaseAnonKey())

export const supabaseAdmin = createClient(getPublicSupabaseUrl(), getServiceRoleKey(), {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
