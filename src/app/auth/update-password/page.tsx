'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';
import { establishSessionFromUrlHash } from '@/lib/auth-hash';

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const syncSession = (session: { user: unknown } | null) => {
      if (!active) return;
      setHasSession(Boolean(session));
      setChecking(false);
    };

    ;(async () => {
      try {
        await establishSessionFromUrlHash(supabase)
      } catch {
        if (active) {
          setError('This link is invalid or has expired.')
          setChecking(false)
        }
        return
      }

      const { data } = await supabase.auth.getSession()
      if (!active) return
      syncSession(data.session)
    })()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      syncSession(session);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Image src="/digiwolf-icon-transparent.png" alt="DigiWolf" width={64} height={64} style={{ objectFit: 'contain' }} />
          </Link>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f0f4ff', textAlign: 'center', margin: '0 0 8px' }}>Set your password</h1>
        <p style={{ fontSize: 14, color: '#64748b', textAlign: 'center', margin: '0 0 32px' }}>Choose a password to access your dashboard</p>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#f87171', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {checking ? (
          <p style={{ color: '#64748b', textAlign: 'center' }}>Loading…</p>
        ) : !hasSession ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              This link is invalid or has expired. Please ask your contact at Digi Wolf to resend your invite.
            </p>
            <Link href="/login" style={{ color: '#0047FF', fontWeight: 600, textDecoration: 'none' }}>
              Go to login →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#94a3b8', marginBottom: 6 }}>New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '12px 16px', background: '#0a1020', border: '1.5px solid #1e2a45', borderRadius: 10, color: '#f0f4ff', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#94a3b8', marginBottom: 6 }}>Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '12px 16px', background: '#0a1020', border: '1.5px solid #1e2a45', borderRadius: 10, color: '#f0f4ff', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '14px', background: loading ? '#1e2a45' : 'linear-gradient(135deg, #0047FF, #0066ff)', border: 'none', borderRadius: 10, color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Saving…' : 'Save password & continue →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
