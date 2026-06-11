import type { Metadata } from 'next'
import ProcessPageClient from './ProcessPageClient'
import { siteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Our Process — How We Work | Digi Wolf Agency',
  description: 'Discover how Digi Wolf Agency delivers world-class websites and digital solutions in days, not months. Our 5-step proven process from discovery to launch.',
  openGraph: {
    title: 'Our Process — How We Work | Digi Wolf Agency',
    description: 'From discovery call to live launch — our proven 5-step process delivers premium results fast.',
    url: `${siteUrl}/process`,
  },
}

export default function ProcessPage() {
  return <ProcessPageClient />
}
