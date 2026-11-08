'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const allHosts = [
  { id: 1, name: 'Marcus Leonetti', email: 'marcus@example.com', properties: 3, earnings: 18760, bookings: 27, rating: 4.9, joined: 'Jan 2025', status: 'Active', avatar: 'ML' },
  { id: 2, name: 'Elena Kowalski', email: 'elena@example.com', properties: 2, earnings: 12400, bookings: 18, rating: 4.8, joined: 'Mar 2025', status: 'Active', avatar: 'EK' },
  { id: 3, name: 'Ahmed Rahman', email: 'ahmed@example.com', properties: 4, earnings: 31200, bookings: 42, rating: 4.7, joined: 'Feb 2025', status: 'Active', avatar: 'AR' },
  { id: 4, name: 'Sofia Marini', email: 'sofia@example.com', properties: 1, earnings: 4800, bookings: 10, rating: 4.6, joined: 'May 2025', status: 'Suspended', avatar: 'SM' },
  { id: 5, name: 'Nikos Papadopoulos', email: 'nikos@example.com', properties: 2, earnings: 9600, bookings: 15, rating: 4.9, joined: 'Apr 2025', status: 'Active', avatar: 'NP' },
];

const allGuests = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah@example.com', bookings: 5, spent: 8200, joined: 'Feb 2025', status: 'Active', avatar: 'SM' },
  { id: 2, name: 'James Khoury', email: 'james@example.com', bookings: 8, spent: 14500, joined: 'Jan 2025', status: 'Active', avatar: 'JK' },
  { id: 3, name: 'Amara Osei', email: 'amara@example.com', bookings: 3, spent: 4100, joined: 'Jun 2025', status: 'Active', avatar: 'AO' },
  { id: 4, name: 'Tom Bradley', email: 'tom@example.com', bookings: 1, spent: 850, joined: 'Sep 2025', status: 'Flagged', avatar: 'TB' },
];

