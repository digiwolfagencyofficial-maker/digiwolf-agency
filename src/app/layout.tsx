import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Digi Wolf Agency',
    template: '%s | Digi Wolf Agency',
  },
  description:
    'Web development, Czech S.R.O. formation, and AI automation for the Mongolian diaspora in Central & Eastern Europe.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digiwolf.agency'),
  openGraph: {
    siteName: 'Digi Wolf Agency',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
