import { NextResponse } from 'next/server'
import { requireAdminApi } from '@/lib/auth'
import { resolveServiceName } from '@/lib/project-display'
import { supabaseAdmin } from '@/lib/supabase'
import type { Service } from '@/types'

type ProjectRow = {
  id: string
  user_id: string
  project_status: string | null
  created_at: string
  service: Service | Service[] | null
}

export async function GET() {
  const auth = await requireAdminApi()
  if (auth.error) return auth.error

  const { data: profiles, error: profilesError } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, created_at')
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  if (profilesError) {
    console.error('Admin clients fetch error:', profilesError)
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }

  const clientProfiles = profiles ?? []
  const userIds = clientProfiles.map((p) => p.id)

  const projectsByUser = new Map<
    string,
    { id: string; service_name: string; project_status: string; created_at: string }[]
  >()

  if (userIds.length > 0) {
    const { data: projects, error: projectsError } = await supabaseAdmin
      .from('projects')
      .select('id, user_id, project_status, created_at, service:service_id(id, name, slug)')
      .in('user_id', userIds)
      .order('created_at', { ascending: false })

    if (projectsError) {
      console.error('Admin clients projects fetch error:', projectsError)
      return NextResponse.json({ error: 'Failed to fetch client projects' }, { status: 500 })
    }

    for (const row of (projects ?? []) as unknown as ProjectRow[]) {
      const list = projectsByUser.get(row.user_id) ?? []
      list.push({
        id: row.id,
        service_name: resolveServiceName(row.service),
        project_status: row.project_status ?? '',
        created_at: row.created_at,
      })
      projectsByUser.set(row.user_id, list)
    }
  }

  const emailById = new Map<string, string>()
  await Promise.all(
    clientProfiles.map(async (profile) => {
      const { data, error } = await supabaseAdmin.auth.admin.getUserById(profile.id)
      if (!error && data?.user?.email) {
        emailById.set(profile.id, data.user.email)
      }
    })
  )

  const clients = clientProfiles.map((profile) => ({
    id: profile.id,
    full_name: profile.full_name,
    email: emailById.get(profile.id) ?? '',
    created_at: profile.created_at,
    projects: projectsByUser.get(profile.id) ?? [],
  }))

  return NextResponse.json({ clients })
}
