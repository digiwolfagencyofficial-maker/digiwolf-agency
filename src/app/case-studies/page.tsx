'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const caseStudies = [
  {
    id: 1,
    name: 'TechVentures Prague',
    client: 'TechVentures s.r.o.',
    category: 'Websites',
    tag: 'SaaS Website',
    color: '#0047FF',
    accent: '#3b82f6',
    browserBg: '#0a0f1e',
    metric: '+340%',
    metricLabel: 'Conversions in 30 days',
    challenge: 'TechVentures had a dated, slow-loading website with poor mobile UX that was bleeding leads. Their SaaS product was excellent but the online presence failed to communicate value to enterprise prospects.',
    solution: 'We redesigned the entire digital experience from scratch — product-led landing pages, interactive demos, pricing clarity, and a lightning-fast Next.js build with SSR optimisation.',
    results: ['340% increase in demo bookings within 30 days', 'Page load time reduced from 7.2s to 0.9s', 'Bounce rate dropped from 78% to 31%', 'MRR grew by €42,000 in Q1 post-launch'],
    techStack: ['Next.js 14', 'TypeScript', 'Framer Motion', 'Vercel', 'Stripe'],
    testimonial: 'DigiWolf transformed our online presence completely. We went from losing leads to converting them at an extraordinary rate. The results speak for themselves.',
    author: 'Tomáš Novotný',
    role: 'CEO, TechVentures s.r.o.',
    mockupLines: ['const Dashboard = () => {', '  const [mrr, setMrr] = useState(0)', '  // +340% conversions 🚀', '  return <Analytics />'],
  },
  {
    id: 2,
    name: 'MN Export Hub',
    client: 'MN Export Hub GmbH',
    category: 'S.R.O. Formation',
    tag: 'E-commerce + S.R.O.',
    color: '#7c3aed',
    accent: '#a78bfa',
    browserBg: '#0f0a1e',
    metric: '€180K',
    metricLabel: 'Revenue in 90 days',
    challenge: 'A Mongolian export company wanted to enter the European market but had zero EU legal entity, no localised web presence, and no understanding of Czech business compliance requirements.',
    solution: 'End-to-end solution: Czech S.R.O. registration, EU VAT setup, a bilingual e-commerce platform in Czech and English, and a full compliance framework for cross-border trade.',
    results: ['S.R.O. registered within 8 business days', '€180,000 revenue generated in first 90 days', 'Successfully onboarded 14 EU wholesale buyers', 'Full VAT compliance across 3 EU jurisdictions'],
    techStack: ['Next.js', 'Shopify', 'Czech Trade Licence', 'EU VAT System', 'Stripe'],
    testimonial: 'We went from zero European presence to a fully operational Czech company with a profitable e-commerce operation in under 3 months. Incredible service.',
    author: 'Boldbaatar Gantulga',
    role: 'Director, MN Export Hub',
    mockupLines: ['// EU Market Entry 🌍', 'sro.register({ country: "CZ" })', 'vat.setup({ jurisdictions: 3 })', 'revenue: "€180,000 in 90d"'],
  },
  {
    id: 3,
    name: 'Novak Consulting',
    client: 'Novak & Partners s.r.o.',
    category: 'Websites',
    tag: 'Agency Website',
    color: '#059669',
    accent: '#34d399',
    browserBg: '#0a1a12',
    metric: '4 Days',
    metricLabel: 'From brief to live site',
    challenge: 'Novak Consulting needed a professional website urgently before a major client pitch. Their existing site was a template from 2018 with broken links, no SSL, and zero brand identity.',
    solution: 'Rapid sprint delivery — brand identity refresh, custom Next.js site, content copywriting, SEO foundation, and full deployment in under 96 hours without cutting corners on quality.',
    results: ['Fully live in 4 business days', 'Won €65,000 contract at the client pitch', 'Google PageSpeed score of 98/100', '3x increase in inbound enquiries within 2 weeks'],
    techStack: ['Next.js 14', 'Tailwind', 'Vercel', 'Google Analytics 4', 'Cloudflare'],
    testimonial: 'I was amazed. Four days from first call to a live, polished website that helped us win a €65K contract. DigiWolf delivered when no one else could.',
    author: 'Petra Nováková',
    role: 'Managing Partner, Novak & Partners',
    mockupLines: ['// Day 1: Brief received ✅', '// Day 2: Design approved ✅', '// Day 3: Dev complete ✅', '// Day 4: LIVE 🎉'],
  },
  {
    id: 4,
    name: 'FinTech Bratislava',
    client: 'FinTech Bratislava a.s.',
    category: 'AI Automation',
    tag: 'Web App + AI',
    color: '#dc2626',
    accent: '#f87171',
    browserBg: '#1a0a0a',
    metric: '80%',
    metricLabel: 'Reduction in manual work',
    challenge: 'A fintech startup was spending 120+ hours per week on manual data entry, report generation, and client onboarding processes that were completely un-automated and error-prone.',
    solution: 'Custom AI automation pipeline: GPT-4 powered document processing, automated client onboarding workflows, real-time reporting dashboards, and integration with their existing banking APIs.',
    results: ['80% reduction in manual administrative work', '120 hours/week freed up for revenue-generating activity', 'Error rate dropped from 12% to 0.3%', 'Client onboarding time: 5 days → 2 hours'],
    techStack: ['Python', 'OpenAI GPT-4', 'Next.js', 'PostgreSQL', 'n8n', 'Zapier'],
    testimonial: 'The AI automation suite DigiWolf built has fundamentally changed how we operate. We\'ve effectively gained back an entire team\'s worth of productive hours.',
    author: 'Martin Kováč',
    role: 'CTO, FinTech Bratislava',
    mockupLines: ['// AI Processing... ⚡', 'docs.process(120, "hrs/week")', 'errors.reduce(0.12, 0.003)', 'team.freedom: "+80% time"'],
  },
  {
    id: 5,
    name: 'Prague Beauty Studio',
    client: 'Lumière Beauty Studio',
    category: 'Websites',
    tag: 'Branding + Web',
    color: '#be185d',
    accent: '#f472b6',
    browserBg: '#1a0a12',
    metric: '5x',
    metricLabel: 'Instagram follower growth',
    challenge: 'A premium Prague beauty studio had no coherent brand identity, a non-existent social media presence, and relied entirely on word-of-mouth with no ability to attract new high-value clients.',
    solution: 'Complete brand identity system, luxury website with online booking integration, social media strategy, branded content templates, and a Google My Business optimisation campaign.',
    results: ['5x Instagram followers in 60 days (1.2K → 6.1K)', 'Online bookings increased by 220%', 'Average booking value up by 45%', 'Featured in Prague lifestyle magazine'],
    techStack: ['Next.js', 'Calendly API', 'Instagram Graph API', 'Figma', 'Adobe CC'],
    testimonial: 'DigiWolf understood our luxury positioning perfectly. The brand and website they created attracts exactly the type of high-end clients we want.',
    author: 'Karolína Dvořáčková',
    role: 'Owner, Lumière Beauty Studio',
    mockupLines: ['// Brand Refresh ✨', 'followers: "1.2K → 6.1K"', 'bookings.increase(220)', 'avgValue: "+45% premium"'],
  },
  {
    id: 6,
    name: 'Mongolian Trade Hub',
    client: 'Mongolian Trade Hub s.r.o.',
    category: 'S.R.O. Formation',
    tag: 'S.R.O. + Trilingual Site',
    color: '#d97706',
    accent: '#fbbf24',
    browserBg: '#1a1200',
    metric: '3 Markets',
    metricLabel: 'EU expansion in 60 days',
    challenge: 'A major Mongolian trading company wanted to establish a legal EU hub to facilitate B2B trade across Central Europe, with no existing EU infrastructure, legal entity, or multilingual digital presence.',
    solution: 'Czech S.R.O. formation, trilingual website (English, Czech, Mongolian), EU trade compliance setup, customs documentation workflow, and strategic partnership with Prague Chamber of Commerce.',
    results: ['S.R.O. operational in 7 business days', 'Expanded to 3 EU markets simultaneously', 'Secured 8 B2B partnerships within 60 days', 'Trilingual site driving qualified leads in all 3 languages'],
    techStack: ['Next.js i18n', 'Czech Legal Framework', 'EU Trade Law', 'Vercel', 'HubSpot'],
    testimonial: 'DigiWolf made our European expansion seamless. From the legal entity to the trilingual website, every detail was handled with expertise and speed.',
    author: 'Enkhjargal Dorj',
    role: 'CEO, Mongolian Trade Hub',
    mockupLines: ['// EU Expansion 🌐', 'languages: ["EN", "CZ", "MN"]', 'sro.status: "active"', 'markets.entered: 3],'],
  },
];

