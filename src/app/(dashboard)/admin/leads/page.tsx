'use client'

import { useEffect, useState } from 'react'
import type { Lead, LeadStatus } from '@/types'

const statusOptions: Array<{ value: LeadStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-yellow-500/20 text-yellow-400',
  qualified: 'bg-purple-500/20 text-purple-400',
  proposal: 'bg-orange-500/20 text-orange-400',
  won: 'bg-green-500/20 text-green-400',
  lost: 'bg-red-500/20 text-red-400',
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch('/api/leads')
        if (!res.ok) throw new Error('Failed to fetch leads')
        const data = await res.json()
        setLeads(data)
      } catch {
        setError('Failed to load leads.')
      } finally {
        setLoading(false)
      }
    }
    fetchLeads()
  }, [])

  async function updateStatus(id: string, status: LeadStatus) {
    setUpdating(id)
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Update failed')
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      )
    } catch {
      setError('Failed to update lead status.')
    } finally {
      setUpdating(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading leads...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Leads CRM</h1>
        <p className="text-gray-400">Manage and track all incoming leads.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {leads.length === 0 && !error ? (
        <div className="bg-[#111111] rounded-xl border border-white/10 p-12 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-white font-semibold mb-2">No leads yet</h3>
          <p className="text-gray-400">Leads from the contact form will appear here.</p>
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
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Service</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Budget</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                    <td className="px-6 py-4 text-gray-400">{lead.email}</td>
                    <td className="px-6 py-4 text-gray-400">{lead.company ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-400">{lead.service ?? '—'}</td>
                    <td className="px-6 py-4 text-gray-400">{lead.budget ?? '—'}</td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        disabled={updating === lead.id}
                        onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium border-0 focus:outline-none focus:ring-2 focus:ring-[#f97316] cursor-pointer disabled:opacity-50 capitalize ${statusColors[lead.status] ?? 'bg-gray-500/20 text-gray-400'}`}
                      >
                        {statusOptions.filter(o => o.value !== 'all').map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-[#111111] text-white"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-white/10 text-xs text-gray-500">
            {leads.length} lead{leads.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  )
}
