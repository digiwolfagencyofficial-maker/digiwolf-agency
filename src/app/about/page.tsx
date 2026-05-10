'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const values = [
  {
    icon: '⚡',
    title: 'Speed',
    desc: 'We move fast without cutting corners. Most projects launch in 5–10 days. We have systematized delivery so you get premium results at startup velocity.',
    color: '#FFB300',
  },
  {
    icon: '💎',
    title: 'Quality',
    desc: 'Every line of code, every pixel, every document is crafted to the highest standard. We don\'t ship anything we wouldn\'t be proud to put our name on.',
    color: '#0047FF',
  },
  {
    icon: '🤝',
    title: 'Transparency',
    desc: 'No hidden fees, no vague timelines, no agency doublespeak. You get clear pricing, honest scoping, and direct communication throughout every project.',
    color: '#00C9A7',
  },
  {
    icon: '🧬',
    title: 'Innovation',
    desc: 'We stay at the frontier of web technology, AI, and digital growth. When new tools make your business better, we bring them to you first.',
    color: '#E040FB',
  },
];

const stats = [
  { num: '47', label: 'Clients Served', suffix: '+' },
  { num: '98', label: 'Satisfaction Rate', suffix: '%' },
  { num: '3', label: 'Countries Active', suffix: '' },
  { num: '6', label: 'Avg. Day Delivery', suffix: ' days' },
];

const team = [
  {
    name: 'Bat-Erdene Gantulga',
    role: 'Founder & Lead Developer',
    origin: '🇲🇳 Ulaanbaatar → 🇨🇿 Prague',
    bio: 'Born in Ulaanbaatar and educated in Prague, Bat-Erdene built Digi Wolf Agency to help international entrepreneurs navigate the Czech and Central European business landscape. With over 8 years of software development experience and deep roots in the Mongolian diaspora community, he bridges two worlds — bringing Western digital excellence to Eastern markets and opening EU doors for entrepreneurs from across the globe.',
    skills: ['Next.js', 'TypeScript', 'AI Systems', 'Business Strategy'],
    color: '#0047FF',
  },
  {
    name: 'Solongo Dash',
    role: 'Co-Founder & Brand Director',
    origin: '🇲🇳 Darkhan → 🇨🇿 Prague',
    bio: 'Solongo leads all creative and brand strategy at Digi Wolf. With a background in design from Prague\'s Academy of Arts, she has developed visual identities for over 30 companies spanning Mongolia, Czech Republic, and Slovakia. Her work blends the graphic boldness of Mongolian visual tradition with the clean precision of Central European design.',
    skills: ['Brand Strategy', 'Visual Identity', 'UX/UI Design', 'Content Strategy'],
    color: '#E040FB',
  },
];

const whyCee = [
  {
    icon: '🇪🇺',
    title: 'EU Market Access',
    desc: 'A Czech S.R.O. gives you instant access to the entire European single market — 450 million consumers, free movement of goods, and EU banking.',
  },
  {
    icon: '💰',
    title: 'Competitive Tax Environment',
    desc: 'Czech corporate tax rate of 21%, with strategic holding structures and EU treaty networks that international entrepreneurs can leverage effectively.',
  },
  {
    icon: '⚡',
    title: 'Fast Company Formation',
    desc: 'Czech company registration typically completes in 5–7 business days. One of the fastest in the EU — compare that to 4–8 weeks in Germany or France.',
  },
  {
    icon: '🏙️',
    title: 'Prague: Europe\'s Rising Tech Hub',
    desc: 'Prague ranks consistently as one of Europe\'s top cities for startups. A growing ecosystem of VCs, accelerators, and talent makes it ideal for ambition.',
  },
  {
    icon: '🌐',
    title: 'English-Friendly Environment',
    desc: 'Czech Republic has one of the highest English proficiency rates in CEE. Business, banking, and legal processes are increasingly available in English.',
  },
  {
    icon: '🤝',
    title: 'Mongolian Diaspora Community',
    desc: 'A vibrant Mongolian community in Prague means networks, referrals, and mutual support for entrepreneurs making the jump to Europe.',
  },
];

