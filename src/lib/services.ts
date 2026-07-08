/**
 * Single source of truth for sellable service packages (website, s.r.o.,
 * AI automation). Consumed by pricing/services pages, checkout links, and
 * the booking fallback ("consult") flow.
 *
 * NOTE ON LOCALE CODES: the app's real next-intl locales are 'en' | 'cs' | 'mn'
 * (see `src/i18n/routing.ts`) — there is no 'cz' locale in this codebase.
 * `Locale` below intentionally uses 'cs' (not 'cz') so this file's types line
 * up with `src/i18n/routing.ts`. `localeToRef()` still maps the Czech locale
 * to the 'CZ' Stripe `client_reference_id` value.
 */

import { FOUNDING_OFFER_ACTIVE } from '@/config/founding-offer'

export type Locale = 'en' | 'cs' | 'mn'
export type CheckoutMode = 'direct' | 'consult'
export type Cadence = 'once' | 'monthly' | 'yearly'
export type DiscountType = 'percent' | 'fixed' | 'none'

export interface ServicePackage {
  /** Stripe metadata.service_slug */
  id: string
  service: 'website' | 'sro' | 'ai'
  name: Record<Locale, string>
  description: Record<Locale, string>
  /** display-only, MUST match Stripe. Omit for custom-priced packages. */
  priceCzk?: number
  cadence: Cadence
  /** setup+subscription bundles */
  recurringCzk?: number
  recurringCadence?: Cadence
  /** total charged today for bundles */
  dueTodayCzk?: number
  /** optional strikethrough "was" price */
  anchorPriceCzk?: number
  discountType: DiscountType
  checkoutMode: CheckoutMode
  /** required when checkoutMode === 'direct' */
  stripeLink?: string
  featured?: boolean
  /**
   * Set when the Stripe Payment Link itself has "Let customers adjust
   * quantity" enabled (Stripe handles the multiplier + quantity picker on
   * its hosted checkout page — this app does not pass quantity in the URL).
   */
  quantityAdjustable?: boolean
  minQuantity?: number
  maxQuantity?: number
}

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'website-starter',
    service: 'website',
    name: {
      en: 'Website Starter',
      cs: 'Webové stránky Starter',
      mn: 'Вебсайт Стартер',
    },
    description: {
      en: '5-page professional website — mobile responsive, SEO optimized, contact form, 30-day support, full source code included.',
      cs: 'Profesionální web s 5 stránkami — responzivní design pro mobily, SEO optimalizace, kontaktní formulář, 30 dní podpory, zdrojový kód součástí balíčku.',
      mn: '5 хуудастай мэргэжлийн вебсайт — гар утсанд тохирсон дизайн, SEO оновчлол, холбоо барих маягт, 30 хоногийн дэмжлэг, эх код бүрэн багтсан.',
    },
    priceCzk: 19900,
    cadence: 'once',
    discountType: 'percent',
    checkoutMode: 'direct',
    stripeLink: 'https://buy.stripe.com/bJe28sgoi6J43ylbG74c804',
  },
  {
    id: 'website-growth',
    service: 'website',
    featured: true,
    name: {
      en: 'Website Growth',
      cs: 'Webové stránky Growth',
      mn: 'Вебсайт Гроус',
    },
    description: {
      en: 'Full-featured business website — unlimited pages, online booking, payment integration, AI chatbot, CRM, 90-day support, priority delivery.',
      cs: 'Plnohodnotný firemní web — neomezený počet stránek, online rezervace, platební brána, AI chatbot, CRM, 90 dní podpory, přednostní dodání.',
      mn: 'Бүх боломжтой бизнес вебсайт — хуудасны хязгааргүй, онлайн захиалга, төлбөрийн систем, хиймэл оюун ухаант чатбот, CRM систем, 90 хоногийн дэмжлэг, түргэвчилсэн хүргэлт.',
    },
    priceCzk: 49900,
    cadence: 'once',
    discountType: 'percent',
    checkoutMode: 'direct',
    stripeLink: 'https://buy.stripe.com/fZu3cwfkec3o9WJ11t4c805',
  },
  {
    id: 'website-enterprise',
    service: 'website',
    name: {
      en: 'Website Enterprise',
      cs: 'Webové stránky Enterprise',
      mn: 'Вебсайт Энтерпрайз',
    },
    description: {
      en: 'Custom-scoped build for complex requirements — bespoke design, integrations, and dedicated support. Priced per project.',
      cs: 'Zakázkové řešení pro komplexní požadavky — design na míru, integrace a dedikovaná podpora. Cena stanovena individuálně dle projektu.',
      mn: 'Нарийн шаардлагад тохирсон захиалгат шийдэл — өвөрмөц дизайн, интеграцчлал, тусгай дэмжлэг. Үнэ нь тухайн төслөөс хамаарч тогтоно.',
    },
    cadence: 'once',
    discountType: 'none',
    checkoutMode: 'consult',
  },
  {
    id: 'website-care-plan',
    service: 'website',
    name: {
      en: 'Website Care Plan',
      cs: 'Webový servisní plán',
      mn: 'Вебсайтын үйлчилгээний багц',
    },
    description: {
      en: 'Ongoing website care — hosting, security updates, monitoring, and small content changes every month.',
      cs: 'Průběžná péče o web — hosting, bezpečnostní aktualizace, monitoring a drobné úpravy obsahu každý měsíc.',
      mn: 'Вебсайтын тасралтгүй арчилгаа — хостинг, аюулгүй байдлын шинэчлэлт, хяналт, сар бүрийн жижиг контентын өөрчлөлт.',
    },
    priceCzk: 990,
    cadence: 'monthly',
    discountType: 'none',
    checkoutMode: 'direct',
    stripeLink: 'https://buy.stripe.com/8x2eVe0pk3wS2uh9xZ4c806',
  },
  {
    id: 'sro-complete',
    service: 'sro',
    name: {
      en: 'S.R.O. Complete — Czech Company Formation',
      cs: 'S.R.O. Kompletní — založení české firmy',
      mn: 'S.R.O. Иж бүрэн — Чех компани байгуулах',
    },
    description: {
      en: 'Complete Czech s.r.o. setup for foreigners — company registration, trade license, bank account guidance, every step explained in English, Czech, or Mongolian.',
      cs: 'Kompletní založení české s.r.o. pro cizince — registrace firmy, živnostenské oprávnění, asistence s bankovním účtem, každý krok vysvětlen v angličtině, češtině nebo mongolštině.',
      mn: 'Гадаадын иргэдэд зориулсан Чехийн s.r.o. компанийг бүрэн байгуулах үйлчилгээ — компани бүртгэл, худалдааны лиценз, банкны данс нээхэд туслах, алхам тутмыг англи, чех, монгол хэлээр тайлбарлана.',
    },
    priceCzk: 24900,
    cadence: 'once',
    discountType: 'fixed',
    checkoutMode: 'consult',
    stripeLink: 'https://buy.stripe.com/28EfZiega5F04Cp9xZ4c807',
  },
  {
    id: 'registered-address',
    service: 'sro',
    name: {
      en: 'Registered Company Address (Prague)',
      cs: 'Sídlo firmy v Praze',
      mn: 'Компанийн хаяг бүртгэл (Прага)',
    },
    description: {
      en: 'Official registered office address in Prague for your s.r.o. — includes mail handling. Ideal for online businesses.',
      cs: 'Oficiální sídlo firmy v Praze pro vaši s.r.o. — včetně přebírání pošty. Ideální pro online podnikání.',
      mn: 'Таны s.r.o. компанийн Прага хотод бүртгэлтэй албан ёсны хаяг — шуудан хүлээн авах үйлчилгээг багтаасан. Онлайн бизнест тохиромжтой.',
    },
    priceCzk: 4900,
    cadence: 'yearly',
    discountType: 'none',
    checkoutMode: 'direct',
    stripeLink: 'https://buy.stripe.com/bJe6oI3Bw8Rc5Gt9xZ4c80b',
    quantityAdjustable: true,
    minQuantity: 1,
    maxQuantity: 3,
  },
  {
    id: 'ai-auto-reply',
    service: 'ai',
    name: {
      en: 'AI Auto-Reply Setup (Facebook Messenger)',
      cs: 'Nastavení AI automatických odpovědí (Facebook Messenger)',
      mn: 'AI автомат хариулт тохиргоо (Facebook Messenger)',
    },
    description: {
      en: "AI assistant for your Facebook page — instant automatic replies, lead capture, and booking links, 24/7, in your customer's language.",
      cs: 'AI asistent pro vaši Facebook stránku — okamžité automatické odpovědi, sběr kontaktů a rezervační odkazy, 24/7, v jazyce vašeho zákazníka.',
      mn: 'Таны Facebook хуудсанд зориулсан хиймэл оюун ухаант туслах — шуурхай автомат хариулт, харилцагчийн мэдээлэл цуглуулах, захиалгын холбоос, 24/7, харилцагчийн хэлээр.',
    },
    priceCzk: 14900,
    cadence: 'once',
    recurringCzk: 1490,
    recurringCadence: 'monthly',
    dueTodayCzk: 16390,
    discountType: 'percent',
    checkoutMode: 'direct',
    stripeLink: 'https://buy.stripe.com/7sY14o7RM5F07OB25x4c809',
  },
  {
    id: 'ai-automation-pro',
    service: 'ai',
    name: {
      en: 'AI Automation Pro Setup',
      cs: 'AI Automation Pro — nastavení',
      mn: 'AI Automation Pro тохиргоо',
    },
    description: {
      en: 'Complete business automation — lead qualification, CRM updates, follow-ups, and weekly AI reports, built on secure workflows.',
      cs: 'Kompletní automatizace podnikání — kvalifikace poptávek, aktualizace CRM, následné kontaktování a týdenní AI reporty, postavené na zabezpečených workflow.',
      mn: 'Бизнесийн иж бүрэн автоматжуулалт — лид үнэлгээ, CRM шинэчлэлт, дараагийн харилцаа, долоо хоног бүрийн AI тайлан, аюулгүй ажлын урсгал дээр суурилсан.',
    },
    priceCzk: 34900,
    cadence: 'once',
    recurringCzk: 2990,
    recurringCadence: 'monthly',
    dueTodayCzk: 37890,
    discountType: 'percent',
    checkoutMode: 'direct',
    stripeLink: 'https://buy.stripe.com/7sY14o5JEd7s4Cp4dF4c80a',
  },
]

