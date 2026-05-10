'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 3 },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
];

const invoices = [
  {
    number: 'INV-2024-001',
    description: 'E-shop Redesign — Phase 1',
    amount: '22,500 CZK',
    amountRaw: 22500,
    status: 'Paid',
    due: '15 Feb 2024',
  },
  {
    number: 'INV-2024-002',
    description: 'Brand Identity Package',
    amount: '28,000 CZK',
    amountRaw: 28000,
    status: 'Paid',
    due: '1 Mar 2024',
  },
  {
    number: 'INV-2024-003',
    description: 'SEO Strategy — Monthly Retainer',
    amount: '12,000 CZK',
    amountRaw: 12000,
    status: 'Paid',
    due: '1 Apr 2024',
  },
  {
    number: 'INV-2024-004',
    description: 'E-shop Redesign — Phase 2',
    amount: '22,500 CZK',
    amountRaw: 22500,
    status: 'Paid',
    due: '30 Apr 2024',
  },
  {
    number: 'INV-2024-005',
    description: 'AI Automation Setup — Kickoff',
    amount: '12,000 CZK',
    amountRaw: 12000,
    status: 'Pending',
    due: '31 May 2024',
  },
];

const statusBadge: Record<string, { bg: string; color: string; label: string }> = {
  Paid: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e', label: 'Paid' },
  Pending: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24', label: 'Pending' },
  Overdue: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444', label: 'Overdue' },
};

export function InvoicesPageInner() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredDownload, setHoveredDownload] = useState<number | null>(null);
  const [hoveredPay, setHoveredPay] = useState<number | null>(null);

  return (
    <DashboardLayout
      nav={clientNav}
      role="client"
      userName="Martin Novák"
      userInitial="M"
    >
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
              12,000 CZK
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
              157,000 CZK
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
              12,000 CZK
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

          {/* Table Rows */}
          {invoices.map((inv, i) => {
            const badge = statusBadge[inv.status];
            const isHovered = hoveredRow === i;
            return (
              <div
                key={inv.number}
                onMouseEnter={() => setHoveredRow(i)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr 140px 110px 130px 200px',
                  padding: '16px 20px',
                  borderBottom:
                    i < invoices.length - 1
                      ? '1px solid rgba(255,255,255,0.04)'
                      : 'none',
                  background: isHovered
                    ? 'rgba(0,71,255,0.04)'
                    : 'transparent',
                  transition: 'background 0.2s ease',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#4d8aff',
                    fontFamily: 'monospace',
                  }}
                >
                  {inv.number}
                </span>
                <span style={{ fontSize: '14px', color: '#c8d4f0' }}>
                  {inv.description}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#f0f4ff',
                  }}
                >
                  {inv.amount}
                </span>
                <span>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: badge.bg,
                      color: badge.color,
                    }}
                  >
                    {badge.label}
                  </span>
                </span>
                <span style={{ fontSize: '13px', color: '#6b7a9e' }}>
                  {inv.due}
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    onMouseEnter={() => setHoveredDownload(i)}
                    onMouseLeave={() => setHoveredDownload(null)}
                    style={{
                      padding: '6px 12px',
                      background:
                        hoveredDownload === i
                          ? '#0047FF'
                          : 'rgba(0,71,255,0.15)',
                      border: '1px solid rgba(0,71,255,0.35)',
                      borderRadius: '7px',
                      color: hoveredDownload === i ? '#fff' : '#4d8aff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ⬇ Download PDF
                  </button>
                  {(inv.status === 'Pending' || inv.status === 'Overdue') && (
                    <button
                      onMouseEnter={() => setHoveredPay(i)}
                      onMouseLeave={() => setHoveredPay(null)}
                      style={{
                        padding: '6px 14px',
                        background:
                          hoveredPay === i
                            ? '#16a34a'
                            : 'rgba(34,197,94,0.15)',
                        border: '1px solid rgba(34,197,94,0.35)',
                        borderRadius: '7px',
                        color: hoveredPay === i ? '#fff' : '#22c55e',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
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
