import type { Metadata } from 'next'
import AboutClient from './AboutClient'
import { siteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'About — Our Story & Team',
  description: 'Digi Wolf Agency was founded by Mongolian entrepreneur Uuganbayar Ganbaatar in Prague. We help businesses across Czech Republic, Slovakia, and Mongolia dominate the digital age.',
  openGraph: {
    title: 'About Digi Wolf Agency — Prague-Based Digital Agency',
    description: 'From Ulaanbaatar to Prague — building bridges between Mongolian entrepreneurs and the EU market.',
    url: `${siteUrl}/about`,
  },
}

export default function AboutPage() {
  return <AboutClient />
}
