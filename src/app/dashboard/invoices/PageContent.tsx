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

export function InvoicesPageInner() {
  return (
    <DashboardLayout navItems={clientNav}>
      <div style={{ padding: '32px', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '32px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#f0f4ff',
                margin: 0,
                letterSpacing: '-0.5px',
              }}
            >
              Invoices
            </h1>
            <p style={{ color: '#6b7a9e', marginTop: '6px', fontSize: '15px' }}>
              Manage and track all your billing activity.
            </p>
          </div>
          <div
            style={{
              background: 'rgba(251,191,36,0.1)',
              border: '1px solid rgba(251,191,36,0.25)',
              borderRadius: '12px',
              padding: '12px 20px',
              textAlign: 'right',
            }}
          >
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>
              Outstanding Balance
            </p>
            <p
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#fbbf24',
                margin: 0,
              }}
            >
              0 CZK
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {/* Total Paid */}
          <div
            style={{
              background: '#040d1f',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '14px',
              padding: '20px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: '#22c55e',
                borderRadius: '14px 14px 0 0',
              }}
            />
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(34,197,94,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                marginBottom: '12px',
              }}
            >
              ✅
            </div>
            <p style={{ fontSize: '13px', color: '#6b7a9e', margin: '0 0 6px 0' }}>
              Total Paid
            </p>
            <p
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#22c55e',
                margin: 0,
              }}
            >
              0 CZK
            </p>
          </div>

          {/* Outstanding */}
          <div
            style={{
              background: '#040d1f',
              border: '1px solid rgba(251,191,36,0.2)',
              borderRadius: '14px',
              padding: '20px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: '#fbbf24',
                borderRadius: '14px 14px 0 0',
              }}
            />
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(251,191,36,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                marginBottom: '12px',
              }}
            >
              ⏳
            </div>
            <p style={{ fontSize: '13px', color: '#6b7a9e', margin: '0 0 6px 0' }}>
              Outstanding
            </p>
            <p
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#fbbf24',
                margin: 0,
              }}
            >
              0 CZK
            </p>
          </div>

          {/* Overdue */}
          <div
            style={{
              background: '#040d1f',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '14px',
              padding: '20px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: '#ef4444',
                borderRadius: '14px 14px 0 0',
              }}
            />
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(239,68,68,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                marginBottom: '12px',
              }}
            >
              🚨
            </div>
            <p style={{ fontSize: '13px', color: '#6b7a9e', margin: '0 0 6px 0' }}>
              Overdue
            </p>
            <p
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#ef4444',
                margin: 0,
              }}
            >
              0 CZK
            </p>
          </div>
        </div>

        {/* Invoice Table */}
        <div
          style={{
            background: '#040d1f',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr 140px 110px 130px 200px',
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {['Invoice #', 'Description', 'Amount', 'Status', 'Due Date', 'Actions'].map(
              (col) => (
                <span
                  key={col}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#4a5678',
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                  }}
                >
                  {col}
                </span>
              )
            )}
          </div>

          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: '#8892b0',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧾</div>
            <p style={{ fontSize: '18px', fontWeight: 600, color: '#6b7a9e', margin: '0 0 8px 0' }}>
              No invoices yet
            </p>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Invoices from your agency will appear here.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontSize: '13px',
            color: '#4a5678',
            marginTop: '16px',
            textAlign: 'center',
          }}
        >
          All amounts are in Czech Crowns (CZK) and include VAT. Contact us for payment
          arrangements.
        </p>
      </div>
    </DashboardLayout>
  );
}
