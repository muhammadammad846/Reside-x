'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const properties = [
  {
    id: 1,
    title: 'Azure Ocean Villa',
    location: 'Maldives, South Atoll',
    price: 850,
    rating: 4.9,
    reviews: 128,
    type: 'Villa',
    beds: 4,
    baths: 3,
    guests: 8,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    tag: 'Featured',
  },
  {
    id: 2,
    title: 'Mountain Serenity Chalet',
    location: 'Swiss Alps, Switzerland',
    price: 620,
    rating: 4.8,
    reviews: 94,
    type: 'Chalet',
    beds: 3,
    baths: 2,
    guests: 6,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    tag: 'Popular',
  },
  {
    id: 3,
    title: 'Skyline Penthouse Suite',
    location: 'Dubai, UAE',
    price: 1200,
    rating: 5.0,
    reviews: 67,
    type: 'Penthouse',
    beds: 5,
    baths: 4,
    guests: 10,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tag: 'Luxury',
  },
  {
    id: 4,
    title: 'Tuscan Countryside Estate',
    location: 'Florence, Italy',
    price: 480,
    rating: 4.7,
    reviews: 152,
    type: 'Estate',
    beds: 6,
    baths: 5,
    guests: 12,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    tag: 'New',
  },
  {
    id: 5,
    title: 'Coastal Cliffside Retreat',
    location: 'Santorini, Greece',
    price: 740,
    rating: 4.9,
    reviews: 211,
    type: 'Villa',
    beds: 3,
    baths: 3,
    guests: 6,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    tag: 'Featured',
  },
  {
    id: 6,
    title: 'Rainforest Eco Bungalow',
    location: 'Bali, Indonesia',
    price: 320,
    rating: 4.6,
    reviews: 89,
    type: 'Bungalow',
    beds: 2,
    baths: 2,
    guests: 4,
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80',
    tag: 'Trending',
  },
];

const stats = [
  { value: '10,000+', label: 'Properties Listed' },
  { value: '50+', label: 'Countries' },
  { value: '200K+', label: 'Happy Guests' },
  { value: '4.9★', label: 'Average Rating' },
];

