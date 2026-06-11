import type { Metadata } from 'next'
import BookClient from './BookClient'
import { siteUrl } from '@/lib/site-url'

export const metadata: Metadata = {
  title: 'Book a Free Discovery Call',
  description:
    'Schedule a free 30-minute discovery call with Digi Wolf Agency. No sales pitch — honest advice on websites, Czech S.R.O. formation, and AI automation. We respond within 4 business hours.',
  openGraph: {
    title: 'Book a Free 30-Min Discovery Call — Digi Wolf Agency',
    description:
      'Pick a time that works for you. Free consultation, no commitment. Limited spots — we take 3 new clients per month.',
    url: `${siteUrl}/book`,
  },
}

export default function BookPage() {
  return <BookClient />
}
