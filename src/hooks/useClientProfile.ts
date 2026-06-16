'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

interface ClientProfile {
  full_name: string | null
}

export function resolveClientDisplayName(
  fullName: string | null | undefined,
  email: string | null | undefined
): string {
  const trimmed = fullName?.trim()
  if (trimmed) return trimmed
  const trimmedEmail = email?.trim()
  if (trimmedEmail) return trimmedEmail
  return 'Client'
}

export function resolveClientInitial(displayName: string): string {
  return (displayName.charAt(0) || 'C').toUpperCase()
}

export function useClientProfile() {
  const [profile, setProfile] = useState<ClientProfile | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
        }

        const { data } = await supabase
          .from('profiles')
          .select('full_name')
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
  }, [])

  const displayName = resolveClientDisplayName(profile?.full_name, email)
  const userInitial = resolveClientInitial(displayName)

  return { profile, email, displayName, userInitial, loading }
}
