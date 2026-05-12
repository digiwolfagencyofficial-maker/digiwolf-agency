'use client'
import dynamic from 'next/dynamic'

const Inner = dynamic(() => import('./SettingsContent').then(m => ({ default: m.DashboardSettingsPage })), { ssr: false })

export default function Page() {
  return <Inner />
}
