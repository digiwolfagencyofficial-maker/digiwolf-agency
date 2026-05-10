import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Digi Wolf Agency — From Idea to Digital Reality',
  description: 'Prague-based digital agency specialising in websites, web apps, Czech S.R.O. formation, and AI automation.',
  keywords: 'web agency Prague, Czech SRO formation, AI automation, web development',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ background: '#0A0A0A', color: '#F5F5F5', margin: 0, padding: 0, overflowX: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
