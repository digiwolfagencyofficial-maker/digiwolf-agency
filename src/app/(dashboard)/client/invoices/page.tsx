'use client'

import { useEffect, useState } from 'react'
import type { Invoice } from '@/types'

const statusConfig: Record<string, { label: string; classes: string }> = {
  draft: { label: 'Draft', classes: 'bg-gray-500/20 text-gray-400' },
  sent: { label: 'Sent', classes: 'bg-blue-500/20 text-blue-400' },
  paid: { label: 'Paid', classes: 'bg-green-500/20 text-green-400' },
  overdue: { label: 'Overdue', classes: 'bg-red-500/20 text-red-400' },
  cancelled: { label: 'Cancelled', classes: 'bg-gray-500/20 text-gray-500' },
}

export default function ClientInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await fetch('/api/invoices')
        if (!res.ok) throw new Error('Failed to fetch invoices')
        const data = await res.json()
        setInvoices(data)
      } catch {
        setError('Failed to load invoices.')
      } finally {
        setLoading(false)
      }
    }
    fetchInvoices()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading invoices...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Invoices</h1>
        <p className="text-gray-400">View and download your invoices.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {invoices.length === 0 && !error ? (
        <div className="bg-[#111111] rounded-xl border border-white/10 p-12 text-center">
          <div className="text-4xl mb-4">🧾</div>
          <h3 className="text-white font-semibold mb-2">No invoices yet</h3>
          <p className="text-gray-400">Your invoices will appear here.</p>
        </div>
      ) : (
        <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Invoice #</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Due Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((invoice) => {
                  const config = statusConfig[invoice.status] ?? statusConfig.draft
                  return (
                    <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">{invoice.invoice_number}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white">
                          {invoice.amount.toLocaleString()} {invoice.currency}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.classes}`}>
                          {config.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {invoice.due_date
                          ? new Date(invoice.due_date).toLocaleDateString()
                          : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => window.open(`/api/invoices/${invoice.id}/download`, '_blank')}
                          className="text-[#f97316] hover:text-orange-400 text-sm font-medium transition-colors flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
