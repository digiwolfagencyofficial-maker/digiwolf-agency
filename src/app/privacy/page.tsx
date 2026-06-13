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
    content: `Digi Wolf Agency s.r.o., IČ 24344648 ("we", "our", "us") is a digital agency registered in the Czech Republic with its registered office in Prague. We operate in the European Union and can be contacted at info@digiwolf.agency.

We are the data controller for personal data collected through our website at digiwolf.agency and through our services.`,
  },
  {
    title: '2. What Data We Collect',
    content: `We collect only the personal data you provide to us, plus limited technical data generated when you visit our site.

Contact form (/contact):
• Name
• Email address
• Company name (optional)
• Message content
• Service and budget range you select in the form

Bookings (/book via Cal.com):
• Name
• Email address
• Booking details needed to schedule your call (date, time, event type, and any notes you provide)

Technical data:
• IP address, browser type, device type, and pages visited — collected automatically by our hosting provider for security and performance

We do not collect special category data (health, race, political opinions, etc.) and we do not sell your personal data.`,
  },
  {
    title: '3. How We Use Your Data',
    content: `We process your personal data for the following purposes:

• To respond to contact form enquiries and follow up on your project (pre-contractual steps / legitimate interest)
• To schedule, confirm, and manage discovery calls and consultations booked through Cal.com (pre-contractual steps / contractual necessity)
• To send internal email notifications to our team when you submit a form or booking (legitimate interest)
• To store enquiry and booking records in our database (legitimate interest / contractual necessity)
• To operate, secure, and improve our website (legitimate interest)
• To comply with legal obligations under Czech and EU law

We do not use your data for automated decision-making or profiling.`,
  },
  {
    title: '4. Legal Basis for Processing (GDPR Art. 6)',
    content: `Under the General Data Protection Regulation (EU) 2016/679 ("GDPR"), we rely on the following legal bases:

• Art. 6(1)(b) — Contractual necessity / pre-contractual steps: processing needed to respond to your enquiry, schedule a call, or deliver services you request
• Art. 6(1)(f) — Legitimate interests: operating our website, storing records, sending internal notifications, and preventing abuse — balanced against your rights
• Art. 6(1)(c) — Legal obligation: processing required to comply with Czech or EU law (e.g. accounting records for clients)
• Art. 6(1)(a) — Consent: only where we explicitly ask for it (e.g. optional marketing). You may withdraw consent at any time.`,
  },
  {
    title: '5. Data Retention',
    content: `We keep personal data only as long as necessary for the purposes above:

• Contact form submissions: up to 3 years from your last interaction with us, unless a client relationship continues
• Booking records: up to 3 years after the scheduled call, or longer if you become a client
• Client project and invoice data: up to 10 years where required by Czech accounting law
• Server and security logs: typically up to 90 days

When data is no longer needed, we delete or anonymise it. You may request earlier deletion (see Section 9).`,
  },
  {
    title: '6. Third-Party Processors',
    content: `We use trusted service providers to run our website and handle your data. Each acts as a data processor on our instructions:

• Supabase — database hosting and storage of contact and booking records (EU-based infrastructure)
• Resend — transactional email delivery when you submit the contact form (notification to our team)
• Cal.com — scheduling platform embedded on /book; processes name, email, and booking details when you book a call
• Vercel — website hosting, content delivery, and serverless functions; may process IP addresses and request logs

We have data processing agreements in place with these providers where required. We do not authorise them to use your data for their own marketing purposes.`,
  },
  {
    title: '7. International Transfers',
    content: `We aim to process data within the European Economic Area (EEA). Some providers (including Vercel and Cal.com) may process data in the United States or other countries outside the EEA.

Where transfers occur, we rely on appropriate safeguards under GDPR Chapter V — such as Standard Contractual Clauses approved by the European Commission, or adequacy decisions where applicable.

You may request more information about safeguards for a specific transfer by contacting us.`,
  },
  {
    title: '8. Cookies and Similar Technologies',
    content: `Our website uses strictly necessary cookies required for basic site operation and security. When you book a call, Cal.com may set its own cookies in the embedded scheduler.

We do not currently use analytics or advertising cookies on digiwolf.agency. Your cookie preference is stored locally in your browser when you respond to our cookie notice.

See our Cookie Policy at /cookies for full details.`,
  },
  {
    title: '9. Your Rights Under GDPR (Art. 15–22)',
    content: `You have the following rights regarding your personal data:

• Right of access (Art. 15): request a copy of the personal data we hold about you
• Right to rectification (Art. 16): correct inaccurate or incomplete data
• Right to erasure (Art. 17): request deletion of your data ("right to be forgotten")
• Right to restriction (Art. 18): limit how we process your data in certain circumstances
• Right to data portability (Art. 20): receive your data in a structured, commonly used format
• Right to object (Art. 21): object to processing based on legitimate interests
• Right to withdraw consent (Art. 7(3)): where processing is based on consent, withdraw it at any time

To exercise any of these rights, email info@digiwolf.agency. We will respond within 30 days.

You also have the right to lodge a complaint with the Czech supervisory authority:

Office for Personal Data Protection (Úřad pro ochranu osobních údajů)
Pplk. Sochora 27, 170 00 Prague 7, Czech Republic
www.uoou.cz`,
  },
  {
    title: '10. Security',
    content: `We implement appropriate technical and organisational measures to protect your personal data, including:

• Encrypted data transmission (HTTPS/TLS)
• Encrypted database storage via Supabase
• Access controls limiting who can view enquiry and booking data
• Webhook signature verification for inbound booking data

No method of transmission over the internet is completely secure. We take reasonable precautions but cannot guarantee absolute security.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Material changes will be posted on this page with an updated "Last updated" date. Where appropriate, we may also notify you by email.

Continued use of our website after changes constitutes acceptance of the updated policy.`,
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
            <span>Company: Digi Wolf Agency s.r.o., IČ 24344648, Prague, Czech Republic</span>
            <span>Last updated: 13 June 2026</span>
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
            Contact us at{' '}
            <a href="mailto:info@digiwolf.agency" style={{ color: '#3d74ff', textDecoration: 'none' }}>info@digiwolf.agency</a>.
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
