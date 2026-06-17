import { NextRequest, NextResponse } from 'next/server'
import { requireAuthApi } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

// Profile writes are admin-only under RLS, so this route uses the service-role
// client. It is hard-scoped to the caller's own auth.uid() and only ever writes
// an allowlist of safe fields — it can NEVER change `role` or the auth email.
const ALLOWED_FIELDS = ['full_name'] as const
const MAX_LEN = 200

function normalize(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, MAX_LEN)
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAuthApi()
  if (auth.error) return auth.error

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const updates: Record<string, string | null> = {}
  for (const field of ALLOWED_FIELDS) {
    if (field in body) updates[field] = normalize(body[field])
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update(updates)
    .eq('id', auth.user.id)
    .select('full_name')
    .single()

  if (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }

  return NextResponse.json({ success: true, profile: data })
}
