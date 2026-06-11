import type { Metadata } from 'next'
import WorkPageClient from './WorkPageClient'
import { siteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Case Studies — Our Work | Digi Wolf Agency',
  description: 'Real results for real clients. See how Digi Wolf Agency helped TechVentures Prague achieve +340% conversions and MN Export Hub generate €180K revenue in 90 days.',
  openGraph: {
    title: 'Case Studies — Our Work | Digi Wolf Agency',
    description: 'Real results from Digi Wolf Agency — +340% conversions, €180K revenue, and more.',
    url: `${siteUrl}/work`,
  },
}

export default function WorkPage() {
  return <WorkPageClient />
}
