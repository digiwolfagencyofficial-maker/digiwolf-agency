import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://digiwolf-agency.vercel.app'),
  title: {
    default: 'Digi Wolf Agency — Web Development, AI Automation & Czech S.R.O. Formation',
    template: '%s | Digi Wolf Agency',
  },
  description: 'Prague-based digital agency specialising in premium websites, web applications, AI automation, and Czech S.R.O. company formation. Serving clients across Czech Republic, Slovakia, and Mongolia.',
  keywords: ['web agency Prague', 'Czech SRO formation', 'AI automation', 'web development Czech Republic', 'Next.js agency', 'digital agency Prague', 'Mongolian entrepreneur Prague'],
  authors: [{ name: 'Digi Wolf Agency', url: 'https://digiwolf-agency.vercel.app' }],
  creator: 'Digi Wolf Agency',
  icons: {
    icon: '/digiwolf-icon.png',
    apple: '/digiwolf-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://digiwolf-agency.vercel.app',
    siteName: 'Digi Wolf Agency',
    title: 'Digi Wolf Agency — Web Development, AI Automation & Czech S.R.O. Formation',
    description: 'Prague-based digital agency delivering world-class websites, AI automation, and Czech company formation.',
    images: [
      {
        url: '/digiwolf-logo.png',
        width: 1200,
        height: 630,
        alt: 'Digi Wolf Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digi Wolf Agency — Web Development & AI Automation',
    description: 'Premium digital agency based in Prague. Websites, AI automation, Czech S.R.O. formation.',
    images: ['/digiwolf-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
