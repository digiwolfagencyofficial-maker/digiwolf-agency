'use client'

import { useEffect, useState } from 'react'
import type { Lead } from '@/types'

interface AdminStats {
  totalClients: number
  activeProjects: number
  monthlyRevenue: number
  newLeads: number
}

const leadStatusColors: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-400',
  contacted: 'bg-yellow-500/20 text-yellow-400',
  qualified: 'bg-purple-500/20 text-purple-400',
  proposal: 'bg-orange-500/20 text-orange-400',
  won: 'bg-green-500/20 text-green-400',
  lost: 'bg-red-500/20 text-red-400',
}

function StatCard({ label, value, icon, sub }: { label: string; value: string | number; icon: string; sub?: string }) {
  return (
    <div className="bg-[#111111] rounded-xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[#f97316]/10 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
      {sub && <div className="text-gray-600 text-xs mt-1">{sub}</div>}
    </div>
  )
}

export default function AdminOverviewPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<AdminStats>({
    totalClients: 0,
    activeProjects: 0,
    monthlyRevenue: 0,
    newLeads: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, projectsRes, invoicesRes, clientsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/projects'),
          fetch('/api/invoices'),
          fetch('/api/clients'),
        ])

        const leadsData: Lead[] = leadsRes.ok ? await leadsRes.json() : []
        const projectsData: { status: string }[] = projectsRes.ok ? await projectsRes.json() : []
        const invoicesData: { status: string; amount: number; currency: string; paid_date: string | null }[] = invoicesRes.ok ? await invoicesRes.json() : []
        const clientsData: unknown[] = clientsRes.ok ? await clientsRes.json() : []

        const now = new Date()
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const monthlyRevenue = invoicesData
          .filter((i) => i.status === 'paid' && i.paid_date && new Date(i.paid_date) >= monthStart)
          .reduce((sum, i) => sum + i.amount, 0)

        const activeProjects = projectsData.filter(
          (p) => !['launched', 'paused'].includes(p.status)
        ).length

        const newLeads = leadsData.filter((l) => l.status === 'new').length

        setLeads(leadsData.slice(0, 8))
        setStats({
          totalClients: clientsData.length,
          activeProjects,
          monthlyRevenue,
          newLeads,
        })
      } catch {
        setError('Failed to load admin data.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading admin overview...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Admin Overview</h1>
        <p className="text-gray-400">Agency performance at a glance.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Clients" value={stats.totalClients} icon="👥" />
        <StatCard label="Active Projects" value={stats.activeProjects} icon="🗂️" />
        <StatCard
          label="Monthly Revenue"
          value={`${stats.monthlyRevenue.toLocaleString()} CZK`}
          icon="💰"
          sub="Current month"
        />
        <StatCard label="New Leads" value={stats.newLeads} icon="📋" sub="Uncontacted" />
      </div>

      {/* Recent Leads */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Leads</h2>
        {leads.length === 0 ? (
          <div className="bg-[#111111] rounded-xl border border-white/10 p-8 text-center text-gray-400">
            No leads yet.
          </div>
        ) : (
          <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Name</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Email</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Service</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-gray-400">{lead.email}</td>
                      <td className="px-6 py-4 text-gray-400">{lead.service ?? '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${leadStatusColors[lead.status] ?? 'bg-gray-500/20 text-gray-400'}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
