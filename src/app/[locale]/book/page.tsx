import type { Metadata } from 'next'
import BookClient from './BookClient'
import { buildPageMetadata } from '@/lib/page-metadata'
import type { Locale } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata(locale as Locale, 'book', '/book')
}

export default function BookPage() {
  return <BookClient />
}
