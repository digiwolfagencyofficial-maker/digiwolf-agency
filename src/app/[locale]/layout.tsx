import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { Inter } from 'next/font/google'
import CookieBanner from '@/components/CookieBanner'
import ChatWidget from '@/components/ChatWidget'
import { routing, htmlLang } from '@/i18n/routing'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={htmlLang[locale as keyof typeof htmlLang] ?? locale}>
      <body
        className={inter.className}
        style={{ background: '#0A0A0A', color: '#F5F5F5', margin: 0, padding: 0, overflowX: 'hidden' }}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <ChatWidget />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
