import type { Metadata } from 'next'
import ContactClient from './ContactClient'
import { buildPageMetadata } from '@/lib/page-metadata'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata(locale as Locale, 'contact', '/contact')
}

export default function ContactPage() {
  return <ContactClient />
}
