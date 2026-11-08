'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: '' });
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      key: 'guest',
      icon: '🏖️',
      title: 'Guest',
      desc: 'Browse and book premium villas, apartments & retreats worldwide.',
      perks: ['Search thousands of properties', 'Instant booking', 'Guest support 24/7'],
    },
    {
      key: 'host',
      icon: '🏡',
      title: 'Host',
      desc: 'List your property and earn income from verified, quality guests.',
      perks: ['Easy property listing', 'Manage bookings', 'Earn on your terms'],
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { alert('Passwords do not match!'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    const user = { name: form.name, email: form.email, role: form.role };
    localStorage.setItem('residex_user', JSON.stringify(user));
    if (form.role === 'guest') router.push('/guest/dashboard');
    else router.push('/host/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080810', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>

      {/* Back to home */}
      <div style={{ position: 'fixed', top: 24, left: 32 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#080810', fontSize: 16 }}>R</div>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#fff' }}>ResideX</span>
        </Link>
      </div>

      <div style={{ width: '100%', maxWidth: 520 }}>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, justifyContent: 'center' }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: step >= s ? 'linear-gradient(135deg, #D4AF37, #f5d98a)' : 'rgba(21,21,37,0.8)',
                border: step >= s ? 'none' : '1px solid rgba(212,175,55,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: step >= s ? '#080810' : '#6b7280',
                transition: 'all 0.3s',
              }}>{s}</div>
              <span style={{ fontSize: 12, color: step >= s ? '#D4AF37' : '#4b5563' }}>
                {s === 1 ? 'Choose Role' : 'Your Details'}
              </span>
              {s < 2 && <div style={{ width: 40, height: 1, background: step > s ? '#D4AF37' : 'rgba(212,175,55,0.2)' }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div>
            <h1 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              Join <span className="gold-text">ResideX</span>
            </h1>
            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: 14, marginBottom: 40 }}>
              I want to join as a...
            </p>
            <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
              {roles.map(role => (
                <div
                  key={role.key}
                  onClick={() => setForm({ ...form, role: role.key })}
                  className="glass-card"
                  style={{
                    padding: '28px 28px', cursor: 'pointer', transition: 'all 0.3s',
                    borderColor: form.role === role.key ? 'rgba(212,175,55,0.7)' : 'rgba(212,175,55,0.15)',
                    background: form.role === role.key ? 'rgba(212,175,55,0.07)' : 'rgba(21,21,37,0.7)',
                    boxShadow: form.role === role.key ? '0 0 30px rgba(212,175,55,0.15)' : 'none',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                    <div style={{ fontSize: 36, lineHeight: 1 }}>{role.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>{role.title}</h3>
                        {form.role === role.key && (
                          <div style={{ width: 22, height: 22, background: '#D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</div>
                        )}
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 12 }}>{role.desc}</p>
                      {role.perks.map(p => (
                        <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ color: '#D4AF37', fontSize: 12 }}>✦</span>
                          <span style={{ color: '#6b7280', fontSize: 12 }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn-gold"
              disabled={!form.role}
              onClick={() => setStep(2)}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15, opacity: form.role ? 1 : 0.4 }}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: Details Form */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: 13, marginBottom: 20 }}>
              ← Back
            </button>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
              Create Account
            </h1>
            <p style={{ color: '#6b7280', fontSize: 14, marginBottom: 32 }}>
              Registering as: <span className="badge badge-gold" style={{ marginLeft: 6 }}>{form.role === 'guest' ? '🏖️ Guest' : '🏡 Host'}</span>
            </p>

            <form onSubmit={handleSubmit}>
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
                { label: 'Password', key: 'password', type: 'password', placeholder: 'Min 8 characters' },
                { label: 'Confirm Password', key: 'confirm', type: 'password', placeholder: 'Repeat password' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{field.label}</label>
                  <input
                    type={field.type}
                    className="input-dark"
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    required
                  />
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 28 }}>
                <input type="checkbox" id="terms" required style={{ marginTop: 3, accentColor: '#D4AF37' }} />
                <label htmlFor="terms" style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.5 }}>
                  I agree to ResideX's{' '}
                  <a href="#" style={{ color: '#D4AF37' }}>Terms of Service</a> and{' '}
                  <a href="#" style={{ color: '#D4AF37' }}>Privacy Policy</a>
                </label>
              </div>

              <button type="submit" className="btn-gold" disabled={loading}
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15, opacity: loading ? 0.8 : 1 }}>
                {loading ? '⏳ Creating account...' : '🎉 Create My Account'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: 24, color: '#6b7280', fontSize: 14 }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#D4AF37', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
