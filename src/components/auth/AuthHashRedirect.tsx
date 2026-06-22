'use client'

import { useEffect, useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { establishSessionFromUrlHash } from '@/lib/auth-hash'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'

/** Catches Supabase implicit-flow redirects that land with #access_token on any page. */
export default function AuthHashRedirect() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = useMemo(() => createSupabaseBrowserClient(), [])

  useEffect(() => {
    let active = true

    ;(async () => {
      try {
        const { session, type } = await establishSessionFromUrlHash(supabase)
        if (!active || !session) return

        // Pages that handle the recovery session themselves — don't bounce away.
        const recoveryPages = ['/reset-password', '/auth/update-password']
        if (type === 'recovery' && !recoveryPages.includes(pathname)) {
          router.replace('/reset-password')
          return
        }

        // Recovery hash landed on a page that handles it — let that page proceed.
        if (type === 'recovery') return

        if (pathname === '/' || pathname === '/login') {
          router.replace('/dashboard')
        }
      } catch {
        if (active) router.replace('/login?error=link_expired')
      }
    })()

    return () => {
      active = false
    }
  }, [supabase, router, pathname])

  return null
}