const activities = [
  { icon: '🏡', text: 'Marcus Leonetti listed a new property in Dubai', time: '2 min ago', type: 'host' },
  { icon: '📅', text: 'Sarah Mitchell booked "Azure Ocean Villa" for Dec 14-20', time: '15 min ago', type: 'booking' },
  { icon: '⭐', text: 'James Khoury left a 5-star review on "Skyline Penthouse"', time: '1 hour ago', type: 'review' },
  { icon: '🚨', text: 'Tom Bradley flagged for suspicious activity', time: '2 hours ago', type: 'alert' },
  { icon: '💰', text: 'Payout of $4,200 processed to Ahmed Rahman', time: '3 hours ago', type: 'payout' },
  { icon: '👤', text: 'New guest registration: Amara Osei', time: '5 hours ago', type: 'register' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [hosts, setHosts] = useState(allHosts);
  const [guests, setGuests] = useState(allGuests);
  const [deleteModal, setDeleteModal] = useState(null);
  const [searchHosts, setSearchHosts] = useState('');
  const [searchGuests, setSearchGuests] = useState('');

  useEffect(() => {
    const u = localStorage.getItem('residex_user');
    if (!u) { router.push('/login'); return; }
    const parsed = JSON.parse(u);
    if (parsed.role !== 'admin') { router.push('/login'); return; }
    setUser(parsed);
  }, []);

  const handleDeleteHost = (id) => { setHosts(hosts.filter(h => h.id !== id)); setDeleteModal(null); };
  const handleDeleteGuest = (id) => { setGuests(guests.filter(g => g.id !== id)); setDeleteModal(null); };
  const toggleHostStatus = (id) => setHosts(hosts.map(h => h.id === id ? { ...h, status: h.status === 'Active' ? 'Suspended' : 'Active' } : h));

  const filteredHosts = hosts.filter(h => h.name.toLowerCase().includes(searchHosts.toLowerCase()) || h.email.toLowerCase().includes(searchHosts.toLowerCase()));
  const filteredGuests = guests.filter(g => g.name.toLowerCase().includes(searchGuests.toLowerCase()));

  const totalRevenue = hosts.reduce((s, h) => s + h.earnings, 0);
  const totalBookings = hosts.reduce((s, h) => s + h.bookings, 0);
  const totalProperties = hosts.reduce((s, h) => s + h.properties, 0);

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

        <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 12, padding: '16px', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #ef4444, #f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 15 }}>A</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>{user.name || 'Admin'}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 100, fontSize: 10, fontWeight: 600, color: '#f87171' }}>⚙️ Admin</span>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <NavItem id="overview" icon="📊" label="Overview" />
          <NavItem id="hosts" icon="🏡" label="Manage Hosts" />
          <NavItem id="guests" icon="👥" label="Manage Guests" />
          <NavItem id="activity" icon="📋" label="Activity Feed" />
          <NavItem id="reports" icon="📈" label="Reports" />
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
              {activeTab === 'overview' && '📊 Platform Overview'}
              {activeTab === 'hosts' && '🏡 Manage Hosts'}
              {activeTab === 'guests' && '👥 Manage Guests'}
              {activeTab === 'activity' && '📋 Activity Feed'}
              {activeTab === 'reports' && '📈 Platform Reports'}
            </h1>
            <p style={{ color: '#6b7280', fontSize: 14 }}>ResideX Admin Control Panel</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span className="badge badge-red" style={{ fontSize: 11 }}>⚙️ ADMIN ACCESS</span>
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 36 }}>
              {[
                { label: 'Total Hosts', value: hosts.length, icon: '🏡', color: '#D4AF37', sub: `${hosts.filter(h => h.status === 'Active').length} active` },
                { label: 'Total Guests', value: guests.length, icon: '👥', color: '#60a5fa', sub: 'registered users' },
                { label: 'Platform Revenue', value: `$${(totalRevenue * 0.12).toLocaleString()}`, icon: '💰', color: '#4ade80', sub: '12% commission' },
                { label: 'Total Bookings', value: totalBookings, icon: '📅', color: '#a78bfa', sub: 'all time' },
              ].map(s => (
                <div key={s.label} className="stat-card" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 28, opacity: 0.4 }}>{s.icon}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 6 }}>{s.value}</div>
                  <div style={{ color: '#9ca3af', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: '#6b7280', fontSize: 11 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Top Hosts by Earnings</h3>
                {[...hosts].sort((a, b) => b.earnings - a.earnings).slice(0, 4).map((h, i) => (
                  <div key={h.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: i === 0 ? 'linear-gradient(135deg, #D4AF37, #f5d98a)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: i === 0 ? '#080810' : '#9ca3af', flexShrink: 0 }}>
                      {i + 1}
                    </div>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #b8892e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080810', fontSize: 13, flexShrink: 0 }}>{h.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{h.name}</div>
                      <div style={{ color: '#9ca3af', fontSize: 11 }}>{h.properties} properties · {h.bookings} bookings</div>
                    </div>
                    <div style={{ color: '#D4AF37', fontWeight: 800, fontSize: 14 }}>${h.earnings.toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card" style={{ padding: 24 }}>
                <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 20, fontSize: 16 }}>Quick Stats</h3>
                {[
                  { label: 'Total Properties', value: totalProperties, color: '#D4AF37' },
                  { label: 'Active Hosts', value: hosts.filter(h => h.status === 'Active').length, color: '#4ade80' },
                  { label: 'Suspended Hosts', value: hosts.filter(h => h.status === 'Suspended').length, color: '#f87171' },
                  { label: 'Flagged Guests', value: guests.filter(g => g.status === 'Flagged').length, color: '#fb923c' },
                  { label: 'Avg Host Rating', value: (hosts.reduce((s, h) => s + h.rating, 0) / hosts.length).toFixed(1) + '★', color: '#D4AF37' },
                  { label: 'Platform Commission (12%)', value: `$${(totalRevenue * 0.12).toLocaleString()}`, color: '#4ade80' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#9ca3af', fontSize: 13 }}>{item.label}</span>
                    <span style={{ color: item.color, fontWeight: 700, fontSize: 13 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* HOSTS */}
        {activeTab === 'hosts' && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <input className="input-dark" placeholder="🔍 Search hosts by name or email..." value={searchHosts} onChange={e => setSearchHosts(e.target.value)} style={{ maxWidth: 380 }} />
            </div>
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <table className="dark-table">
                <thead>
                  <tr><th>Host</th><th>Properties</th><th>Bookings</th><th>Earnings</th><th>Rating</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filteredHosts.map(h => (
                    <tr key={h.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080810', fontSize: 13, flexShrink: 0 }}>{h.avatar}</div>
                          <div>
                            <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{h.name}</div>
                            <div style={{ color: '#6b7280', fontSize: 11 }}>{h.email}</div>
                          </div>
                        </div>
                      </td>
                      <td><span style={{ color: '#D4AF37', fontWeight: 700 }}>{h.properties}</span></td>
                      <td>{h.bookings}</td>
                      <td style={{ color: '#4ade80', fontWeight: 700 }}>${h.earnings.toLocaleString()}</td>
                      <td style={{ color: '#D4AF37' }}>★ {h.rating}</td>
                      <td><span className={`badge ${h.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{h.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => toggleHostStatus(h.id)}
                            style={{ background: h.status === 'Active' ? 'rgba(251,146,60,0.1)' : 'rgba(34,197,94,0.1)', border: `1px solid ${h.status === 'Active' ? 'rgba(251,146,60,0.3)' : 'rgba(34,197,94,0.3)'}`, color: h.status === 'Active' ? '#fb923c' : '#4ade80', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>
                            {h.status === 'Active' ? '⏸ Suspend' : '▶ Activate'}
                          </button>
                          <button onClick={() => setDeleteModal({ type: 'host', data: h })}
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GUESTS */}
        {activeTab === 'guests' && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <input className="input-dark" placeholder="🔍 Search guests..." value={searchGuests} onChange={e => setSearchGuests(e.target.value)} style={{ maxWidth: 380 }} />
            </div>
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <table className="dark-table">
                <thead>
                  <tr><th>Guest</th><th>Bookings</th><th>Total Spent</th><th>Joined</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filteredGuests.map(g => (
                    <tr key={g.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, #60a5fa, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: 13 }}>{g.avatar}</div>
                          <div>
                            <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>{g.name}</div>
                            <div style={{ color: '#6b7280', fontSize: 11 }}>{g.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{g.bookings}</td>
                      <td style={{ color: '#4ade80', fontWeight: 700 }}>${g.spent.toLocaleString()}</td>
                      <td style={{ color: '#9ca3af' }}>{g.joined}</td>
                      <td><span className={`badge ${g.status === 'Active' ? 'badge-green' : g.status === 'Flagged' ? 'badge-red' : 'badge-gold'}`}>{g.status}</span></td>
                      <td>
                        <button onClick={() => setDeleteModal({ type: 'guest', data: g })}
                          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                          🗑️ Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ACTIVITY */}
        {activeTab === 'activity' && (
          <div className="glass-card" style={{ padding: 24 }}>
            <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 24, fontSize: 16 }}>Live Activity Feed</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {activities.map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: i < activities.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {a.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.6 }}>{a.text}</p>
                    <span style={{ color: '#6b7280', fontSize: 12 }}>{a.time}</span>
                  </div>
                  <span className={`badge ${a.type === 'alert' ? 'badge-red' : a.type === 'booking' ? 'badge-green' : a.type === 'payout' ? 'badge-gold' : 'badge-blue'}`} style={{ fontSize: 10, alignSelf: 'flex-start', flexShrink: 0 }}>
                    {a.type.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REPORTS */}
        {activeTab === 'reports' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 32 }}>
              {[
                { label: 'Monthly Revenue', value: '$14,280', change: '+18%', icon: '📈' },
                { label: 'New Users (This Month)', value: '234', change: '+32%', icon: '👥' },
                { label: 'Properties Added', value: '18', change: '+7%', icon: '🏡' },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: '#D4AF37', marginBottom: 6 }}>{s.value}</div>
                  <div style={{ color: '#9ca3af', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: '#4ade80', fontSize: 12, fontWeight: 700 }}>{s.change} vs last month</div>
                </div>
              ))}
            </div>

            <div className="glass-card" style={{ padding: 28 }}>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: 24 }}>Platform Health Summary</h3>
              {[
                { metric: 'Total Platform Revenue (Gross)', value: `$${totalRevenue.toLocaleString()}` },
                { metric: 'ResideX Commission (12%)', value: `$${(totalRevenue * 0.12).toLocaleString()}` },
                { metric: 'Average Booking Value', value: '$1,240' },
                { metric: 'Host Satisfaction Rate', value: '96%' },
                { metric: 'Guest Satisfaction Rate', value: '94%' },
                { metric: 'Property Availability Rate', value: '78%' },
                { metric: 'Repeat Booking Rate', value: '62%' },
              ].map(item => (
                <div key={item.metric} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#9ca3af', fontSize: 14 }}>{item.metric}</span>
                  <span style={{ color: '#D4AF37', fontWeight: 700, fontSize: 14 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* DELETE CONFIRM MODAL */}
      {deleteModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setDeleteModal(null)}>
          <div className="glass-card" style={{ maxWidth: 400, width: '100%', padding: 36, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Remove {deleteModal.type === 'host' ? 'Host' : 'Guest'}?</h2>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 8 }}>
              <strong style={{ color: '#fff' }}>{deleteModal.data.name}</strong>
            </p>
            <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 28 }}>
              This will permanently remove this {deleteModal.type} and all associated data from the platform.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setDeleteModal(null)} className="btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button
                onClick={() => deleteModal.type === 'host' ? handleDeleteHost(deleteModal.data.id) : handleDeleteGuest(deleteModal.data.id)}
                style={{ flex: 1, background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', color: '#f87171', borderRadius: 8, padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
                🗑️ Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
