import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAuthApi, makeSupabaseClient } from '@/lib/auth'
import { getProfileRole } from '@/lib/profile'

export async function GET() {
  const auth = await requireAuthApi()
  if (auth.error) return auth.error

  const cookieStore = await cookies()
  const supabase = makeSupabaseClient(cookieStore)
  const role = await getProfileRole(supabase, auth.user.id)

  let query = supabaseAdmin
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false })

  if (role !== 'admin') {
    query = query.eq('client_id', auth.user.id)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
