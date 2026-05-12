import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Digi Wolf Agency s.r.o. — how we collect, use, and protect your personal data in accordance with GDPR.',
}

const sections = [
  {
    title: '1. Who We Are',
    content: `Digi Wolf Agency s.r.o. ("we", "our", "us") is a digital agency incorporated in the Czech Republic. Our registered office is in Prague, Czech Republic. We can be contacted at digiwolfagencyofficial@gmail.com.

We are the data controller for personal data collected through our website and services.`,
  },
  {
    title: '2. What Data We Collect',
    content: `We collect the following categories of personal data:

• Contact information: name, email address, phone number, company name
• Project data: information you share about your business and project requirements
• Communication records: emails and messages exchanged with us
• Website usage data: IP address, browser type, pages visited, time on site (via analytics)
• Account data: email and encrypted password if you register for our client portal

We do not collect special category data (health, race, political opinions, etc.).`,
  },
  {
    title: '3. How We Use Your Data',
    content: `We process your personal data for the following purposes:

• To respond to enquiries and provide our services (legitimate interest / contractual necessity)
• To manage client projects and communicate project updates (contractual necessity)
• To send invoices and manage payments (legal obligation / contractual necessity)
• To improve our website and services (legitimate interest)
• To comply with legal obligations under Czech and EU law

We do not sell your personal data to third parties.`,
  },
  {
    title: '4. Legal Basis for Processing (GDPR Art. 6)',
    content: `Under GDPR (Regulation (EU) 2016/679), we process your data on the following legal bases:

• Contractual necessity (Art. 6(1)(b)): processing required to fulfil a contract or take pre-contractual steps
• Legitimate interests (Art. 6(1)(f)): where our business interest does not override your rights
• Legal obligation (Art. 6(1)(c)): processing required to comply with Czech or EU law
• Consent (Art. 6(1)(a)): where we ask for your explicit consent (e.g., marketing emails)`,
  },
  {
    title: '5. Data Retention',
    content: `We retain your personal data for as long as necessary to provide our services and comply with legal obligations:

• Contact form submissions: 3 years from last interaction
• Client project data and invoices: 10 years (Czech accounting law requirement)
• Account data: until account deletion request
• Analytics data: 26 months (anonymised after 14 months)

You may request deletion of your data at any time (see Section 8).`,
  },
  {
    title: '6. Data Sharing',
    content: `We may share your data with:

• Supabase (database hosting) — servers in the EU
• Vercel (website hosting) — EU and US servers with Standard Contractual Clauses
• Google (analytics, if enabled) — subject to GDPR adequacy decision
• Professional advisors (lawyers, accountants) — under confidentiality obligations
• Czech public authorities — when legally required

We do not transfer your data outside the EEA without appropriate safeguards.`,
  },
  {
    title: '7. Cookies',
    content: `Our website uses strictly necessary cookies (required for site function) and analytics cookies (with consent). See our Cookie Policy for full details.`,
  },
  {
    title: '8. Your Rights Under GDPR (Art. 15–22)',
    content: `You have the following rights regarding your personal data:

• Right of access (Art. 15): request a copy of your personal data
• Right to rectification (Art. 16): correct inaccurate or incomplete data
• Right to erasure (Art. 17): request deletion of your data ("right to be forgotten")
• Right to restriction (Art. 18): limit how we process your data
• Right to data portability (Art. 20): receive your data in a machine-readable format
• Right to object (Art. 21): object to processing based on legitimate interests
• Right to withdraw consent (Art. 7(3)): withdraw consent at any time

To exercise any of these rights, contact us at digiwolfagencyofficial@gmail.com. We will respond within 30 days.

You also have the right to lodge a complaint with the Office for Personal Data Protection (Úřad pro ochranu osobních údajů), Pplk. Sochora 27, 170 00 Prague 7, Czech Republic.`,
  },
  {
    title: '9. Security',
    content: `We implement appropriate technical and organisational measures to protect your personal data, including encrypted data transmission (HTTPS/TLS), encrypted database storage, access controls and authentication, and regular security reviews.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a notice on our website. Continued use of our services after changes constitutes acceptance.`,
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff' }}>
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)', fontSize: 12, fontWeight: 600, color: '#3d74ff', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>Legal</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>Privacy Policy</h1>
          <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
            This Privacy Policy explains how Digi Wolf Agency s.r.o. collects, uses, and protects your personal data in compliance with GDPR and applicable Czech law.
          </p>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
            <span>Company: Digi Wolf Agency s.r.o., Prague, Czech Republic</span>
            <span>Last updated: January 2025</span>
          </div>
        </div>

        <div style={{ background: '#040d1f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#8892b0', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contents</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sections.map((s, i) => (
              <a key={i} href={`#section-${i}`} className="toc-link" style={{ fontSize: 14, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                {s.title}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {sections.map((s, i) => (
            <div key={i} id={`section-${i}`}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>{s.title}</h2>
              <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, whiteSpace: 'pre-line' }}>{s.content}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60, background: 'rgba(0,71,255,0.06)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 16, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Questions about your data?</h3>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            Contact our Data Protection contact at{' '}
            <a href="mailto:digiwolfagencyofficial@gmail.com" style={{ color: '#3d74ff', textDecoration: 'none' }}>digiwolfagencyofficial@gmail.com</a>.
            We respond to all data requests within 30 days.
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#0047FF', color: '#fff', textDecoration: 'none',
            padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 700,
          }}>
            Contact Us →
          </Link>
        </div>
      </main>

      <Footer />
      <style>{`.toc-link:hover { color: #f0f4ff !important; }`}</style>
    </div>
  )
}
