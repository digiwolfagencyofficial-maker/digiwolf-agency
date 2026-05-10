'use client'

import { useEffect, useState } from 'react'
import type { Project } from '@/types'

const statusColors: Record<string, string> = {
  discovery: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  design: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  development: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  review: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  launched: 'bg-green-500/20 text-green-400 border-green-500/30',
  paused: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-white/10 rounded-full h-2">
        <div
          className="bg-[#f97316] h-2 rounded-full transition-all"
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      <span className="text-sm text-gray-400 w-8 text-right">{value}%</span>
    </div>
  )
}

export default function ClientProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) throw new Error('Failed to fetch projects')
        const data = await res.json()
        setProjects(data)
      } catch {
        setError('Failed to load projects.')
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">My Projects</h1>
        <p className="text-gray-400">Track the progress of all your projects.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {projects.length === 0 && !error ? (
        <div className="bg-[#111111] rounded-xl border border-white/10 p-12 text-center">
          <div className="text-4xl mb-4">🗂️</div>
          <h3 className="text-white font-semibold mb-2">No projects yet</h3>
          <p className="text-gray-400">Your projects will appear here once they&apos;re created.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111111] rounded-xl border border-white/10 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                  {project.description && (
                    <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                  )}
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize border ${statusColors[project.status] ?? 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
                  {project.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} />
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                {project.start_date && (
                  <span>
                    <span className="text-gray-600">Start:</span>{' '}
                    <span className="text-gray-400">{new Date(project.start_date).toLocaleDateString()}</span>
                  </span>
                )}
                {project.end_date && (
                  <span>
                    <span className="text-gray-600">Due:</span>{' '}
                    <span className="text-gray-400">{new Date(project.end_date).toLocaleDateString()}</span>
                  </span>
                )}
                {project.budget && (
                  <span>
                    <span className="text-gray-600">Budget:</span>{' '}
                    <span className="text-[#f97316]">
                      {project.budget.toLocaleString()} {project.currency}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
