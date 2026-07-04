/**
 * Founding Offer Configuration
 *
 * Set FOUNDING_OFFER_ACTIVE = false to instantly remove every banner,
 * badge, and promo note site-wide.
 *
 * Update FOUNDING_SPOTS_LEFT as spots are claimed.
 */

export const FOUNDING_OFFER_ACTIVE = true

export const FOUNDING_SPOTS_LEFT = 10

/** Half-price amounts for founding clients */
export const FOUNDING_PRICES = {
  /** Website Starter: normally 19,900 CZK → 50% off = 9,950 CZK */
  starter: { normal: '19,900', discounted: '9,950' },
  /** Website Growth: normally 49,900 CZK → 50% off = 24,950 CZK */
  growth: { normal: '49,900', discounted: '24,950' },
  /** AI Auto-Reply: normally 14,900 CZK → 50% off = 7,450 CZK */
  aiAutoReply: { normal: '14,900', discounted: '7,450' },
  /** AI Automation Pro: normally 34,900 CZK → 50% off = 17,450 CZK */
  aiAutomationPro: { normal: '34,900', discounted: '17,450' },
  /** S.R.O. Complete: 5,000 CZK off with code FOUNDINGSRO */
  sroComplete: { normal: '24,900', discounted: '19,900', code: 'FOUNDINGSRO' },
} as const
