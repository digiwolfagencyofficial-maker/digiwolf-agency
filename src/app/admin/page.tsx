'use client'
import dynamic from 'next/dynamic'

const Inner = dynamic(() => import('./OverviewContent').then(m => ({ default: m.AdminOverviewPage })), { ssr: false })

export default function Page() {
  return <Inner />
}