/**
 * Locale -> Stripe `client_reference_id` value.
 * Maps the app's real next-intl locale codes (`src/i18n/routing.ts`):
 * 'en' -> 'EN', 'cs' -> 'CZ' (Czech locale code is 'cs', not 'cz'), 'mn' -> 'MN'.
 */
export function localeToRef(locale: Locale): 'EN' | 'CZ' | 'MN' {
  switch (locale) {
    case 'en':
      return 'EN'
    case 'cs':
      return 'CZ'
    case 'mn':
      return 'MN'
  }
}

export function buildCheckoutUrl(pkg: ServicePackage, locale: Locale): string {
  if (pkg.checkoutMode === 'direct') {
    if (!pkg.stripeLink) {
      throw new Error(`[services] Package "${pkg.id}" has checkoutMode "direct" but no stripeLink`)
    }
    return `${pkg.stripeLink}?client_reference_id=${localeToRef(locale)}`
  }
  return `/book?service=${pkg.id}`
}

export function getById(id: string): ServicePackage | undefined {
  return SERVICE_PACKAGES.find((pkg) => pkg.id === id)
}

export function byService(service: ServicePackage['service']): ServicePackage[] {
  return SERVICE_PACKAGES.filter((pkg) => pkg.service === service)
}

export function formatCzk(n: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
  }).format(n)
}

