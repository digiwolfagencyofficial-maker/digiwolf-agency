export default function PublicHomePage() {
  return (
    <main
      style={{
        background: '#0A0A0A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        color: '#FFFFFF',
        padding: '2rem',
      }}
    >
      {/* Wolf logo placeholder */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#0047FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '2rem',
          fontSize: '2rem',
        }}
      >
        🐺
      </div>

      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}
      >
        Digi Wolf Agency
      </h1>

      <p
        style={{
          fontSize: '1.25rem',
          color: '#0047FF',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '2rem',
        }}
      >
        Coming Soon
      </p>

      <p
        style={{
          fontSize: '1rem',
          color: '#888888',
          maxWidth: 480,
          textAlign: 'center',
          lineHeight: 1.7,
          marginBottom: '3rem',
        }}
      >
        Web development, Czech S.R.O. formation, and AI automation for the
        Mongolian diaspora in Central &amp; Eastern Europe.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {['Web Development', 'Czech S.R.O. Formation', 'AI Automation'].map(
          (service) => (
            <span
              key={service}
              style={{
                border: '1px solid #0047FF',
                borderRadius: 6,
                padding: '0.4rem 1rem',
                fontSize: '0.85rem',
                color: '#0047FF',
                letterSpacing: '0.05em',
              }}
            >
              {service}
            </span>
          )
        )}
      </div>

      <div
        style={{
          marginTop: '4rem',
          borderTop: '1px solid #1A1A1A',
          paddingTop: '2rem',
          color: '#444',
          fontSize: '0.8rem',
          textAlign: 'center',
        }}
      >
        &copy; {new Date().getFullYear()} Digi Wolf Agency s.r.o. &middot; Prague, Czech Republic
      </div>
    </main>
  )
}
