import dynamic from 'next/dynamic'
import { requireAuth } from '@/lib/auth'

const Inner = dynamic(() => import('./PageContent').then(m => ({ default: m.AdminSettingsPage })), { ssr: false })

export default async function Page() {
  await requireAuth()
  return <Inner />
}
