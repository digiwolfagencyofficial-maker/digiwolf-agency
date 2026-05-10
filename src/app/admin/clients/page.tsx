'use client'
import dynamic from 'next/dynamic'

const ClientsPageInner = dynamic(() => import('./ClientsContent').then(m => ({ default: m.ClientsPageInner })), { ssr: false })

export default function Page() {
  return <ClientsPageInner />
}
