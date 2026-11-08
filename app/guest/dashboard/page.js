'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const allProperties = [
  { id: 1, title: 'Azure Ocean Villa', location: 'Maldives', price: 850, rating: 4.9, reviews: 128, beds: 4, baths: 3, guests: 8, type: 'Villa', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', host: 'Marcus L.', available: true },
  { id: 2, title: 'Mountain Serenity Chalet', location: 'Swiss Alps', price: 620, rating: 4.8, reviews: 94, beds: 3, baths: 2, guests: 6, type: 'Chalet', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', host: 'Elena K.', available: true },
  { id: 3, title: 'Skyline Penthouse Suite', location: 'Dubai, UAE', price: 1200, rating: 5.0, reviews: 67, beds: 5, baths: 4, guests: 10, type: 'Penthouse', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', host: 'Ahmed R.', available: false },
  { id: 4, title: 'Tuscan Countryside Estate', location: 'Florence, Italy', price: 480, rating: 4.7, reviews: 152, beds: 6, baths: 5, guests: 12, type: 'Estate', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80', host: 'Sofia M.', available: true },
  { id: 5, title: 'Coastal Cliffside Retreat', location: 'Santorini, Greece', price: 740, rating: 4.9, reviews: 211, beds: 3, baths: 3, guests: 6, type: 'Villa', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', host: 'Nikos P.', available: true },
  { id: 6, title: 'Rainforest Eco Bungalow', location: 'Bali, Indonesia', price: 320, rating: 4.6, reviews: 89, beds: 2, baths: 2, guests: 4, type: 'Bungalow', image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=600&q=80', host: 'Ayu W.', available: true },
];

const bookings = [
  { id: 'BK-001', property: 'Azure Ocean Villa', dates: 'Dec 14 – Dec 20, 2025', status: 'Confirmed', total: 5100 },
  { id: 'BK-002', property: 'Tuscan Countryside Estate', dates: 'Jan 5 – Jan 10, 2026', status: 'Pending', total: 2400 },
];

export default function GuestDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1500);
  const [bookingModal, setBookingModal] = useState(null);
  const [bookingForm, setBookingForm] = useState({ checkin: '', checkout: '', guests: 1 });
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('residex_user');
    if (!u) { router.push('/login'); return; }
    const parsed = JSON.parse(u);
    if (parsed.role !== 'guest') { router.push('/login'); return; }
    setUser(parsed);
  }, []);

  const filtered = allProperties.filter(p =>
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())) &&
    (filterType === 'All' || p.type === filterType) &&
    p.price <= maxPrice
  );

  const handleBook = () => {
    setBooked(true);
    setTimeout(() => { setBookingModal(null); setBooked(false); }, 2000);
  };

  const NavItem = ({ id, icon, label }) => (
    <button className={`sidebar-link ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span>{label}</span>
    </button>
  );

  if (!user) return (
    <div style={{ minHeight: '100vh', background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#D4AF37', fontSize: 18 }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#080810', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

      {/* ─── SIDEBAR ─── */}
      <aside style={{ width: 240, background: '#0f0f1c', borderRight: '1px solid rgba(212,175,55,0.1)', display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'fixed', top: 0, left: 0, bottom: 0 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, padding: '0 8px' }}>
            <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#080810', fontSize: 16 }}>R</div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>ResideX</span>
          </div>
        </Link>

        {/* User info */}
        <div style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, padding: '16px', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080810', fontSize: 15 }}>
              {user.name ? user.name[0].toUpperCase() : 'G'}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{user.name || 'Guest User'}</div>
              <span className="badge badge-gold" style={{ fontSize: 10 }}>🏖️ Guest</span>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NavItem id="browse" icon="🔍" label="Browse Properties" />
          <NavItem id="bookings" icon="📋" label="My Bookings" />
          <NavItem id="favorites" icon="❤️" label="Saved Properties" />
          <NavItem id="profile" icon="👤" label="My Profile" />
        </nav>

        <button onClick={() => { localStorage.removeItem('residex_user'); router.push('/'); }}
          className="sidebar-link" style={{ marginTop: 16, color: '#ef4444', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
          <span style={{ fontSize: 18 }}>🚪</span>
          <span>Sign Out</span>
        </button>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main style={{ marginLeft: 240, flex: 1, padding: '32px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
              {activeTab === 'browse' && '🔍 Browse Properties'}
              {activeTab === 'bookings' && '📋 My Bookings'}
              {activeTab === 'favorites' && '❤️ Saved Properties'}
              {activeTab === 'profile' && '👤 My Profile'}
            </h1>
            <p style={{ color: '#6b7280', fontSize: 14 }}>Welcome back, {user.name || 'Guest'}!</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#D4AF37', fontSize: 13, fontWeight: 600 }}>ResideX Guest Portal</span>
          </div>
        </div>

        {/* ── BROWSE TAB ── */}
        {activeTab === 'browse' && (
          <>
            {/* Filters */}
            <div className="glass-card" style={{ padding: '20px 24px', marginBottom: 28, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                className="input-dark"
                placeholder="🔍  Search by name or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 2, minWidth: 200 }}
              />
              <select
                className="input-dark"
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                style={{ flex: 1, minWidth: 140 }}>
                {['All', 'Villa', 'Penthouse', 'Chalet', 'Estate', 'Bungalow'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: '#9ca3af', fontSize: 12 }}>Max Price</span>
                  <span style={{ color: '#D4AF37', fontSize: 12, fontWeight: 700 }}>${maxPrice}/night</span>
                </div>
                <input type="range" min={100} max={1500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#D4AF37' }} />
              </div>
            </div>

            <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 20 }}>Showing {filtered.length} properties</p>

            {/* Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {filtered.map(p => (
                <div key={p.id} className="property-card glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <div className="card-image" style={{ height: 190, position: 'relative' }}>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(8,8,16,0.85)', borderRadius: 8, padding: '4px 10px' }}>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>${p.price}</span>
                      <span style={{ color: '#9ca3af', fontSize: 11 }}>/night</span>
                    </div>
                    <div style={{ position: 'absolute', top: 10, left: 10 }}>
                      <span className={`badge ${p.available ? 'badge-green' : 'badge-red'}`} style={{ fontSize: 10 }}>
                        {p.available ? '✓ Available' : '✗ Booked'}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '18px' }}>
                    <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.title}</h3>
                    <p style={{ color: '#9ca3af', fontSize: 12, marginBottom: 10 }}>📍 {p.location} · Host: {p.host}</p>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                      <span style={{ color: '#9ca3af', fontSize: 11 }}>🛏 {p.beds}</span>
                      <span style={{ color: '#9ca3af', fontSize: 11 }}>🚿 {p.baths}</span>
                      <span style={{ color: '#9ca3af', fontSize: 11 }}>👥 {p.guests}</span>
                      <span style={{ color: '#D4AF37', fontSize: 11, marginLeft: 'auto' }}>★ {p.rating} ({p.reviews})</span>
                    </div>
                    <button
                      onClick={() => p.available && setBookingModal(p)}
                      className={p.available ? 'btn-gold' : ''}
                      disabled={!p.available}
                      style={{
                        width: '100%', justifyContent: 'center', fontSize: 13, padding: '10px',
                        background: p.available ? undefined : 'rgba(21,21,37,0.8)',
                        color: p.available ? undefined : '#6b7280',
                        border: p.available ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8, cursor: p.available ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                      {p.available ? 'Book This Property →' : 'Currently Unavailable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── BOOKINGS TAB ── */}
        {activeTab === 'bookings' && (
          <div>
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <table className="dark-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Property</th>
                    <th>Dates</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td style={{ color: '#D4AF37', fontWeight: 700 }}>{b.id}</td>
                      <td style={{ color: '#fff' }}>{b.property}</td>
                      <td>{b.dates}</td>
                      <td style={{ color: '#D4AF37', fontWeight: 700 }}>${b.total.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${b.status === 'Confirmed' ? 'badge-green' : 'badge-gold'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <button style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>Cancel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── FAVORITES TAB ── */}
        {activeTab === 'favorites' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {allProperties.slice(0, 3).map(p => (
              <div key={p.id} className="property-card glass-card" style={{ borderRadius: 16, overflow: 'hidden' }}>
                <div className="card-image" style={{ height: 180 }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.title}</h3>
                  <p style={{ color: '#9ca3af', fontSize: 12, marginBottom: 10 }}>📍 {p.location}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#D4AF37', fontWeight: 700 }}>${p.price}/night</span>
                    <button onClick={() => setBookingModal(p)} className="btn-gold" style={{ fontSize: 12, padding: '7px 14px' }}>Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: 520 }}>
            <div className="glass-card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080810', fontSize: 28 }}>
                  {user.name ? user.name[0].toUpperCase() : 'G'}
                </div>
                <div>
                  <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>{user.name || 'Guest User'}</h2>
                  <p style={{ color: '#9ca3af', fontSize: 13 }}>{user.email}</p>
                  <span className="badge badge-gold" style={{ marginTop: 4 }}>🏖️ Guest</span>
                </div>
              </div>
              {[
                { label: 'Full Name', val: user.name || 'Guest User' },
                { label: 'Email', val: user.email || 'guest@residex.com' },
                { label: 'Member Since', val: 'October 2025' },
                { label: 'Total Bookings', val: '2' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#9ca3af', fontSize: 13 }}>{item.label}</span>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{item.val}</span>
                </div>
              ))}
              <button className="btn-gold" style={{ marginTop: 24, width: '100%', justifyContent: 'center' }}>Edit Profile</button>
            </div>
          </div>
        )}
      </main>

      {/* ─── BOOKING MODAL ─── */}
      {bookingModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setBookingModal(null)}>
          <div className="glass-card" style={{ maxWidth: 480, width: '100%', padding: '36px' }}>
            {booked ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
                <h2 style={{ color: '#D4AF37', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Booking Confirmed!</h2>
                <p style={{ color: '#9ca3af' }}>Your reservation at {bookingModal.title} has been submitted.</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                  <div>
                    <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 20, marginBottom: 4 }}>Book Property</h2>
                    <p style={{ color: '#D4AF37', fontSize: 14, fontWeight: 600 }}>{bookingModal.title}</p>
                    <p style={{ color: '#9ca3af', fontSize: 13 }}>📍 {bookingModal.location}</p>
                  </div>
                  <button onClick={() => setBookingModal(null)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#9ca3af', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 16 }}>✕</button>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Check In</label>
                  <input type="date" className="input-dark" value={bookingForm.checkin} onChange={e => setBookingForm({ ...bookingForm, checkin: e.target.value })} style={{ colorScheme: 'dark' }} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Check Out</label>
                  <input type="date" className="input-dark" value={bookingForm.checkout} onChange={e => setBookingForm({ ...bookingForm, checkout: e.target.value })} style={{ colorScheme: 'dark' }} />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Number of Guests</label>
                  <input type="number" className="input-dark" min={1} max={bookingModal.guests} value={bookingForm.guests} onChange={e => setBookingForm({ ...bookingForm, guests: e.target.value })} />
                </div>
                <div className="stat-card" style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#9ca3af', fontSize: 14 }}>${bookingModal.price} × 5 nights</span>
                  <span style={{ color: '#D4AF37', fontWeight: 800, fontSize: 16 }}>${bookingModal.price * 5}</span>
                </div>
                <button onClick={handleBook} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 15 }}>
                  Confirm Booking →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
