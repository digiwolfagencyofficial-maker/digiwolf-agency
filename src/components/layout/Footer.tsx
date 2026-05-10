const WolfLogo = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <polygon points="4,14 8,2 13,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="28,14 24,2 19,12" fill="#0047FF" opacity="0.9"/>
    <polygon points="6,13 9,5 12,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="26,13 23,5 20,12" fill="#3d74ff" opacity="0.6"/>
    <polygon points="16,3 28,14 26,26 16,30 6,26 4,14" fill="#0047FF" opacity="0.95"/>
    <polygon points="16,10 24,16 22,24 16,27 10,24 8,16" fill="#1a5cff" opacity="0.5"/>
    <circle cx="12" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="20" cy="17" r="2.2" fill="#F5F5F5"/>
    <circle cx="12.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <circle cx="20.5" cy="17.3" r="1" fill="#0A0A0A"/>
    <polygon points="16,21 13,24 19,24" fill="#1a3bcc" opacity="0.7"/>
    <circle cx="16" cy="21.5" r="1.3" fill="#0A1050"/>
  </svg>
)

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-logo">
              <WolfLogo />
              DIGI WOLF
            </div>
            <p className="footer-tagline">Prague-based digital agency specialising in websites, web apps, mobile apps, Czech S.R.O. formation, and AI automation. We turn ideas into digital reality.</p>
            <div className="footer-social">
              <a href="https://facebook.com/digiwolfagency" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="mailto:info@digiwolf.agency" className="social-btn" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/digiwolfagency" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="footer-heading">Services</div>
            <ul className="footer-links">
              <li><a href="#services">Agency Websites</a></li>
              <li><a href="#services">Full-Stack Web Apps</a></li>
              <li><a href="#services">Mobile Apps</a></li>
              <li><a href="#services">Czech S.R.O. Formation</a></li>
              <li><a href="#services">AI Automation</a></li>
              <li><a href="#services">Maintenance Plans</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="footer-heading">Company</div>
            <ul className="footer-links">
              <li><a href="#how">Our Process</a></li>
              <li><a href="#cases">Case Studies</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="https://calendly.com/digiwolf-agency-consultation/30min" target="_blank" rel="noopener noreferrer">Book a Call</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="footer-heading">Get in Touch</div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">✉️</div>
              <div className="footer-contact-text">
                <a href="mailto:info@digiwolf.agency">info@digiwolf.agency</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <div className="footer-contact-text">
                Digi Wolf Agency s.r.o.<br/>
                Wenceslas Square 1<br/>
                110 00 Prague 1, Czechia
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">🕐</div>
              <div className="footer-contact-text">
                Mon–Fri, 9:00–18:00 CET<br/>
                Response within 24 hours
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Digi Wolf Agency s.r.o. All rights reserved.</div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
