import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'
import { buildPageMetadata } from '@/lib/page-metadata'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata(locale as Locale, 'services', '/services')
}

export default function ServicesPage() {
  return <ServicesClient />
}
