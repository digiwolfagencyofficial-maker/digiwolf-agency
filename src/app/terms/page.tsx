import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Digi Wolf Agency s.r.o. — the legal agreement governing use of our services.',
}

const sections = [
  {
    title: '1. Agreement to Terms',
    content: `By engaging Digi Wolf Agency s.r.o. ("Agency", "we", "us") for services or accessing our website at digiwolf.agency, you ("Client", "you") agree to be bound by these Terms of Service.

These Terms constitute a legally binding agreement. If you do not agree to these Terms, do not use our services.`,
  },
  {
    title: '2. Services',
    content: `We provide digital services including, but not limited to:

• Website design and development
• Web application and mobile app development
• AI automation and workflow implementation
• Czech S.R.O. company formation assistance
• Search engine optimisation (SEO)
• Brand identity design
• Website maintenance and support

The specific services, deliverables, timelines, and pricing for each project are set out in a separate Project Agreement or Statement of Work ("SOW") agreed between the parties.`,
  },
  {
    title: '3. Payment Terms',
    content: `3.1 Fees are set out in the relevant Project Agreement or invoice.

3.2 Unless otherwise agreed, payment is due within 14 days of invoice date.

3.3 We typically require a 50% deposit before commencing work, with the balance due upon completion.

3.4 Late payments may incur interest at the statutory rate under Czech law (Act No. 513/1991 Coll.).

3.5 All prices are in Czech Crowns (CZK) unless otherwise stated. We are not registered for VAT unless explicitly stated on the invoice.`,
  },
  {
    title: '4. Intellectual Property',
    content: `4.1 Upon full payment, the Client receives full ownership of all custom deliverables created specifically for the project (websites, code, designs, copy).

4.2 We retain the right to display the work in our portfolio and marketing materials unless the Client requests confidentiality in writing.

4.3 We retain ownership of our proprietary tools, frameworks, and pre-existing intellectual property used in delivering the services.

4.4 Third-party components (open-source libraries, stock images, fonts) are subject to their respective licences. We will advise you of any licencing requirements.`,
  },
  {
    title: '5. Client Responsibilities',
    content: `The Client agrees to:

• Provide accurate information and content required for the project in a timely manner
• Review and provide feedback within agreed timeframes (typically 5 business days)
• Ensure they own or have rights to any content, images, or materials supplied to us
• Make payments on time
• Maintain the confidentiality of any access credentials provided

Delays caused by the Client may result in revised timelines and additional fees.`,
  },
  {
    title: '6. Revisions and Changes',
    content: `6.1 The number of included revisions is specified in the Project Agreement.

6.2 Additional revisions beyond the agreed scope will be charged at our current hourly rate.

6.3 Material changes to the project scope will require a new or amended Project Agreement and may affect the timeline and price.`,
  },
  {
    title: '7. Warranties and Representations',
    content: `7.1 We warrant that our services will be delivered with reasonable skill and care, consistent with industry standards.

7.2 We do not warrant that websites will achieve specific search rankings, traffic levels, or conversion rates.

7.3 The Client warrants that all content and materials provided to us are lawful and do not infringe third-party rights.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `8.1 To the maximum extent permitted by Czech law, our total liability for any claim arising under these Terms is limited to the fees paid by the Client for the specific service giving rise to the claim.

8.2 We are not liable for indirect, consequential, or incidental damages, including loss of revenue, loss of data, or business interruption.

8.3 We are not responsible for errors or issues arising from third-party services, hosting providers, or software outside our control.`,
  },
  {
    title: '9. Confidentiality',
    content: `Both parties agree to keep confidential any non-public information received from the other party. This obligation survives termination of the agreement for a period of 3 years.`,
  },
  {
    title: '10. Termination',
    content: `10.1 Either party may terminate a project with 30 days' written notice.

10.2 Upon termination, the Client pays for all work completed to date. If the Client terminates after the deposit stage, the deposit is non-refundable.

10.3 We may immediately terminate services if the Client breaches these Terms, fails to make payment, or engages in unlawful conduct.`,
  },
  {
    title: '11. Governing Law and Disputes',
    content: `11.1 These Terms are governed by the laws of the Czech Republic.

11.2 The courts of the Czech Republic have jurisdiction over any disputes arising from these Terms.

11.3 We encourage resolution of disputes through direct negotiation before commencing legal proceedings.`,
  },
  {
    title: '12. Changes to These Terms',
    content: `We may update these Terms from time to time. Material changes will be communicated by email. Continued use of our services after changes constitutes acceptance.`,
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff' }}>
      <Navbar />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 100, background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.25)', fontSize: 12, fontWeight: 600, color: '#3d74ff', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 20 }}>Legal</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>Terms of Service</h1>
          <p style={{ color: '#8892b0', fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
            These Terms of Service govern your use of Digi Wolf Agency s.r.o. services. Please read them carefully before engaging us for any project.
          </p>
          <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#64748b', flexWrap: 'wrap' }}>
            <span>Last updated: 11 May 2026</span>
            <span>Effective: 11 May 2026</span>
          </div>
        </div>

        {/* Table of Contents */}
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

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {sections.map((s, i) => (
            <div key={i} id={`section-${i}`}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f0f4ff', marginBottom: 16 }}>{s.title}</h2>
              <div style={{ color: '#94a3b8', lineHeight: 1.8, fontSize: 15, whiteSpace: 'pre-line' }}>{s.content}</div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div style={{ marginTop: 60, background: 'rgba(0,71,255,0.06)', border: '1px solid rgba(0,71,255,0.2)', borderRadius: 16, padding: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Questions about our terms?</h3>
          <p style={{ color: '#8892b0', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            Contact us at{' '}
            <a href="mailto:digiwolfagencyofficial@gmail.com" style={{ color: '#3d74ff', textDecoration: 'none' }}>digiwolfagencyofficial@gmail.com</a>{' '}
            with any questions about these Terms.
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
