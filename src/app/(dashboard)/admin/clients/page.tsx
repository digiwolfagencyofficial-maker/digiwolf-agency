'use client'

import { useEffect, useState } from 'react'

interface ClientRecord {
  id: string
  full_name: string | null
  email: string
  company: string | null
  project_count: number
  created_at: string
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientRecord[]>([])
  const [filtered, setFiltered] = useState<ClientRecord[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch('/api/clients')
        if (!res.ok) throw new Error('Failed to fetch clients')
        const data = await res.json()
        setClients(data)
        setFiltered(data)
      } catch {
        setError('Failed to load clients.')
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
  }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    if (!q) {
      setFiltered(clients)
      return
    }
    setFiltered(
      clients.filter(
        (c) =>
          (c.full_name ?? '').toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          (c.company ?? '').toLowerCase().includes(q)
      )
    )
  }, [search, clients])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading clients...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Clients</h1>
          <p className="text-gray-400">Manage all agency clients.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or company..."
          className="w-full bg-[#111111] border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#f97316] transition-colors"
        />
      </div>

      {filtered.length === 0 && !error ? (
        <div className="bg-[#111111] rounded-xl border border-white/10 p-12 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-white font-semibold mb-2">
            {search ? 'No clients match your search' : 'No clients yet'}
          </h3>
          <p className="text-gray-400">
            {search ? 'Try a different search term.' : 'Clients will appear here when they register.'}
          </p>
        </div>
      ) : (
        <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Name</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Email</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Company</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Projects</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((client) => (
                  <tr key={client.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">
                      {client.full_name ?? '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-400">{client.email}</td>
                    <td className="px-6 py-4 text-gray-400">{client.company ?? '—'}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#f97316]/20 text-[#f97316]">
                        {client.project_count ?? 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(client.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-white/10 text-xs text-gray-500">
            {filtered.length} client{filtered.length !== 1 ? 's' : ''}
            {search && ` matching "${search}"`}
          </div>
        </div>
      )}
    </div>
  )
}
