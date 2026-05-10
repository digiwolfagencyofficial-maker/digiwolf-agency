'use client'

import { useEffect, useState } from 'react'
import type { Invoice, Profile } from '@/types'

type InvoiceWithClient = Invoice & { client?: Pick<Profile, 'full_name' | 'email'> }

const statusConfig: Record<string, { label: string; classes: string }> = {
  draft: { label: 'Draft', classes: 'bg-gray-500/20 text-gray-400' },
  sent: { label: 'Sent', classes: 'bg-blue-500/20 text-blue-400' },
  paid: { label: 'Paid', classes: 'bg-green-500/20 text-green-400' },
  overdue: { label: 'Overdue', classes: 'bg-red-500/20 text-red-400' },
  cancelled: { label: 'Cancelled', classes: 'bg-gray-500/20 text-gray-500' },
}

function CreateInvoiceModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-bold">Create Invoice</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div className="p-6 bg-white/5 rounded-xl text-center">
            <div className="text-4xl mb-3">🧾</div>
            <p className="text-gray-400 text-sm">Invoice creation will be available in the next update.</p>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-lg transition-colors text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceWithClient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

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
      {showModal && <CreateInvoiceModal onClose={() => setShowModal(false)} />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Invoices</h1>
          <p className="text-gray-400">Manage all client invoices.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#f97316] hover:bg-orange-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Invoice
        </button>
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
          <p className="text-gray-400">Create your first invoice to get started.</p>
        </div>
      ) : (
        <div className="bg-[#111111] rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Invoice #</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Client</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((invoice) => {
                  const config = statusConfig[invoice.status] ?? statusConfig.draft
                  return (
                    <tr key={invoice.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{invoice.invoice_number}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {invoice.client?.full_name ?? invoice.client?.email ?? '—'}
                      </td>
                      <td className="px-6 py-4 text-white">
                        {invoice.amount.toLocaleString()} {invoice.currency}
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
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-white/10 text-xs text-gray-500">
            {invoices.length} invoice{invoices.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  )
}
