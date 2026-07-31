'use client'



import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

import { Check, Lock, Clock, Infinity, CreditCard, Minus, Building2, Bot } from 'lucide-react'

import Navbar from '@/components/Navbar'

import Footer from '@/components/Footer'

import FaqAccordion from '@/components/ui/FaqAccordion'

import {

  FeaturedPackageBadge,

  PackageCtaButton,

  PackageFoundingBadge,

  PackagePriceBlock,

  packagePrimaryPriceText,

} from '@/components/package/PackageUi'

import { FOUNDING_OFFER_ACTIVE } from '@/config/founding-offer'

import {

  getById,

  type ServicePackage,

  type Locale as ServiceLocale,

} from '@/lib/services'



type CompareCell = boolean | string

type PackageUiT = (key: string, values?: Record<string, string | number>) => string



const TIER_PACKAGE_ID: Record<string, string> = {

  starter: 'website-starter',

  growth: 'website-growth',

  enterprise: 'website-enterprise',

}



const COMPANY_FORMATION_PACKAGE_ID: Record<string, string> = {

  sroComplete: 'sro-complete',

  registeredAddress: 'registered-address',

}



const AI_AUTOMATION_PACKAGE_ID: Record<string, string> = {

  aiAutoReply: 'ai-auto-reply',

  aiAutomationPro: 'ai-automation-pro',

}



type PricingTier = {

  id: string

  features: { id: string; label: string }[]

  featuredBadge?: string

}



type ComparisonRow = {

  id: string

  label: string

  starter: CompareCell

  growth: CompareCell

  enterprise: CompareCell

}



type FaqItem = { id: string; q: string; a: string }

type TrustBadge = { id: string; text: string }

type CtaItem = { id: string; label: string }



type CompanyFormationCard = {

  id: string

  features: { id: string; label: string }[]

}



type AiCard = {

  id: string

  subtitle: string

  features: { id: string; label: string }[]

}



type CompanyFormationSection = {

  badge: string

  title: string

  subtitle: string

  cards: CompanyFormationCard[]

}



type AiAutomationSection = {

  badge: string

  title: string

  subtitle: string

  careNote: string

  cards: AiCard[]

}



const TRUST_BADGE_ICONS: Record<string, React.ReactNode> = {

  fixedPricing: <Lock size={14} />,

  onTime: <Clock size={14} />,

  unlimitedRevisions: <Infinity size={14} />,

  paymentPlan: <CreditCard size={14} />,

}



const CTA_HREFS: Record<string, string> = {

  startProject: '/contact',

  bookCall: '/book',

}



function localizedPackageText(pkg: ServicePackage, locale: ServiceLocale, field: 'name' | 'description') {

  return pkg[field][locale]

}



function CompareValue({ value, featured }: { value: CompareCell; featured?: boolean }) {

  if (value === true) {

    return (

      <span style={{ display: 'flex', justifyContent: 'center' }}>

        <Check size={18} color={featured ? '#3d74ff' : '#8892b0'} />

      </span>

    )

  }

  if (value === false) {

    return (

      <span style={{ display: 'flex', justifyContent: 'center', color: '#4a5568' }}>

        <Minus size={16} />

      </span>

    )

  }

  return (

    <span style={{ fontSize: 13, color: featured ? '#f0f4ff' : '#c8d3f0', fontWeight: featured ? 600 : 400 }}>

      {value}

    </span>

  )

}



