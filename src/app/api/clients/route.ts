import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { requireAdminApi } from '@/lib/auth'

export async function GET() {
  const auth = await requireAdminApi()
  if (auth.error) return auth.error

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