/**
 * Gates any `anchorPriceCzk` (strikethrough "was" price) behind the shared
 * founding-offer flag, so flipping FOUNDING_OFFER_ACTIVE off site-wide also
 * removes anchor pricing here without editing the catalog.
 */
export function getAnchorPriceCzk(pkg: ServicePackage): number | undefined {
  return FOUNDING_OFFER_ACTIVE ? pkg.anchorPriceCzk : undefined
}

function validateCatalog(packages: ServicePackage[]): void {
  const seenIds = new Set<string>()
  for (const pkg of packages) {
    if (seenIds.has(pkg.id)) {
      throw new Error(`[services] Duplicate service package id: "${pkg.id}"`)
    }
    seenIds.add(pkg.id)

    if (pkg.checkoutMode === 'direct' && !pkg.stripeLink) {
      throw new Error(`[services] Package "${pkg.id}" has checkoutMode "direct" but no stripeLink`)
    }

    if (
      pkg.quantityAdjustable &&
      pkg.minQuantity != null &&
      pkg.maxQuantity != null &&
      pkg.minQuantity > pkg.maxQuantity
    ) {
      throw new Error(`[services] Package "${pkg.id}" has minQuantity greater than maxQuantity`)
    }
  }
}

validateCatalog(SERVICE_PACKAGES)
