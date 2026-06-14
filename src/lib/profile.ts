import type { SupabaseClient } from '@supabase/supabase-js'
import type { ProfileRole } from '@/lib/auth-utils'

export async function getProfileRole(
  supabase: SupabaseClient,
  userId: string
): Promise<ProfileRole | null> {
  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle()

  const role = data?.role
  return role === 'admin' || role === 'client' ? role : null
}
