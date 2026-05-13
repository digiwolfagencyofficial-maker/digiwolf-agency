'use client'
import dynamic from 'next/dynamic'

const Inner = dynamic(() => import('./PageContent'), { ssr: false })

export default function Page() {
  return <Inner />
}
