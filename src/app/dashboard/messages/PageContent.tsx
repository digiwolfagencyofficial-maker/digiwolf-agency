'use client';

export const dynamic = 'force-dynamic';

import DashboardLayout from '@/components/dashboard/DashboardLayout';

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
];

export function MessagesPageInner() {
  return (
    <DashboardLayout navItems={clientNav}>
      <div
        style={{
          display: 'flex',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
        }}
      >
        {/* LEFT PANEL — Conversation List */}
        <div
          style={{
            width: '300px',
            flexShrink: 0,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            background: '#040d1f',
          }}
        >
          <div
            style={{
              padding: '20px 16px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#f0f4ff',
                margin: '0 0 12px 0',
              }}
            >
              Messages
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '8px 12px',
              }}
            >
              <span style={{ fontSize: '14px', color: '#4a5678' }}>🔍</span>
              <input
                type="text"
                placeholder="Search conversations..."
                disabled
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#4a5678',
                  fontSize: '13px',
                  width: '100%',
                  cursor: 'not-allowed',
                }}
              />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 16px',
              textAlign: 'center',
              color: '#8892b0',
            }}
          >
            <div>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>💬</div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#6b7a9e', margin: 0 }}>
                No messages yet
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Empty chat area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#030712',
            minWidth: 0,
            padding: '24px',
            textAlign: 'center',
            color: '#8892b0',
          }}
        >
          <div style={{ fontSize: '56px', marginBottom: '20px' }}>💬</div>
          <p style={{ fontSize: '20px', fontWeight: 700, color: '#f0f4ff', margin: '0 0 8px 0' }}>
            No messages yet
          </p>
          <p style={{ fontSize: '14px', color: '#6b7a9e', margin: 0, maxWidth: '320px' }}>
            When your agency reaches out, conversations will appear here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