export default function PricingPage() {

  const locale = useLocale() as ServiceLocale

  const t = useTranslations('pricing')

  const packageUiT = useTranslations('packageUi') as unknown as PackageUiT



  const tiers = t.raw('tiers') as PricingTier[]

  const comparisonRows = t.raw('comparison.rows') as ComparisonRow[]

  const paymentFaqs = t.raw('paymentsFaq.items') as FaqItem[]

  const trustBadges = t.raw('trustBadges') as TrustBadge[]

  const bottomCtas = t.raw('bottomCta.ctas') as CtaItem[]

  const companyFormation = t.raw('companyFormation') as CompanyFormationSection

  const aiAutomation = t.raw('aiAutomation') as AiAutomationSection



  const comparisonTitle = t('comparison.title')

  const comparisonTitleParts = comparisonTitle.split(' ')

  const bottomTitleParts = t('bottomCta.title').split(' ')



  return (

    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      <Navbar />



      <section style={{

        position: 'relative', padding: `${FOUNDING_OFFER_ACTIVE ? 156 : 120}px 24px 80px`,

        textAlign: 'center', overflow: 'hidden',

      }}>

        <div style={{

          position: 'absolute', top: '40%', left: '50%',

          transform: 'translate(-50%, -50%)',

          width: 700, height: 400,

          background: 'radial-gradient(ellipse, rgba(0,71,255,0.14) 0%, transparent 70%)',

          pointerEvents: 'none',

        }} />

        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto' }}>

          <span className="badge" style={{ marginBottom: 24, display: 'inline-flex' }}>{t('hero.badge')}</span>

          <h1 style={{

            fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 800,

            lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.03em',

          }}>

            {t('hero.titleLine1')}<br />

            <span className="gradient-text">{t('hero.titleLine2')}</span>

          </h1>

          <p style={{

            fontSize: 18, color: '#8892b0', lineHeight: 1.75,

            maxWidth: 520, margin: '0 auto',

          }}>

            {t('hero.description')}

          </p>

        </div>

      </section>



      <section style={{ padding: '0 24px 100px', maxWidth: 1280, margin: '0 auto' }}>

        <div className="pricing-grid" style={{

          display: 'grid',

          gridTemplateColumns: 'repeat(3, 1fr)',

          gap: 20,

        }}>

          {tiers.map((plan) => {

            const pkg = getById(TIER_PACKAGE_ID[plan.id])

            if (!pkg) return null

            const featured = pkg.featured ?? false



            return (

              <div

                key={plan.id}

                style={{

                  background: featured

                    ? 'linear-gradient(135deg, rgba(0,71,255,0.15), rgba(61,116,255,0.06))'

                    : 'rgba(255,255,255,0.03)',

                  border: featured ? '1px solid rgba(0,71,255,0.4)' : '1px solid rgba(255,255,255,0.07)',

                  borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden',

                  boxShadow: featured ? '0 0 60px rgba(0,71,255,0.15)' : 'none',

                  transition: 'all 0.3s',

                  transform: featured ? 'scale(1.03)' : 'none',

                }}

                onMouseEnter={(e) => {

                  const el = e.currentTarget

                  el.style.transform = featured ? 'scale(1.05) translateY(-4px)' : 'translateY(-4px)'

                }}

                onMouseLeave={(e) => {

                  const el = e.currentTarget

                  el.style.transform = featured ? 'scale(1.03)' : 'none'

                }}

              >

                {featured && (

                  <FeaturedPackageBadge label={plan.featuredBadge ?? packageUiT('featuredBadge')} />

                )}

                <div style={{

                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,

                  background: featured

                    ? 'linear-gradient(90deg, transparent, #0047FF, transparent)'

                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',

                }} />



                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#f0f4ff', marginBottom: 8 }}>

                  {localizedPackageText(pkg, locale, 'name')}

                </h2>

                <div style={{ marginBottom: 8 }}>

                  <PackagePriceBlock pkg={pkg} />

                </div>

                <PackageFoundingBadge pkg={pkg} />

                <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>

                  {localizedPackageText(pkg, locale, 'description')}

                </p>



                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>

                  {plan.features.map((f) => (

                    <div key={f.id} style={{

                      display: 'flex', alignItems: 'center', gap: 10,

                      color: f.id === 'carePlan' || f.id === 'f7' || f.id === 'f8'

                        ? '#8892b0'

                        : '#c8d3f0',

                      fontSize: 14,

                      fontStyle: f.id === 'carePlan' || f.id === 'f7' || f.id === 'f8' ? 'italic' : 'normal',

                    }}>

                      <Check

                        size={14}

                        color={

                          f.id === 'carePlan' || f.id === 'f7' || f.id === 'f8'

                            ? '#4a5568'

                            : featured ? '#3d74ff' : '#8892b0'

                        }

                      />

                      {f.label}

                    </div>

                  ))}

                </div>



                <PackageCtaButton pkg={pkg} featured={featured} />

              </div>

            )

          })}

        </div>



        <div style={{

          display: 'flex', justifyContent: 'center', gap: 40,

          flexWrap: 'wrap', marginTop: 56,

        }}>

          {trustBadges.map((badge) => (

            <div key={badge.id} style={{

              display: 'flex', alignItems: 'center', gap: 8,

              color: '#8892b0', fontSize: 14,

            }}>

              <span style={{ display: 'flex' }}>{TRUST_BADGE_ICONS[badge.id]}</span>

              <span>{badge.text}</span>

            </div>

          ))}

        </div>

      </section>



      <section style={{

        padding: '100px 24px',

        background: 'rgba(255,255,255,0.01)',

        borderTop: '1px solid rgba(255,255,255,0.05)',

        borderBottom: '1px solid rgba(255,255,255,0.05)',

      }}>

        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>

            <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('comparison.badge')}</span>

            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.03em' }}>

              {comparisonTitleParts.slice(0, -1).join(' ')}{' '}

              <span className="gradient-text">{comparisonTitleParts[comparisonTitleParts.length - 1]}</span>

            </h2>

            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>

              {t('comparison.subtitle')}

            </p>

          </div>



          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>

            <table style={{

              width: '100%', minWidth: 640, borderCollapse: 'collapse',

              fontSize: 14,

            }}>

              <thead>

                <tr>

                  <th style={{

                    textAlign: 'left', padding: '16px 20px',

                    color: '#8892b0', fontWeight: 600, fontSize: 13,

                    borderBottom: '1px solid rgba(255,255,255,0.08)',

                  }}>

                    {t('comparison.featureLabel')}

                  </th>

                  {tiers.map((tier) => {

                    const pkg = getById(TIER_PACKAGE_ID[tier.id])

                    if (!pkg) return null

                    return (

                      <th

                        key={tier.id}

                        style={{

                          textAlign: 'center', padding: '16px 20px',

                          borderBottom: '1px solid rgba(255,255,255,0.08)',

                          background: pkg.featured ? 'rgba(0,71,255,0.08)' : 'transparent',

                          borderRadius: pkg.featured ? '12px 12px 0 0' : 0,

                        }}

                      >

                        <div style={{ fontWeight: 800, color: '#f0f4ff', fontSize: 15 }}>

                          {localizedPackageText(pkg, locale, 'name')}

                        </div>

                        <div style={{ color: pkg.featured ? '#3d74ff' : '#8892b0', fontSize: 13, marginTop: 4 }}>

                          {packagePrimaryPriceText(pkg, packageUiT)}

                        </div>

                      </th>

                    )

                  })}

                </tr>

              </thead>

              <tbody>

                {comparisonRows.map((row, i) => (

                  <tr key={row.id} style={{

                    background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',

                  }}>

                    <td style={{

                      padding: '14px 20px', color: '#c8d3f0',

                      borderBottom: '1px solid rgba(255,255,255,0.05)',

                    }}>

                      {row.label}

                    </td>

                    <td style={{

                      padding: '14px 20px', textAlign: 'center',

                      borderBottom: '1px solid rgba(255,255,255,0.05)',

                    }}>

                      <CompareValue value={row.starter} />

                    </td>

                    <td style={{

                      padding: '14px 20px', textAlign: 'center',

                      borderBottom: '1px solid rgba(255,255,255,0.05)',

                      background: 'rgba(0,71,255,0.04)',

                    }}>

                      <CompareValue value={row.growth} featured />

                    </td>

                    <td style={{

                      padding: '14px 20px', textAlign: 'center',

                      borderBottom: '1px solid rgba(255,255,255,0.05)',

                    }}>

                      <CompareValue value={row.enterprise} />

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>



          <div style={{ textAlign: 'center', marginTop: 40 }}>

            <Link

              href="/book"

              style={{

                display: 'inline-block',

                background: '#0047FF', color: '#fff',

                padding: '14px 36px', borderRadius: 12,

                fontWeight: 700, fontSize: 16, textDecoration: 'none',

                boxShadow: '0 8px 30px rgba(0,71,255,0.4)',

              }}

            >

              {t('comparison.cta')}

            </Link>

          </div>

        </div>

      </section>



      <section style={{ padding: '100px 24px', maxWidth: 1280, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>

          <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>

            <Building2 size={13} style={{ marginRight: 6 }} />

            {companyFormation.badge}

          </span>

          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.03em' }}>

            {companyFormation.title}

          </h2>

          <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>

            {companyFormation.subtitle}

          </p>

        </div>



        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, maxWidth: 880, margin: '0 auto' }}>

          {companyFormation.cards.map((card) => {

            const pkg = getById(COMPANY_FORMATION_PACKAGE_ID[card.id])

            if (!pkg) return null

            const featured = pkg.featured ?? card.id === 'sroComplete'



            return (

              <div

                key={card.id}

                style={{

                  background: featured ? 'linear-gradient(135deg, rgba(0,71,255,0.12), rgba(61,116,255,0.04))' : 'rgba(255,255,255,0.03)',

                  border: featured ? '1px solid rgba(0,71,255,0.35)' : '1px solid rgba(255,255,255,0.07)',

                  borderRadius: 24, padding: 36, position: 'relative', overflow: 'hidden',

                }}

              >

                <div style={{

                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,

                  background: featured

                    ? 'linear-gradient(90deg, transparent, #0047FF, transparent)'

                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',

                }} />



                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f0f4ff', marginBottom: 8 }}>

                  {localizedPackageText(pkg, locale, 'name')}

                </h3>

                <div style={{ marginBottom: 8 }}>

                  <PackagePriceBlock pkg={pkg} size="md" />

                </div>

                <PackageFoundingBadge pkg={pkg} />

                <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>

                  {localizedPackageText(pkg, locale, 'description')}

                </p>



                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>

                  {card.features.map((f) => (

                    <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#c8d3f0', fontSize: 14 }}>

                      <Check size={13} color={featured ? '#3d74ff' : '#8892b0'} />

                      {f.label}

                    </div>

                  ))}

                </div>



                <PackageCtaButton pkg={pkg} featured={featured} />

              </div>

            )

          })}

        </div>

      </section>



      <section style={{

        padding: '100px 24px',

        background: 'rgba(255,255,255,0.01)',

        borderTop: '1px solid rgba(255,255,255,0.05)',

        borderBottom: '1px solid rgba(255,255,255,0.05)',

      }}>

        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <div style={{ textAlign: 'center', marginBottom: 56 }}>

            <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>

              <Bot size={13} style={{ marginRight: 6 }} />

              {aiAutomation.badge}

            </span>

            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 14, letterSpacing: '-0.03em' }}>

              {aiAutomation.title}

            </h2>

            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>

              {aiAutomation.subtitle}

            </p>

          </div>



          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>

            {aiAutomation.cards.map((card) => {

              const pkg = getById(AI_AUTOMATION_PACKAGE_ID[card.id])

              if (!pkg) return null

              const featured = pkg.featured ?? card.id === 'aiAutomationPro'



              return (

                <div

                  key={card.id}

                  style={{

                    background: featured

                      ? 'linear-gradient(135deg, rgba(0,71,255,0.12), rgba(61,116,255,0.04))'

                      : 'rgba(255,255,255,0.03)',

                    border: featured ? '1px solid rgba(0,71,255,0.35)' : '1px solid rgba(255,255,255,0.07)',

                    borderRadius: 24, padding: 36, position: 'relative', overflow: 'hidden',

                  }}

                >

                  <div style={{

                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,

                    background: featured

                      ? 'linear-gradient(90deg, transparent, #0047FF, transparent)'

                      : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',

                  }} />



                  <div style={{ marginBottom: 4 }}>

                    <h3 style={{ fontSize: 20, fontWeight: 800, color: '#f0f4ff', marginBottom: 2 }}>

                      {localizedPackageText(pkg, locale, 'name')}

                    </h3>

                    <span style={{ fontSize: 12, color: '#8892b0', fontWeight: 500 }}>{card.subtitle}</span>

                  </div>



                  <div style={{ marginBottom: 8, marginTop: 12 }}>

                    <PackagePriceBlock pkg={pkg} size="md" />

                  </div>

                  <PackageFoundingBadge pkg={pkg} />



                  <p style={{ color: '#8892b0', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>

                    {localizedPackageText(pkg, locale, 'description')}

                  </p>



                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>

                    {card.features.map((f) => (

                      <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#c8d3f0', fontSize: 14 }}>

                        <Check size={13} color={featured ? '#3d74ff' : '#8892b0'} />

                        {f.label}

                      </div>

                    ))}

                  </div>



                  <PackageCtaButton pkg={pkg} featured={featured} />

                </div>

              )

            })}

          </div>



          <p style={{

            textAlign: 'center', marginTop: 32, fontSize: 13, color: '#8892b0',

            maxWidth: 520, margin: '32px auto 0',

          }}>

            {aiAutomation.careNote}

          </p>

        </div>

      </section>



      <section style={{ padding: '100px 24px', maxWidth: 860, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 56 }}>

          <span className="badge" style={{ marginBottom: 20, display: 'inline-flex' }}>{t('paymentsFaq.badge')}</span>

          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 800, marginBottom: 14 }}>

            {t('paymentsFaq.title')}

          </h2>

          <p style={{ fontSize: 16, color: '#8892b0' }}>{t('paymentsFaq.subtitle')}</p>

        </div>

        <FaqAccordion items={paymentFaqs} />

      </section>



      <section style={{

        padding: '100px 24px 120px',

        textAlign: 'center',

        background: 'linear-gradient(180deg, transparent 0%, rgba(0,71,255,0.08) 100%)',

        borderTop: '1px solid rgba(255,255,255,0.06)',

      }}>

        <div style={{ maxWidth: 700, margin: '0 auto' }}>

          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.03em' }}>

            {bottomTitleParts.slice(0, -1).join(' ')}{' '}

            <span className="gradient-text">{bottomTitleParts[bottomTitleParts.length - 1]}</span>

          </h2>

          <p style={{ fontSize: 18, color: '#8892b0', marginBottom: 40, lineHeight: 1.7 }}>

            {t('bottomCta.description')}

          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>

            {bottomCtas.map((cta) => (

              <Link

                key={cta.id}

                href={CTA_HREFS[cta.id] ?? '/contact'}

                style={

                  cta.id === 'startProject'

                    ? {

                        background: '#0047FF', color: '#fff', padding: '16px 40px',

                        borderRadius: 12, fontWeight: 700, fontSize: 17,

                        textDecoration: 'none', boxShadow: '0 8px 30px rgba(0,71,255,0.4)',

                      }

                    : {

                        background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',

                        border: '1px solid rgba(255,255,255,0.1)',

                        padding: '16px 40px', borderRadius: 12, fontWeight: 600, fontSize: 17,

                        textDecoration: 'none',

                      }

                }

              >

                {cta.label}

              </Link>

            ))}

          </div>

        </div>

      </section>



      <Footer />

    </div>

  )

}

