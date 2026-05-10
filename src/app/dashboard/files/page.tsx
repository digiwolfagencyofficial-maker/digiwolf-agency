'use client'
import dynamic from 'next/dynamic'

const Inner = dynamic(() => import('./PageContent').then(m => ({ default: m.FilesPageInner })), { ssr: false })

export default function Page() {
  return <Inner />
}
