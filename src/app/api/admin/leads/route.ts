import { NextResponse } from 'next/server'
import { requireAdminApi } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const auth = await requireAdminApi()
  if (auth.error) return auth.error

  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('id, name, email, message, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Admin leads fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }

  return NextResponse.json({ leads: data ?? [] })
}
