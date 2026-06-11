import type { Metadata } from 'next'
import PricingClient from './PricingClient'
import { siteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Pricing — Transparent Packages & Rates',
  description: 'Starter website from 15,000 CZK, Growth from 45,000 CZK, Enterprise custom. Fixed pricing, 50/50 payment plans, no hidden fees.',
  openGraph: {
    title: 'Pricing | Digi Wolf Agency — Transparent Rates',
    description: 'Clear, fixed pricing for websites, web apps, AI automation, and Czech S.R.O. formation.',
    url: `${siteUrl}/pricing`,
  },
}

export default function PricingPage() {
  return <PricingClient />
}
