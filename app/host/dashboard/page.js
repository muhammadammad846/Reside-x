'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const initialProperties = [
  { id: 1, title: 'Lakeview Luxury Villa', location: 'Lake Como, Italy', price: 680, status: 'Active', bookings: 14, rating: 4.9, beds: 4, baths: 3, guests: 8, type: 'Villa', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80', earnings: 9520 },
  { id: 2, title: 'Desert Oasis Retreat', location: 'Dubai, UAE', price: 920, status: 'Active', bookings: 8, rating: 4.7, beds: 5, baths: 4, guests: 10, type: 'Villa', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80', earnings: 7360 },
  { id: 3, title: 'Cliffside Ocean Bungalow', location: 'Bali, Indonesia', price: 380, status: 'Paused', bookings: 5, rating: 4.6, beds: 2, baths: 2, guests: 4, type: 'Bungalow', image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&q=80', earnings: 1900 },
];

export default function HostDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState(initialProperties);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editModal, setEditModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newProp, setNewProp] = useState({ title: '', location: '', price: '', beds: '', baths: '', guests: '', type: 'Villa', image: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('residex_user');
    if (!u) { router.push('/login'); return; }
    const parsed = JSON.parse(u);
    if (parsed.role !== 'host') { router.push('/login'); return; }
    setUser(parsed);
  }, []);

  const handleAdd = () => {
    if (!newProp.title || !newProp.location || !newProp.price) { alert('Please fill all required fields.'); return; }
    const prop = { ...newProp, id: Date.now(), price: Number(newProp.price), beds: Number(newProp.beds) || 1, baths: Number(newProp.baths) || 1, guests: Number(newProp.guests) || 2, status: 'Active', bookings: 0, rating: 0, earnings: 0, image: newProp.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80' };
    setProperties([...properties, prop]);
    setNewProp({ title: '', location: '', price: '', beds: '', baths: '', guests: '', type: 'Villa', image: '' });
    setShowAddModal(false);
  };

  const handleEdit = () => {
    setProperties(properties.map(p => p.id === editModal.id ? { ...editModal, price: Number(editModal.price) } : p));
    setSaved(true); setTimeout(() => { setSaved(false); setEditModal(null); }, 1500);
  };

  const handleDelete = (id) => { setProperties(properties.filter(p => p.id !== id)); setDeleteConfirm(null); };

  const totalEarnings = properties.reduce((s, p) => s + p.earnings, 0);
  const totalBookings = properties.reduce((s, p) => s + p.bookings, 0);

  const NavItem = ({ id, icon, label }) => (
    <button className={`sidebar-link ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
      <span style={{ fontSize: 18 }}>{icon}</span><span>{label}</span>
    </button>
  );

  if (!user) return <div style={{ minHeight: '100vh', background: '#080810', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ color: '#D4AF37' }}>Loading...</div></div>;

  return (
    <div style={{ minHeight: '100vh', background: '#080810', display: 'flex', fontFamily: 'Inter, sans-serif' }}>

      {/* SIDEBAR */}
      <aside style={{ width: 240, background: '#0f0f1c', borderRight: '1px solid rgba(212,175,55,0.1)', display: 'flex', flexDirection: 'column', padding: '24px 16px', position: 'fixed', top: 0, left: 0, bottom: 0 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, padding: '0 8px' }}>
            <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#080810', fontSize: 16 }}>R</div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>ResideX</span>
          </div>
        </Link>

        <div style={{ background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 12, padding: '16px', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080810', fontSize: 15 }}>
              {user.name ? user.name[0].toUpperCase() : 'H'}
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{user.name || 'Host User'}</div>
              <span className="badge badge-gold" style={{ fontSize: 10 }}>🏡 Host</span>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NavItem id="overview" icon="📊" label="Overview" />
          <NavItem id="properties" icon="🏡" label="My Properties" />
          <NavItem id="bookings" icon="📅" label="Bookings" />
          <NavItem id="earnings" icon="💰" label="Earnings" />
          <NavItem id="profile" icon="👤" label="Profile" />
        </nav>

        <button onClick={() => { localStorage.removeItem('residex_user'); router.push('/'); }}
          className="sidebar-link" style={{ marginTop: 16, color: '#ef4444', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
          <span>🚪</span><span>Sign Out</span>
        </button>
      </aside>

      {/* MAIN */}
      <main style={{ marginLeft: 240, flex: 1, padding: '32px 40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
              {activeTab === 'overview' && '📊 Host Overview'}
              {activeTab === 'properties' && '🏡 My Properties'}
              {activeTab === 'bookings' && '📅 Booking Requests'}
              {activeTab === 'earnings' && '💰 Earnings'}
              {activeTab === 'profile' && '👤 My Profile'}
            </h1>
            <p style={{ color: '#6b7280', fontSize: 14 }}>Manage your properties and grow your hosting business</p>
          </div>
          {activeTab === 'properties' && (
            <button onClick={() => setShowAddModal(true)} className="btn-gold">+ Add Property</button>
          )}
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 36 }}>
              {[
                { label: 'Total Properties', value: properties.length, icon: '🏡', change: '+1 this month' },
                { label: 'Total Bookings', value: totalBookings, icon: '📅', change: '+5 this week' },
                { label: 'Total Earnings', value: `$${totalEarnings.toLocaleString()}`, icon: '💰', change: '+12% vs last month' },
                { label: 'Avg Rating', value: '4.7★', icon: '⭐', change: 'Excellent score' },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#D4AF37', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ color: '#9ca3af', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: '#4ade80', fontSize: 11, fontWeight: 600 }}>{s.change}</div>
                </div>
              ))}
            </div>

            <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Your Properties</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {properties.map(p => (
                <div key={p.id} className="glass-card" style={{ borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ height: 160, overflow: 'hidden' }}>
                    <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.title}</h3>
                      <span className={`badge ${p.status === 'Active' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: 10 }}>{p.status}</span>
                    </div>
                    <p style={{ color: '#9ca3af', fontSize: 12, marginBottom: 12 }}>📍 {p.location}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#D4AF37', fontWeight: 700, fontSize: 14 }}>${p.price}/night</span>
                      <span style={{ color: '#6b7280', fontSize: 12 }}>{p.bookings} bookings</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* PROPERTIES */}
        {activeTab === 'properties' && (
          <div>
            {properties.length === 0 ? (
              <div className="glass-card" style={{ padding: 60, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🏡</div>
                <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>No Properties Yet</h3>
                <p style={{ color: '#9ca3af', marginBottom: 24 }}>Add your first property to start earning.</p>
                <button onClick={() => setShowAddModal(true)} className="btn-gold">+ Add First Property</button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 20 }}>
                {properties.map(p => (
                  <div key={p.id} className="glass-card" style={{ padding: '20px', display: 'flex', gap: 20, alignItems: 'center', borderRadius: 14 }}>
                    <div style={{ width: 110, height: 80, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{p.title}</h3>
                        <span className={`badge ${p.status === 'Active' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: 10 }}>{p.status}</span>
                      </div>
                      <p style={{ color: '#9ca3af', fontSize: 12, marginBottom: 8 }}>📍 {p.location} · 🛏 {p.beds} · 🚿 {p.baths} · 👥 {p.guests}</p>
                      <div style={{ display: 'flex', gap: 20 }}>
                        <span style={{ color: '#D4AF37', fontWeight: 700, fontSize: 14 }}>${p.price}/night</span>
                        <span style={{ color: '#4ade80', fontSize: 13 }}>💰 Earned: ${p.earnings.toLocaleString()}</span>
                        <span style={{ color: '#9ca3af', fontSize: 13 }}>📅 {p.bookings} bookings</span>
                        {p.rating > 0 && <span style={{ color: '#D4AF37', fontSize: 13 }}>★ {p.rating}</span>}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                      <button onClick={() => setEditModal({ ...p })} style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(212,175,55,0.2)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => setDeleteConfirm(p.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}>
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table className="dark-table">
              <thead>
                <tr><th>Guest</th><th>Property</th><th>Dates</th><th>Amount</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
                {[
                  { guest: 'Sarah Mitchell', prop: 'Lakeview Luxury Villa', dates: 'Dec 14–20', amount: 4080, status: 'Confirmed' },
                  { guest: 'James Khoury', prop: 'Desert Oasis Retreat', dates: 'Jan 2–7', amount: 4600, status: 'Pending' },
                  { guest: 'Amara Osei', prop: 'Cliffside Ocean Bungalow', dates: 'Jan 15–18', amount: 1140, status: 'Confirmed' },
                ].map((b, i) => (
                  <tr key={i}>
                    <td style={{ color: '#fff', fontWeight: 600 }}>{b.guest}</td>
                    <td>{b.prop}</td>
                    <td>{b.dates}</td>
                    <td style={{ color: '#D4AF37', fontWeight: 700 }}>${b.amount.toLocaleString()}</td>
                    <td><span className={`badge ${b.status === 'Confirmed' ? 'badge-green' : 'badge-gold'}`}>{b.status}</span></td>
                    <td style={{ display: 'flex', gap: 8 }}>
                      <button style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', borderRadius: 6, padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>Accept</button>
                      <button style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 6, padding: '4px 12px', fontSize: 12, cursor: 'pointer' }}>Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* EARNINGS */}
        {activeTab === 'earnings' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
              {[
                { label: 'Total Earnings', value: `$${totalEarnings.toLocaleString()}`, icon: '💰', color: '#D4AF37' },
                { label: 'This Month', value: '$3,200', icon: '📈', color: '#4ade80' },
                { label: 'Pending Payout', value: '$1,840', icon: '⏳', color: '#60a5fa' },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ color: '#9ca3af', fontSize: 14 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 20 }}>Earnings by Property</h3>
              {properties.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <img src={p.image} style={{ width: 50, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                    <div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                      <div style={{ color: '#9ca3af', fontSize: 12 }}>{p.bookings} bookings</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#D4AF37', fontWeight: 800, fontSize: 18 }}>${p.earnings.toLocaleString()}</div>
                    <div style={{ color: '#9ca3af', fontSize: 11 }}>Total earned</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: 520 }}>
            <div className="glass-card" style={{ padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080810', fontSize: 28 }}>
                  {user.name ? user.name[0].toUpperCase() : 'H'}
                </div>
                <div>
                  <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>{user.name || 'Host User'}</h2>
                  <p style={{ color: '#9ca3af', fontSize: 13 }}>{user.email}</p>
                  <span className="badge badge-gold" style={{ marginTop: 4 }}>🏡 Host</span>
                </div>
              </div>
              {[
                { label: 'Full Name', val: user.name || 'Host User' },
                { label: 'Email', val: user.email || 'host@residex.com' },
                { label: 'Properties Listed', val: properties.length },
                { label: 'Total Earnings', val: `$${totalEarnings.toLocaleString()}` },
                { label: 'Member Since', val: 'October 2025' },
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

      {/* ADD PROPERTY MODAL */}
      {showAddModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowAddModal(false)}>
          <div className="glass-card" style={{ maxWidth: 540, width: '100%', padding: 36, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>+ Add New Property</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#9ca3af', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              {[
                { label: 'Property Title *', key: 'title', type: 'text', placeholder: 'e.g. Sunset Ocean Villa' },
                { label: 'Location *', key: 'location', type: 'text', placeholder: 'e.g. Maldives, South Atoll' },
                { label: 'Price per Night ($) *', key: 'price', type: 'number', placeholder: 'e.g. 500' },
                { label: 'Bedrooms', key: 'beds', type: 'number', placeholder: '1' },
                { label: 'Bathrooms', key: 'baths', type: 'number', placeholder: '1' },
                { label: 'Max Guests', key: 'guests', type: 'number', placeholder: '2' },
                { label: 'Image URL (optional)', key: 'image', type: 'text', placeholder: 'https://...' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{field.label}</label>
                  <input type={field.type} className="input-dark" placeholder={field.placeholder} value={newProp[field.key]} onChange={e => setNewProp({ ...newProp, [field.key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Property Type</label>
                <select className="input-dark" value={newProp.type} onChange={e => setNewProp({ ...newProp, type: e.target.value })}>
                  {['Villa', 'Penthouse', 'Chalet', 'Estate', 'Bungalow', 'Apartment'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              <button onClick={() => setShowAddModal(false)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button onClick={handleAdd} className="btn-gold" style={{ flex: 1, justifyContent: 'center' }}>Add Property ✓</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setEditModal(null)}>
          <div className="glass-card" style={{ maxWidth: 480, width: '100%', padding: 36 }}>
            {saved ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 50, marginBottom: 12 }}>✅</div>
                <h2 style={{ color: '#4ade80', fontWeight: 800 }}>Changes Saved!</h2>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                  <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 22 }}>✏️ Edit Property</h2>
                  <button onClick={() => setEditModal(null)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#9ca3af', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 16 }}>✕</button>
                </div>
                <div style={{ display: 'grid', gap: 16 }}>
                  {[
                    { label: 'Property Title', key: 'title', type: 'text' },
                    { label: 'Location', key: 'location', type: 'text' },
                    { label: 'Price per Night ($)', key: 'price', type: 'number' },
                    { label: 'Bedrooms', key: 'beds', type: 'number' },
                    { label: 'Bathrooms', key: 'baths', type: 'number' },
                    { label: 'Max Guests', key: 'guests', type: 'number' },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={{ display: 'block', color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{field.label}</label>
                      <input type={field.type} className="input-dark" value={editModal[field.key]} onChange={e => setEditModal({ ...editModal, [field.key]: e.target.value })} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: 'block', color: '#9ca3af', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Status</label>
                    <select className="input-dark" value={editModal.status} onChange={e => setEditModal({ ...editModal, status: e.target.value })}>
                      <option>Active</option><option>Paused</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                  <button onClick={() => setEditModal(null)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                  <button onClick={handleEdit} className="btn-gold" style={{ flex: 1, justifyContent: 'center' }}>Save Changes ✓</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleteConfirm(null)}>
          <div className="glass-card" style={{ maxWidth: 400, width: '100%', padding: 36, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🗑️</div>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Delete Property?</h2>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 28 }}>This action cannot be undone. The property will be permanently removed.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Keep It</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ flex: 1, background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', color: '#f87171', borderRadius: 8, padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>🗑️ Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
