import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { buildPageMetadata } from '@/lib/page-metadata'
import type { Locale } from '@/i18n/routing'
import CaseStudiesClient from './CaseStudiesClient'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata(locale as Locale, 'caseStudies', '/case-studies')
}

export default async function CaseStudiesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <CaseStudiesClient />
}
