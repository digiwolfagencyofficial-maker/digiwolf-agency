'use client'
import dynamic from 'next/dynamic'

const Inner = dynamic(() => import('./PageContent').then(m => ({ default: m.AdminAnalyticsPage })), { ssr: false })

export default function Page() {
  return <Inner />
}
