import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildAlternateLanguages, localizedPath } from '@/lib/i18n-metadata'
import type { Locale } from '@/i18n/routing'
import { openGraphLocale } from '@/i18n/routing'
import { siteUrl } from '@/lib/site-url'

type PageMetaKey =
  | 'home'
  | 'services'
  | 'pricing'
  | 'contact'
  | 'book'
  | 'about'
  | 'process'
  | 'work'
  | 'blog'
  | 'caseStudies'
  | 'privacy'
  | 'terms'
  | 'cookies'

export async function buildPageMetadata(
  locale: Locale,
  page: PageMetaKey,
  path: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.pages' })

  const title = t(`${page}.title`)
  const description = t(`${page}.description`)
  const canonical = `${siteUrl}${localizedPath(path, locale)}`

  const openGraphTitle = ['services', 'pricing', 'contact', 'book', 'about', 'process', 'work'].includes(page)
    ? t(`${page}.openGraphTitle`)
    : title
  const openGraphDescription = ['services', 'pricing', 'contact', 'book', 'about', 'process', 'work'].includes(page)
    ? t(`${page}.openGraphDescription`)
    : description

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: buildAlternateLanguages(path),
    },
    openGraph: {
      type: 'website',
      locale: openGraphLocale[locale],
      url: canonical,
      siteName: 'Digi Wolf Agency',
      title: openGraphTitle,
      description: openGraphDescription,
      images: [
        {
          url: '/digiwolf-lockup.png',
          width: 971,
          height: 194,
          alt: 'Digi Wolf Agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraphTitle,
      description: openGraphDescription,
      images: ['/digiwolf-lockup.png'],
    },
  }
}
