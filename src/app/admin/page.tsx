import dynamic from 'next/dynamic'
import { requireAuth } from '@/lib/auth'

const Inner = dynamic(() => import('./OverviewContent').then(m => ({ default: m.AdminOverviewPage })), { ssr: false })

export default async function Page() {
  await requireAuth()
  return <Inner />
}