const filters = ['All', 'Websites', 'S.R.O. Formation', 'AI Automation'];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

  const filtered = activeFilter === 'All'
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === activeFilter);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <section className="grid-bg" style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(0,71,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          <span className="badge" style={{ display: 'inline-block', background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.4)', color: '#60a5fa', padding: '6px 18px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '24px' }}>
            Case Studies
          </span>
          <h1 className="fade-up" style={{ fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.08, margin: '0 0 24px', letterSpacing: '-0.03em' }}>
            Real Projects.{' '}
            <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #0047FF, #60a5fa, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Real Results.
            </span>
          </h1>
          <p style={{ fontSize: '20px', color: '#8892b0', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 48px' }}>
            Every project in our portfolio is a story of transformation. Here are six of our most impactful engagements — with the numbers to prove it.
          </p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{ n: '6+', l: 'Projects' }, { n: '€400K+', l: 'Client Revenue' }, { n: '4.9★', l: 'Average Rating' }].map((s) => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#f0f4ff' }}>{s.n}</div>
                <div style={{ fontSize: '13px', color: '#8892b0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '0 24px 60px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            onMouseEnter={() => setHoveredFilter(f)}
            onMouseLeave={() => setHoveredFilter(null)}
            style={{
              padding: '10px 24px',
              borderRadius: '100px',
              border: activeFilter === f ? '1px solid #0047FF' : '1px solid rgba(136,146,176,0.25)',
              background: activeFilter === f ? 'rgba(0,71,255,0.15)' : hoveredFilter === f ? 'rgba(255,255,255,0.05)' : 'transparent',
              color: activeFilter === f ? '#60a5fa' : '#8892b0',
              fontSize: '14px',
              fontWeight: activeFilter === f ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.02em',
            }}
          >
            {f}
          </button>
        ))}
      </section>

      {/* Case Study Cards */}
      <section style={{ padding: '0 24px 100px', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(580px, 1fr))', gap: '32px' }}>
          {filtered.map((cs) => (
            <div
              key={cs.id}
              className="fade-up stagger"
              onMouseEnter={() => setHoveredCard(cs.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: '#0a0f1e',
                border: hoveredCard === cs.id ? `1px solid ${cs.color}50` : '1px solid rgba(136,146,176,0.12)',
                borderRadius: '20px',
                overflow: 'hidden',
                transition: 'all 0.35s ease',
                transform: hoveredCard === cs.id ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hoveredCard === cs.id ? `0 20px 60px ${cs.color}20` : '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              {/* Browser Mockup */}
              <div className="browser-mockup" style={{ background: cs.browserBg, padding: '0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="browser-bar" style={{ background: '#111827', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="browser-dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  <span className="browser-dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                  <span className="browser-dot" style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '4px 12px', marginLeft: '8px', fontSize: '11px', color: '#4b5563', letterSpacing: '0.02em' }}>
                    digiwolf.agency/{cs.name.toLowerCase().replace(/\s/g, '-')}
                  </div>
                </div>
                <div style={{ padding: '28px 24px', fontFamily: "'Fira Code', monospace", fontSize: '13px', lineHeight: 1.7 }}>
                  {cs.mockupLines.map((line, i) => (
                    <div key={i} style={{ color: i === 0 ? '#8892b0' : i === 2 ? cs.accent : '#e2e8f0', marginBottom: '4px' }}>
                      <span style={{ color: '#374151', marginRight: '12px', userSelect: 'none' }}>{i + 1}</span>
                      {line}
                    </div>
                  ))}
                  <div style={{ marginTop: '16px', display: 'inline-block', background: `${cs.color}20`, border: `1px solid ${cs.color}40`, borderRadius: '8px', padding: '8px 16px' }}>
                    <span style={{ color: cs.accent, fontWeight: 700, fontSize: '22px' }}>{cs.metric}</span>
                    <span style={{ color: '#8892b0', fontSize: '12px', marginLeft: '8px' }}>{cs.metricLabel}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '28px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 4px', letterSpacing: '-0.02em' }}>{cs.name}</h3>
                    <p style={{ fontSize: '13px', color: '#8892b0', margin: 0 }}>{cs.client}</p>
                  </div>
                  <span className="badge" style={{ background: `${cs.color}18`, border: `1px solid ${cs.color}40`, color: cs.accent, padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    {cs.tag}
                  </span>
                </div>

                {/* Challenge / Solution / Results */}
                <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                  <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Challenge</div>
                    <p style={{ fontSize: '13px', color: '#8892b0', lineHeight: 1.6, margin: 0 }}>{cs.challenge}</p>
                  </div>
                  <div style={{ background: 'rgba(0,71,255,0.06)', border: '1px solid rgba(0,71,255,0.15)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#60a5fa', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Solution</div>
                    <p style={{ fontSize: '13px', color: '#8892b0', lineHeight: 1.6, margin: 0 }}>{cs.solution}</p>
                  </div>
                  <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Results</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {cs.results.map((r, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                          <span style={{ color: '#10b981', fontSize: '14px', marginTop: '1px', flexShrink: 0 }}>✓</span>
                          <span style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#8892b0', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>Tech Stack</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {cs.techStack.map((t) => (
                      <span key={t} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '3px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div style={{ background: `linear-gradient(135deg, ${cs.color}10, transparent)`, border: `1px solid ${cs.color}25`, borderRadius: '14px', padding: '20px' }}>
                  <div style={{ fontSize: '32px', color: cs.accent, lineHeight: 1, marginBottom: '8px', opacity: 0.6 }}>"</div>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.7, margin: '0 0 16px', fontStyle: 'italic' }}>{cs.testimonial}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${cs.color}, ${cs.accent})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                      {cs.author[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#f0f4ff' }}>{cs.author}</div>
                      <div style={{ fontSize: '11px', color: '#8892b0' }}>{cs.role}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((s) => <span key={s} style={{ color: '#f59e0b', fontSize: '13px' }}>★</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(0,71,255,0.06), transparent)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 20px', letterSpacing: '-0.03em' }}>
            Ready to Write{' '}
            <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #0047FF, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Your Case Study?
            </span>
          </h2>
          <p style={{ fontSize: '18px', color: '#8892b0', lineHeight: 1.7, marginBottom: '40px' }}>
            Join the companies that trusted DigiWolf to transform their digital presence. Let's make your results the next story we tell.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              style={{ display: 'inline-block', background: '#0047FF', color: '#fff', padding: '16px 36px', borderRadius: '12px', fontWeight: 700, fontSize: '16px', textDecoration: 'none', letterSpacing: '-0.01em', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#0038cc'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = '#0047FF'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Start Your Project →
            </a>
            <a
              href="/services"
              style={{ display: 'inline-block', background: 'transparent', color: '#f0f4ff', padding: '16px 36px', borderRadius: '12px', fontWeight: 600, fontSize: '16px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.2s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
