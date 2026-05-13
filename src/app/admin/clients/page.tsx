import dynamic from 'next/dynamic'
import { requireAuth } from '@/lib/auth'

const ClientsPageInner = dynamic(() => import('./ClientsContent').then(m => ({ default: m.ClientsPageInner })), { ssr: false })

export default async function Page() {
  await requireAuth()
  return <ClientsPageInner />
}
