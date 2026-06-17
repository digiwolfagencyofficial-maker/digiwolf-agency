import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthHashRedirect from '@/components/auth/AuthHashRedirect'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digiwolf.agency'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        style={{ background: '#0A0A0A', color: '#F5F5F5', margin: 0, padding: 0, overflowX: 'hidden' }}
      >
        <AuthHashRedirect />
        {children}
      </body>
    </html>
  )
}
