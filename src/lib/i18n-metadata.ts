import type { Locale } from '@/i18n/routing'
import { routing } from '@/i18n/routing'
import { siteUrl } from '@/lib/site-url'

const publicPaths = [
  '',
  '/services',
  '/work',
  '/process',
  '/pricing',
  '/about',
  '/contact',
  '/book',
  '/blog',
  '/case-studies',
  '/privacy',
  '/terms',
  '/cookies',
  '/privacy-policy',
] as const

export function localizedPath(path: string, locale: Locale): string {
  if (locale === routing.defaultLocale) {
    return path || '/'
  }
  return path ? `/${locale}${path}` : `/${locale}`
}

export function buildAlternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of routing.locales) {
    languages[locale] = `${siteUrl}${localizedPath(path, locale)}`
  }
  languages['x-default'] = `${siteUrl}${localizedPath(path, routing.defaultLocale)}`
  return languages
}

export { publicPaths }
