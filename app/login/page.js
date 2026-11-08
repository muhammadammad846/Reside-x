'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock credentials for demo
  const mockUsers = [
    { email: 'guest@residex.com', password: 'guest123', role: 'guest' },
    { email: 'host@residex.com', password: 'host123', role: 'host' },
    { email: 'admin@residex.com', password: 'admin123', role: 'admin' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    await new Promise(r => setTimeout(r, 1200));

    const user = mockUsers.find(u => u.email === form.email && u.password === form.password);
    if (user) {
      localStorage.setItem('residex_user', JSON.stringify(user));
      if (user.role === 'guest') router.push('/guest/dashboard');
      else if (user.role === 'host') router.push('/host/dashboard');
      else router.push('/admin/dashboard');
    } else {
      setError('Invalid email or password. Try the demo credentials below.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#080810', display: 'grid',
      gridTemplateColumns: '1fr 1fr', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Left: Image Panel */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80"
          alt="Luxury property"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(8,8,16,0.5), rgba(8,8,16,0.2))' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 48 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
              <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#080810', fontSize: 18 }}>R</div>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#fff' }}>ResideX</span>
            </div>
          </Link>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>
            Welcome<br />Back
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, maxWidth: 320, lineHeight: 1.7 }}>
            Sign in to access your personalized dashboard and continue your luxury journey.
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 60px', background: '#080810' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Sign In</h1>
            <p style={{ color: '#6b7280', fontSize: 14 }}>Access your ResideX account</p>
          </div>

          {/* Demo hints */}
          <div className="glass-card" style={{ padding: '14px 18px', marginBottom: 28, borderColor: 'rgba(212,175,55,0.3)' }}>
            <p style={{ color: '#D4AF37', fontSize: 12, fontWeight: 700, marginBottom: 8, letterSpacing: '0.05em' }}>🔑 DEMO CREDENTIALS</p>
            {[
              { role: 'Guest', email: 'guest@residex.com', pass: 'guest123' },
              { role: 'Host', email: 'host@residex.com', pass: 'host123' },
              { role: 'Admin', email: 'admin@residex.com', pass: 'admin123' },
            ].map(c => (
              <div key={c.role} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span className="badge badge-gold" style={{ fontSize: 10 }}>{c.role}</span>
                <span style={{ color: '#9ca3af', fontSize: 11 }}>{c.email} / {c.pass}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Email Address</label>
              <input
                type="email"
                className="input-dark"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Password</label>
              <input
                type="password"
                className="input-dark"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 28 }}>
              <a href="#" style={{ color: '#D4AF37', fontSize: 13, textDecoration: 'none' }}>Forgot password?</a>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '12px 16px', marginBottom: 20 }}>
                <p style={{ color: '#f87171', fontSize: 13 }}>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="btn-gold"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', opacity: loading ? 0.8 : 1 }}>
              {loading ? '⏳ Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 28, color: '#6b7280', fontSize: 14 }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 600 }}>
              Create one free
            </Link>
          </p>

          <Link href="/" style={{ display: 'block', textAlign: 'center', marginTop: 16, color: '#4b5563', fontSize: 13, textDecoration: 'none' }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
