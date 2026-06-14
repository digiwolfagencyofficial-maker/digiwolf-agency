export const SUPABASE_PLACEHOLDER_URL = 'https://placeholder.supabase.co'
export const SUPABASE_PLACEHOLDER_KEY = 'placeholder-key'

export function getPublicSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_PLACEHOLDER_URL
}

export function getPublicSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_PLACEHOLDER_KEY
}

export function getServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_PLACEHOLDER_KEY
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}
