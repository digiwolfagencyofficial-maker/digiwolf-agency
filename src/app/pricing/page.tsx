import type { Metadata } from 'next'
import PricingClient from './PricingClient'

export const metadata: Metadata = {
  title: 'Pricing — Transparent Packages & Rates',
  description: 'Digi Wolf Agency pricing: Agency Websites from 15,000 CZK, Web Apps from 40,000 CZK, AI Automation from 20,000 CZK, Czech S.R.O. formation from 25,000 CZK. No hidden fees.',
  openGraph: {
    title: 'Pricing | Digi Wolf Agency — Transparent Rates',
    description: 'Clear, fixed pricing for websites, web apps, AI automation, and Czech S.R.O. formation.',
    url: 'https://digiwolf-agency.vercel.app/pricing',
  },
}

export default function PricingPage() {
  return <PricingClient />
}
