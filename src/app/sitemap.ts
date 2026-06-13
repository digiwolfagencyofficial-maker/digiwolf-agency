import type { MetadataRoute } from 'next'
import { localizedPath, publicPaths } from '@/lib/i18n-metadata'
import { locales, type Locale } from '@/i18n/routing'
import { siteUrl } from '@/lib/site-url'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  for (const path of publicPaths) {
    const languages: Record<string, string> = {}
    for (const locale of locales) {
      languages[locale] = `${siteUrl}${localizedPath(path, locale)}`
    }
    languages['x-default'] = `${siteUrl}${localizedPath(path, 'en')}`

    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}${localizedPath(path, locale)}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : path.includes('privacy') || path.includes('terms') || path.includes('cookies') ? 'yearly' : 'monthly',
        priority: path === '' ? 1 : path === '/contact' || path === '/book' ? 0.9 : path.includes('privacy') ? 0.3 : 0.8,
        alternates: { languages },
      })
    }
  }

  return entries
}