export default function AboutPage() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);
  const [hoveredCee, setHoveredCee] = useState<number | null>(null);
  const [hoveredCta, setHoveredCta] = useState(false);

  return (
    <div style={{ background: '#030712', minHeight: '100vh', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position: 'relative', padding: '140px 24px 120px',
        textAlign: 'center', overflow: 'hidden',
      }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.25 }} />
        <div style={{
          position: 'absolute', top: '30%', left: '20%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(0,71,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '15%',
          width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(224,64,251,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
          <div className="badge fade-up" style={{
            display: 'inline-block', marginBottom: 24,
            background: 'rgba(0,71,255,0.12)', border: '1px solid rgba(0,71,255,0.35)',
            color: '#6b9fff', padding: '8px 20px', borderRadius: 100,
            fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Our Story
          </div>
          <h1 className="fade-up" style={{
            fontSize: 'clamp(40px, 6.5vw, 76px)', fontWeight: 900,
            lineHeight: 1.05, marginBottom: 28,
          }}>
            We Are{' '}
            <span style={{
              background: 'linear-gradient(135deg, #0047FF 0%, #00C9A7 60%, #E040FB 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Digi Wolf Agency
            </span>
          </h1>
          <p className="fade-up" style={{
            fontSize: 21, color: '#8892b0', lineHeight: 1.75,
            maxWidth: 680, margin: '0 auto 20px',
          }}>
            A Prague-based digital agency founded by Mongolian entrepreneurs — built to help ambitious
            businesses across CEE and the Mongolian diaspora compete and win in the digital age.
          </p>
          <p className="fade-up" style={{
            fontSize: 17, color: '#6b7a96', lineHeight: 1.7,
            maxWidth: 600, margin: '0 auto 48px',
          }}>
            We believe every entrepreneur deserves world-class digital infrastructure, regardless of
            where they started. We build the tools. We open the doors.
          </p>
          <div className="fade-up" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{
              background: '#0047FF', color: '#fff', padding: '14px 36px',
              borderRadius: 12, fontWeight: 700, fontSize: 16,
              textDecoration: 'none', display: 'inline-block',
              boxShadow: '0 0 30px rgba(0,71,255,0.4)',
            }}>
              Work With Us
            </a>
            <a href="/services" style={{
              background: 'rgba(255,255,255,0.05)', color: '#f0f4ff',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '14px 36px', borderRadius: 12, fontWeight: 600, fontSize: 16,
              textDecoration: 'none', display: 'inline-block',
            }}>
              Our Services →
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 24px',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{
          maxWidth: 800, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 40, textAlign: 'center',
        }}>
          {stats.map((s) => (
            <div key={s.label} className="stagger">
              <div style={{
                fontSize: 48, fontWeight: 900, color: '#f0f4ff',
                background: 'linear-gradient(135deg, #0047FF, #00C9A7)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1,
              }}>
                {s.num}{s.suffix}
              </div>
              <div style={{ fontSize: 15, color: '#8892b0', marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div className="fade-up">
            <div style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.3)',
              color: '#6b9fff', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Our Origin Story
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.15 }}>
              From Ulaanbaatar to Prague —{' '}
              <span style={{
                background: 'linear-gradient(135deg, #0047FF 0%, #00C9A7 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Building Bridges
              </span>
            </h2>
            <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85, marginBottom: 20 }}>
              Digi Wolf Agency was founded in Prague by Bat-Erdene Gantulga, a Mongolian software developer who arrived in the Czech Republic as a student and quickly recognized a gap in the market: international entrepreneurs — especially from Mongolia, Kazakhstan, and Central Asia — were struggling to navigate EU company formation, build credible digital presences, and access European markets.
            </p>
            <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85, marginBottom: 20 }}>
              The agency started with a simple mission: make it easier for entrepreneurs from underrepresented markets to compete on a global stage. Today, Digi Wolf serves clients across the Czech Republic, Mongolia, and Slovakia, providing end-to-end digital services in English, Czech, and Mongolian.
            </p>
            <p style={{ fontSize: 16, color: '#8892b0', lineHeight: 1.85 }}>
              We understand the unique challenges of being an outsider building a business in a new country. That empathy drives every service we offer — from helping you register your first Czech company to building the digital infrastructure that makes you look like you've been here for decades.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Visual Story Card */}
            <div className="glass" style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 28, padding: 40,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { year: '2020', event: 'Agency founded in Prague by Bat-Erdene Gantulga', icon: '🐺' },
                  { year: '2021', event: 'First 10 Czech S.R.O. formations for Mongolian clients', icon: '🏛️' },
                  { year: '2022', event: 'Expanded into web development — 15 sites launched', icon: '🚀' },
                  { year: '2023', event: 'Solongo joins as Co-Founder; Brand Identity service launched', icon: '🎨' },
                  { year: '2024', event: 'AI Automation division opens; 47+ clients across 3 countries', icon: '🤖' },
                  { year: '2025', event: 'Expanding into Slovak and Polish markets', icon: '🌍' },
                ].map((item, i) => (
                  <div key={item.year} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: 'rgba(0,71,255,0.15)', border: '1px solid rgba(0,71,255,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, fontSize: 20,
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#0047FF', marginBottom: 3, letterSpacing: '0.05em' }}>
                        {item.year}
                      </div>
                      <div style={{ fontSize: 14, color: '#c0c8d8', lineHeight: 1.5 }}>{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{
        padding: '100px 24px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="badge" style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.3)',
              color: '#6b9fff', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              What We Stand For
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800 }}>
              Our Core Values
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {values.map((v, i) => {
              const isHov = hoveredValue === i;
              return (
                <div
                  key={v.title}
                  className="glass stagger"
                  onMouseEnter={() => setHoveredValue(i)}
                  onMouseLeave={() => setHoveredValue(null)}
                  style={{
                    background: isHov ? `${v.color}10` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHov ? v.color + '40' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 24, padding: 36,
                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    transform: isHov ? 'translateY(-4px)' : 'none',
                    boxShadow: isHov ? `0 20px 50px rgba(0,0,0,0.35), 0 0 30px ${v.color}15` : '0 4px 20px rgba(0,0,0,0.15)',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 18,
                    background: `${v.color}18`, border: `1px solid ${v.color}35`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, marginBottom: 24,
                    transition: 'all 0.3s',
                    boxShadow: isHov ? `0 0 20px ${v.color}30` : 'none',
                  }}>
                    {v.icon}
                  </div>
                  <h3 style={{
                    fontSize: 22, fontWeight: 800, marginBottom: 14,
                    color: isHov ? v.color : '#f0f4ff',
                    transition: 'color 0.2s',
                  }}>
                    {v.title}
                  </h3>
                  <p style={{ fontSize: 15, color: '#8892b0', lineHeight: 1.75 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '100px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="badge" style={{
            display: 'inline-block', marginBottom: 20,
            background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.3)',
            color: '#6b9fff', padding: '7px 18px', borderRadius: 100,
            fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            The People Behind the Work
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
            Meet the Founders
          </h2>
          <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Small team. Massive output. We work with a curated network of developers, designers, and specialists across CEE.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 32 }}>
          {team.map((member, i) => {
            const isHov = hoveredTeam === i;
            return (
              <div
                key={member.name}
                className="glass"
                onMouseEnter={() => setHoveredTeam(i)}
                onMouseLeave={() => setHoveredTeam(null)}
                style={{
                  background: isHov ? `${member.color}08` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isHov ? member.color + '35' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: 24, padding: 40,
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                  transform: isHov ? 'translateY(-4px)' : 'none',
                  boxShadow: isHov ? `0 20px 50px rgba(0,0,0,0.3), 0 0 30px ${member.color}15` : 'none',
                  cursor: 'default',
                }}
              >
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
                  {/* Avatar Placeholder */}
                  <div style={{
                    width: 72, height: 72, borderRadius: 20,
                    background: `linear-gradient(135deg, ${member.color}40, ${member.color}10)`,
                    border: `2px solid ${member.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 28, fontWeight: 800, color: member.color,
                    flexShrink: 0,
                  }}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{member.name}</h3>
                    <p style={{ fontSize: 14, color: member.color, fontWeight: 600, marginBottom: 6 }}>{member.role}</p>
                    <p style={{ fontSize: 13, color: '#8892b0' }}>{member.origin}</p>
                  </div>
                </div>
                <p style={{ fontSize: 15, color: '#8892b0', lineHeight: 1.8, marginBottom: 24 }}>{member.bio}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {member.skills.map((skill) => (
                    <span key={skill} style={{
                      background: `${member.color}15`, border: `1px solid ${member.color}30`,
                      color: member.color, padding: '4px 12px', borderRadius: 100,
                      fontSize: 12, fontWeight: 600,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why CEE */}
      <section style={{
        padding: '100px 24px',
        background: 'rgba(255,255,255,0.015)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="badge" style={{
              display: 'inline-block', marginBottom: 20,
              background: 'rgba(0,71,255,0.1)', border: '1px solid rgba(0,71,255,0.3)',
              color: '#6b9fff', padding: '7px 18px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              Why Central Europe
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16 }}>
              Czech Republic: Your EU Gateway
            </h2>
            <p style={{ fontSize: 17, color: '#8892b0', maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
              We chose Prague for a reason. The Czech Republic offers one of Europe's most advantageous environments for international entrepreneurs to establish and grow.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {whyCee.map((item, i) => {
              const isHov = hoveredCee === i;
              return (
                <div
                  key={item.title}
                  className="glass"
                  onMouseEnter={() => setHoveredCee(i)}
                  onMouseLeave={() => setHoveredCee(null)}
                  style={{
                    background: isHov ? 'rgba(0,71,255,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isHov ? 'rgba(0,71,255,0.35)' : 'rgba(255,255,255,0.07)'}`,
                    borderRadius: 20, padding: 32,
                    transition: 'all 0.3s',
                    transform: isHov ? 'translateY(-3px)' : 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: '#8892b0', lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '100px 24px', textAlign: 'center',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,71,255,0.07) 100%)',
      }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🐺</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, marginBottom: 20 }}>
            Ready to Join the Pack?
          </h2>
          <p style={{ fontSize: 18, color: '#8892b0', lineHeight: 1.7, marginBottom: 40 }}>
            Whether you're a Mongolian entrepreneur looking to enter the EU market, a Czech startup
            needing a digital edge, or any ambitious business ready to scale — we're here to help you dominate.
          </p>
          <a
            href="/contact"
            onMouseEnter={() => setHoveredCta(true)}
            onMouseLeave={() => setHoveredCta(false)}
            style={{
              display: 'inline-block',
              background: hoveredCta ? '#0038cc' : '#0047FF',
              color: '#fff', padding: '18px 48px', borderRadius: 14,
              fontWeight: 800, fontSize: 18, textDecoration: 'none',
              boxShadow: hoveredCta ? '0 0 50px rgba(0,71,255,0.6)' : '0 0 30px rgba(0,71,255,0.35)',
              transform: hoveredCta ? 'translateY(-2px) scale(1.02)' : 'none',
              transition: 'all 0.25s',
            }}
          >
            Get In Touch →
          </a>
          <div style={{
            marginTop: 40, display: 'flex', justifyContent: 'center',
            gap: 40, flexWrap: 'wrap',
          }}>
            {[
              { icon: '📍', text: 'Based in Prague, Czech Republic' },
              { icon: '🌐', text: 'Serving 3 countries' },
              { icon: '🗣️', text: 'CZ, EN, MN spoken' },
            ].map((item) => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8892b0', fontSize: 14 }}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
