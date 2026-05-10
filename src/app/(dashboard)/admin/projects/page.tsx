'use client'

import { useEffect, useState } from 'react'
import type { Project, Profile } from '@/types'

type ProjectWithClient = Project & { client?: Pick<Profile, 'full_name' | 'email'> }

const statusOptions: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All Statuses' },
  { value: 'discovery', label: 'Discovery' },
  { value: 'design', label: 'Design' },
  { value: 'development', label: 'Development' },
  { value: 'review', label: 'Review' },
  { value: 'launched', label: 'Launched' },
  { value: 'paused', label: 'Paused' },
]

const statusColors: Record<string, string> = {
  discovery: 'bg-purple-500/20 text-purple-400',
  design: 'bg-blue-500/20 text-blue-400',
  development: 'bg-yellow-500/20 text-yellow-400',
  review: 'bg-orange-500/20 text-orange-400',
  launched: 'bg-green-500/20 text-green-400',
  paused: 'bg-gray-500/20 text-gray-400',
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 bg-white/10 rounded-full h-1.5">
        <div
          className="bg-[#f97316] h-1.5 rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <span className="text-xs text-gray-500">{value}%</span>
    </div>
  )
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithClient[]>([])
  const [filtered, setFiltered] = useState<ProjectWithClient[]>([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) throw new Error('Failed to fetch projects')
        const data = await res.json()
        setProjects(data)
        setFiltered(data)
      } catch {
        setError('Failed to load projects.')
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    if (statusFilter === 'all') {
      setFiltered(projects)
    } else {
      setFiltered(projects.filter((p) => p.status === statusFilter))
    }
  }, [statusFilter, projects])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">All Projects</h1>
          <p className="text-gray-400">Manage all client projects.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-4">
        <label className="text-gray-400 text-sm">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#111111] border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#f97316] transition-colors"
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="text-gray-600 text-sm ml-auto">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {filtered.length === 0 && !error ? (
        <div className="bg-[#111111] rounded-xl border border-white/10 p-12 text-center">
          <div className="text-4xl mb-4">🗂️</div>
          <h3 className="text-white font-semibold mb-2">No projects found</h3>
          <p className="text-gray-400">
            {statusFilter !== 'all' ? 'Try a different status filter.' : 'No projects have been created yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Title</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Client</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Progress</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Budget</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Start</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((project) => (
                  <tr key={project.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{project.title}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {project.client?.full_name ?? project.client?.email ?? '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[project.status] ?? 'bg-gray-500/20 text-gray-400'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <ProgressBar value={project.progress} />
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {project.budget ? `${project.budget.toLocaleString()} ${project.currency}` : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {project.start_date ? new Date(project.start_date).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {project.end_date ? new Date(project.end_date).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