const features = [
  {
    icon: '🔍',
    title: 'Smart Search',
    desc: 'Find your perfect stay with intelligent filters for location, dates, budget, and property type.',
  },
  {
    icon: '🛡️',
    title: 'Verified Hosts',
    desc: 'Every host is background-checked and verified. Book with complete confidence and peace of mind.',
  },
  {
    icon: '💳',
    title: 'Secure Payments',
    desc: 'End-to-end encrypted payments with instant confirmation and full refund protection.',
  },
  {
    icon: '🌟',
    title: 'Premium Quality',
    desc: 'Curated selection of luxury properties meeting our strict quality and comfort standards.',
  },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Frequent Traveler',
    avatar: 'SM',
    text: 'ResideX completely transformed how I travel. Booked a stunning villa in Santorini with zero stress. The platform is elegant and the properties are beyond imagination.',
    rating: 5,
  },
  {
    name: 'James Khoury',
    role: 'Business Executive',
    avatar: 'JK',
    text: 'As someone who travels for work monthly, I needed reliability. ResideX delivers every single time. The host communication is seamless and properties are exactly as shown.',
    rating: 5,
  },
  {
    name: 'Amara Osei',
    role: 'Interior Designer',
    avatar: 'AO',
    text: 'The curation on this platform is impeccable. Every property feels like it was designed for people who truly appreciate beauty. My Bali trip was unforgettable.',
    rating: 5,
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [searchData, setSearchData] = useState({ location: '', checkin: '', checkout: '', guests: '' });
  const [activeFilter, setActiveFilter] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filters = ['All', 'Villa', 'Penthouse', 'Chalet', 'Estate', 'Bungalow'];
  const filtered = activeFilter === 'All' ? properties : properties.filter(p => p.type === activeFilter);

  return (
    <div style={{ background: '#080810', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.3s',
        background: scrolled ? 'rgba(8,8,16,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.1)' : 'none',
        padding: '0 5%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '72px',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 38, height: 38, background: 'linear-gradient(135deg, #D4AF37, #f5d98a)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 18, color: '#080810',
            }}>R</div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#fff' }}>
              Reside<span className="gold-text">X</span>
            </span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {['Properties', 'How It Works', 'About', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="nav-link"
              style={{ color: '#d1d5db', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/login">
            <button className="btn-outline" style={{ padding: '9px 22px', fontSize: 14 }}>Sign In</button>
          </Link>
          <Link href="/register">
            <button className="btn-gold" style={{ padding: '9px 22px', fontSize: 14 }}>Get Started</button>
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1600&q=80"
          alt="Luxury Villa"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0 }} />

        <div style={{
          position: 'relative', zIndex: 2, height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 20px', paddingTop: '80px',
        }}>
          <div className="fade-in-up" style={{ marginBottom: 16 }}>
            <span className="badge badge-gold" style={{ fontSize: 11, letterSpacing: '0.15em' }}>
              ✦ PREMIUM RENTALS WORLDWIDE
            </span>
          </div>

          <h1 className="fade-in-up delay-100" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(40px, 7vw, 88px)',
            fontWeight: 700, color: '#fff', lineHeight: 1.1,
            marginBottom: 20, maxWidth: 900,
          }}>
            Discover Your
            <span className="gold-text"> Perfect</span>
            <br />Luxury Escape
          </h1>

          <p className="fade-in-up delay-200" style={{
            fontSize: 18, color: 'rgba(255,255,255,0.75)',
            maxWidth: 560, lineHeight: 1.7, marginBottom: 48,
          }}>
            Curated collection of premium villas, penthouses & retreats in the world's most breathtaking destinations.
          </p>

          {/* Search Box */}
          <div className="fade-in-up delay-300 glass-card" style={{
            display: 'flex', gap: 0, padding: '8px', borderRadius: 16,
            width: '100%', maxWidth: 860, flexWrap: 'wrap',
          }}>
            {[
              { label: '📍 Location', key: 'location', placeholder: 'Where to?', type: 'text' },
              { label: '📅 Check In', key: 'checkin', placeholder: '', type: 'date' },
              { label: '📅 Check Out', key: 'checkout', placeholder: '', type: 'date' },
              { label: '👥 Guests', key: 'guests', placeholder: 'How many?', type: 'number' },
            ].map((field, i) => (
              <div key={field.key} style={{ flex: 1, minWidth: 160, padding: '0 12px', borderRight: i < 3 ? '1px solid rgba(212,175,55,0.15)' : 'none' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#D4AF37', marginBottom: 4, letterSpacing: '0.05em' }}>
                  {field.label}
                </div>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={searchData[field.key]}
                  onChange={e => setSearchData({ ...searchData, [field.key]: e.target.value })}
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    color: '#fff', fontSize: 14, width: '100%', padding: '4px 0',
                    colorScheme: 'dark',
                  }}
                />
              </div>
            ))}
            <button className="btn-gold" style={{ borderRadius: 10, whiteSpace: 'nowrap', margin: '4px' }}>
              🔍 Search
            </button>
          </div>

          <div className="fade-in-up delay-400" style={{ marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['Maldives', 'Dubai', 'Santorini', 'Bali', 'Swiss Alps'].map(loc => (
              <button key={loc} onClick={() => setSearchData({ ...searchData, location: loc })}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '6px 16px', color: '#d1d5db', fontSize: 13, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => { e.target.style.borderColor = '#D4AF37'; e.target.style.color = '#D4AF37'; }}
                onMouseOut={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.color = '#d1d5db'; }}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <div style={{ width: 24, height: 40, border: '2px solid rgba(212,175,55,0.4)', borderRadius: 12, margin: '0 auto 8px', display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 3, height: 8, background: '#D4AF37', borderRadius: 2, animation: 'float 1.5s ease-in-out infinite' }} />
          </div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, letterSpacing: '0.15em' }}>SCROLL</span>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ background: '#0f0f1c', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '48px 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 1000, margin: '0 auto' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: '#D4AF37' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROPERTIES ─── */}
      <section id="properties" style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>✦ DISCOVER</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              Featured <span className="gold-text">Properties</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Handpicked luxury stays that define what exceptional hospitality looks like.
            </p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)}
                style={{
                  padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  background: activeFilter === f ? 'linear-gradient(135deg, #D4AF37, #f5d98a)' : 'rgba(21,21,37,0.8)',
                  color: activeFilter === f ? '#080810' : '#9ca3af',
                  border: activeFilter === f ? 'none' : '1px solid rgba(212,175,55,0.2)',
                }}>
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {filtered.map((p, idx) => (
              <div key={p.id} className="property-card glass-card" style={{ borderRadius: 16, overflow: 'hidden', animationDelay: `${idx * 0.1}s` }}>
                <div className="card-image" style={{ height: 220, position: 'relative' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12 }}>
                    <span className="badge badge-gold" style={{ fontSize: 11 }}>{p.tag}</span>
                  </div>
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(8,8,16,0.8)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '4px 10px' }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>${p.price}</span>
                    <span style={{ color: '#9ca3af', fontSize: 12 }}>/night</span>
                  </div>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,16,0.6) 0%, transparent 60%)' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{p.title}</h3>
                      <p style={{ color: '#9ca3af', fontSize: 13 }}>📍 {p.location}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#D4AF37', fontWeight: 700, fontSize: 14 }}>★ {p.rating}</div>
                      <div style={{ color: '#6b7280', fontSize: 12 }}>{p.reviews} reviews</div>
                    </div>
                  </div>
                  <div style={{ height: '1px', background: 'rgba(212,175,55,0.1)', margin: '14px 0' }} />
                  <div style={{ display: 'flex', gap: 16 }}>
                    {[
                      { icon: '🛏', val: `${p.beds} Beds` },
                      { icon: '🚿', val: `${p.baths} Baths` },
                      { icon: '👥', val: `${p.guests} Guests` },
                    ].map(item => (
                      <span key={item.val} style={{ color: '#9ca3af', fontSize: 12 }}>{item.icon} {item.val}</span>
                    ))}
                  </div>
                  <Link href="/login">
                    <button className="btn-gold" style={{ width: '100%', marginTop: 16, justifyContent: 'center', fontSize: 14 }}>
                      Book Now →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{ background: '#0f0f1c', padding: '100px 5%', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 70 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>✦ PROCESS</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: '#fff' }}>
              How <span className="gold-text">ResideX</span> Works
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, position: 'relative' }}>
            {[
              { step: '01', title: 'Search & Discover', desc: 'Use our smart search to browse thousands of curated luxury properties. Filter by location, dates, budget, and property type.', icon: '🔍' },
              { step: '02', title: 'Book & Confirm', desc: 'Select your perfect stay, choose your dates, and book instantly with our secure, encrypted payment system.', icon: '📋' },
              { step: '03', title: 'Stay & Enjoy', desc: 'Arrive to a verified, premium property with 24/7 support. Experience luxury travel at its finest.', icon: '🌟' },
            ].map((item, i) => (
              <div key={item.step} className="glass-card" style={{ padding: '40px 32px', textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: 70, height: 70, background: 'rgba(212,175,55,0.1)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28,
                  border: '1px solid rgba(212,175,55,0.25)',
                }}>
                  {item.icon}
                </div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: 'rgba(212,175,55,0.1)', position: 'absolute', top: 20, right: 24 }}>
                  {item.step}
                </div>
                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', lineHeight: 1.7, fontSize: 14 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <p className="section-label" style={{ marginBottom: 16 }}>✦ WHY CHOOSE US</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
              The <span className="gold-text">Premium</span><br />Standard in Rentals
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
              We set the bar higher — because your travel experience deserves nothing less than extraordinary. Every detail is curated to ensure you enjoy a seamless, luxurious stay.
            </p>
            <Link href="/register">
              <button className="btn-gold">Start Exploring →</button>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {features.map(f => (
              <div key={f.title} className="glass-card" style={{ padding: '28px 24px', transition: 'all 0.3s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ background: '#0f0f1c', padding: '100px 5%', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p className="section-label" style={{ marginBottom: 12 }}>✦ TESTIMONIALS</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: '#fff' }}>
              What Our <span className="gold-text">Guests Say</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {testimonials.map(t => (
              <div key={t.name} className="glass-card" style={{ padding: '32px', transition: 'all 0.3s' }}
                onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'; }}>
                <div style={{ color: '#D4AF37', fontSize: 20, marginBottom: 16 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.8, marginBottom: 24, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #D4AF37, #f5d98a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#080810', fontSize: 14,
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ color: '#9ca3af', fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '100px 5%' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div className="glass-card" style={{ padding: '80px 60px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, left: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
            <div style={{ position: 'absolute', bottom: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
            <p className="section-label" style={{ marginBottom: 16 }}>✦ GET STARTED TODAY</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 44, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
              Ready to Find Your<br /><span className="gold-text">Dream Getaway?</span>
            </h2>
            <p style={{ color: '#9ca3af', fontSize: 16, marginBottom: 40 }}>
              Join over 200,000 travelers who trust ResideX for their luxury stays.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/register">
                <button className="btn-gold" style={{ fontSize: 16, padding: '14px 36px' }}>Create Free Account →</button>
              </Link>
              <Link href="/login">
                <button className="btn-outline" style={{ fontSize: 16, padding: '14px 36px' }}>Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#0f0f1c', borderTop: '1px solid rgba(212,175,55,0.1)', padding: '60px 5% 30px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #D4AF37, #f5d98a)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#080810', fontSize: 16 }}>R</div>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#fff' }}>ResideX</span>
              </div>
              <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.8, maxWidth: 280 }}>
                The world's most curated luxury rental platform. Connecting discerning travelers with exceptional properties since 2024.
              </p>
            </div>
            {[
              { title: 'Platform', links: ['Search Properties', 'List Property', 'Become a Host', 'Pricing'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
              { title: 'Support', links: ['Help Center', 'Safety', 'Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: '#D4AF37', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</h4>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', color: '#6b7280', fontSize: 13, marginBottom: 10, textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseOver={e => e.target.style.color = '#D4AF37'}
                    onMouseOut={e => e.target.style.color = '#6b7280'}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <hr className="gold-divider" style={{ opacity: 0.3 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 24, flexWrap: 'wrap', gap: 12 }}>
            <p style={{ color: '#4b5563', fontSize: 13 }}>© 2025 ResideX. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['🐦 Twitter', '📸 Instagram', '💼 LinkedIn'].map(s => (
                <a key={s} href="#" style={{ color: '#4b5563', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseOver={e => e.target.style.color = '#D4AF37'}
                  onMouseOut={e => e.target.style.color = '#4b5563'}>
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
