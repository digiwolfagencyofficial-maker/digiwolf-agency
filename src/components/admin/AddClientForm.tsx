'use client';

import { useEffect, useState } from 'react';

type Service = { id: string; name: string; slug: string };

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#040d1f',
  border: '1px solid #1e293b',
  borderRadius: '10px',
  padding: '11px 14px',
  color: '#F1F5F9',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  color: '#94A3B8',
  marginBottom: '6px',
};

export default function AddClientForm({ onClose, onSuccess }: Props) {
  const [services, setServices] = useState<Service[]>([]);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/onboard');
        if (!res.ok) throw new Error('Failed to load services');
        const data = await res.json();
        if (active) setServices((data.services ?? []) as Service[]);
      } catch {
        if (active) setServicesError('Could not load services. Please refresh.');
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !fullName.trim() || !serviceId) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, full_name: fullName, service_id: serviceId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Something went wrong (${res.status}).`);
      }
      setDone(true);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: '#00000088', zIndex: 60 }}
      />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(440px, calc(100vw - 32px))',
          maxHeight: 'calc(100vh - 48px)',
          overflowY: 'auto',
          background: '#040d1f',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          zIndex: 70,
          padding: '28px',
          boxShadow: '0 24px 64px #00000088',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', color: '#0047FF', textTransform: 'uppercase', marginBottom: '6px' }}>
              Onboarding
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#F8FAFC', margin: 0 }}>Add Client</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#0a1628', border: '1px solid #1e293b', borderRadius: '8px', width: '32px', height: '32px', color: '#64748B', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✕
          </button>
        </div>

        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC', marginBottom: '8px' }}>
              Invite sent
            </div>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: 1.6, margin: '0 0 20px' }}>
              We&apos;ve emailed <strong style={{ color: '#CBD5E1' }}>{email}</strong> a link to set their
              password and access their dashboard.
            </p>
            <button
              onClick={onClose}
              style={{ background: '#0047FF', color: '#fff', border: 'none', borderRadius: '10px', padding: '11px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '10px 14px', marginBottom: '16px', fontSize: '13px', color: '#f87171' }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
                style={inputStyle}
                required
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Client email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@company.com"
                style={inputStyle}
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Service</label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                style={{ ...inputStyle, cursor: 'pointer' }}
                required
              >
                <option value="" disabled>
                  {servicesError ? 'Unavailable' : 'Select a service…'}
                </option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              {servicesError && (
                <div style={{ fontSize: '12px', color: '#f87171', marginTop: '6px' }}>{servicesError}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: '100%',
                background: submitting ? '#1e2a45' : 'linear-gradient(135deg, #0047FF, #0066ff)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '13px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: submitting ? 'not-allowed' : 'pointer',
              }}
            >
              {submitting ? 'Creating client…' : 'Create client & send invite →'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
