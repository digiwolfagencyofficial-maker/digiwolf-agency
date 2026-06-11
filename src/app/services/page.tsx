import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
import { siteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Services — Web Development, AI Automation & S.R.O. Formation',
  description: 'Digi Wolf Agency offers premium web development (from 45,000 CZK), Czech S.R.O. formation (from 15,000 CZK), AI automation, SEO, and brand identity services in Prague.',
  openGraph: {
    title: 'Services | Digi Wolf Agency',
    description: 'Premium digital services: websites, AI automation, Czech company formation. Based in Prague.',
    url: `${siteUrl}/services`,
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
