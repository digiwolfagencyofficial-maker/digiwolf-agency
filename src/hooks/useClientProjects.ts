'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { resolveServiceName } from '@/lib/project-display'
import { useClientProfile } from '@/hooks/useClientProfile'
import type { ClientProjectView, Service } from '@/types'

// Shape returned by the RLS-scoped query: real `projects` columns plus the
// embedded service row (object or 1-item array depending on PostgREST).
interface ProjectRow {
  id: string
  project_status: string | null
  created_at: string
  service: Service | Service[] | null
}

export function useClientProjects() {
  const { profile, displayName, userInitial } = useClientProfile()
  const [projects, setProjects] = useState<ClientProjectView[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const supabase = createSupabaseBrowserClient()
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          if (!cancelled) setLoading(false)
          return
        }

        // RLS-scoped reads using the user's own session (NOT supabaseAdmin).
        // `projects` is filtered to the logged-in client; the service row is
        // joined in full so we can resolve a display name without assuming
        // the live `services` column names.
        const projectsResult = await supabase
          .from('projects')
          .select('id, project_status, created_at, service:service_id(*)')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })

        if (cancelled) return

        if (projectsResult.error) {
          setError(projectsResult.error.message || 'Failed to load projects')
          setProjects([])
        } else {
          const rows = (projectsResult.data ?? []) as unknown as ProjectRow[]
          setProjects(
            rows.map((row) => ({
              id: row.id,
              name: resolveServiceName(row.service),
              project_status: row.project_status ?? '',
              created_at: row.created_at,
            }))
          )
        }
      } catch {
        if (!cancelled) {
          setError('Failed to load projects')
          setProjects([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { projects, profile, loading, error, displayName, userInitial }
}
