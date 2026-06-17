export const dynamic = 'force-dynamic'

import { supabaseAdmin } from '@/lib/supabase'
import { ClientsPageInner } from './ClientsContent'

export default async function Page() {
  const { data: services } = await supabaseAdmin
    .from('services')
    .select('id, name, slug')
    .eq('active', true)
    .order('name')

  return <ClientsPageInner initialServices={services ?? []} />
}
