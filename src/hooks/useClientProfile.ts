'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import type { UserRole } from '@/types'

interface ClientProfile {
  full_name: string | null
  role: UserRole | null
}

export function resolveClientDisplayName(
  fullName: string | null | undefined,
  email: string | null | undefined
): string {
  const trimmed = fullName?.trim()
  if (trimmed) return trimmed
  const trimmedEmail = email?.trim()
  if (trimmedEmail) return trimmedEmail
  return ''
}

export function resolveClientInitial(
  fullName: string | null | undefined,
  email: string | null | undefined
): string {
  const trimmed = fullName?.trim()
  if (trimmed) return trimmed.charAt(0).toUpperCase()
  const trimmedEmail = email?.trim()
  if (trimmedEmail) return trimmedEmail.charAt(0).toUpperCase()
  return ''
}

export function resolveRoleLabel(role: UserRole | null | undefined): string {
  if (role === 'admin' || role === 'client') return role
  return ''
}

export function useClientProfile() {
  const [profile, setProfile] = useState<ClientProfile | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)

      try {
        const supabase = createSupabaseBrowserClient()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          return
        }

        if (!cancelled) {
          setEmail(session.user.email ?? null)
          setUserId(session.user.id)
        }

        const { data } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', session.user.id)
          .maybeSingle()

        if (!cancelled && data) {
          setProfile(data as ClientProfile)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [reloadKey])

  const refresh = () => setReloadKey((k) => k + 1)

  const displayName = resolveClientDisplayName(profile?.full_name, email)
  const userInitial = resolveClientInitial(profile?.full_name, email)
  const roleLabel = resolveRoleLabel(profile?.role)

  return { profile, email, userId, displayName, userInitial, roleLabel, loading, refresh }
}
