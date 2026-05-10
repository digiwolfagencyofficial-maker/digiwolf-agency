'use client'

import { useEffect, useState } from 'react'
import type { Project } from '@/types'

interface Stats {
  activeProjects: number
  pendingInvoices: number
  messages: number
}

function StatCard({ label, value, icon, accent }: { label: string; value: number | string; icon: string; accent?: boolean }) {
  return (
    <div className="bg-[#111111] rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {accent && (
          <div className="w-2 h-2 rounded-full bg-[#f97316]" />
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-white/10 rounded-full h-2">
      <div
        className="bg-[#f97316] h-2 rounded-full transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

const statusColors: Record<string, string> = {
  discovery: 'bg-purple-500/20 text-purple-400',
  design: 'bg-blue-500/20 text-blue-400',
  development: 'bg-yellow-500/20 text-yellow-400',
  review: 'bg-orange-500/20 text-orange-400',
  launched: 'bg-green-500/20 text-green-400',
  paused: 'bg-gray-500/20 text-gray-400',
}

export default function ClientOverviewPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [stats, setStats] = useState<Stats>({ activeProjects: 0, pendingInvoices: 0, messages: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, invoicesRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/invoices'),
        ])

        const projectsData: Project[] = projectsRes.ok ? await projectsRes.json() : []
        const invoicesData: { status: string }[] = invoicesRes.ok ? await invoicesRes.json() : []

        const activeProjects = projectsData.filter(
          (p) => !['launched', 'paused'].includes(p.status)
        ).length
        const pendingInvoices = invoicesData.filter(
          (i) => i.status === 'sent' || i.status === 'overdue'
        ).length

        setProjects(projectsData.slice(0, 5))
        setStats({ activeProjects, pendingInvoices, messages: 0 })
      } catch {
        setError('Failed to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here&apos;s what&apos;s happening with your projects.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Active Projects" value={stats.activeProjects} icon="🗂️" accent />
        <StatCard label="Pending Invoices" value={stats.pendingInvoices} icon="🧾" />
        <StatCard label="Messages" value={stats.messages} icon="💬" />
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Projects</h2>
        {projects.length === 0 ? (
          <div className="bg-[#111111] rounded-xl border border-white/10 p-8 text-center text-gray-400">
            No projects yet. Your projects will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-[#111111] rounded-xl border border-white/10 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-medium">{project.title}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColors[project.status] ?? 'bg-gray-500/20 text-gray-400'}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ProgressBar value={project.progress} />
                  <span className="text-sm text-[#f97316] font-medium w-10 text-right shrink-0">
                    {project.progress}%
                  </span>
                </div>
                {(project.start_date || project.end_date) && (
                  <div className="mt-2 text-xs text-gray-500 flex gap-4">
                    {project.start_date && <span>Started: {new Date(project.start_date).toLocaleDateString()}</span>}
                    {project.end_date && <span>Due: {new Date(project.end_date).toLocaleDateString()}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
