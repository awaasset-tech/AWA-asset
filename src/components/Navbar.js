import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    label: 'Asset Class',
    children: [
      { label: 'Equity as Asset', to: '/assets/equity' },
      { label: 'Debt as Asset', to: '/assets/debt' },
      { label: 'Real Estate as Asset', to: '/assets/real-estate' },
      { label: 'Commodity as Asset', to: '/assets/commodity' },
      { label: 'Country Specific Asset', to: '/assets/country-specific' },
      { label: 'Crypto Currency as Asset', to: '/assets/crypto' },
    ],
  },
  {
    label: 'Investment products',
    children: [
      { label: 'Mutual funds', to: '/products/mutual-funds' },
      { label: 'ETFs', to: '/products/etfs' },
      { label: 'Stocks', to: '/products/stocks' },
      { label: 'Bonds', to: '/products/bonds' },
      { label: 'CDs', to: '/products/cds' },
      { label: 'Money market funds', to: '/products/money-markets' },
    ],
  },
  {
    label: 'Advice & guidance',
    children: [
      { label: 'Compare services', to: '/advice' },
      { label: 'Digital advisor', to: '/advice/digital' },
      { label: 'Personal advisor', to: '/advice/personal' },
      { label: 'Wealth management', to: '/advice/wealth' },
    ],
  },
  {
    label: 'About AWA Asset',
    children: [
      { label: 'Why choose AWA Asset', to: '/about' },
      { label: 'Our principles', to: '/about/principles' },
      { label: 'News & research', to: '/about/news' },
      { label: 'Careers', to: '/about/careers' },
    ],
  },
];

function HamburgerIcon({ open }) {
  return (
    <div style={{ width: 24, height: 18, position: 'relative' }}>
      {[0, 8, 16].map((top, i) => (
        <span key={i} style={{
          display: 'block',
          position: 'absolute',
          height: 2,
          background: '#0a1628',
          borderRadius: 2,
          top,
          left: 0,
          right: 0,
          transformOrigin: 'center',
          transition: 'all 0.25s ease',
          width: open && i === 1 ? 0 : '100%',
          opacity: open && i === 1 ? 0 : 1,
          transform: open
            ? i === 0 ? 'translateY(9px) rotate(45deg)'
            : i === 2 ? 'translateY(-9px) rotate(-45deg)'
            : 'none'
            : 'none',
        }} />
      ))}
    </div>
  );
}

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const navRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
    setActiveMenu(null);
  }, [location]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header style={{
        background: '#fff',
        borderBottom: '1px solid #ddd8d0',
        position: 'sticky',
        top: 0,
        zIndex: 200,
        boxShadow: '0 2px 16px rgba(10,22,40,0.07)',
      }}>
        <div style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 66,
        }} ref={navRef}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <img src="/logo.jpeg" alt="AWA Asset" style={{ height: isMobile ? 40 : 50, width: 'auto', display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: isMobile ? 15 : 18,
                fontWeight: 700,
                color: '#0a1628',
                letterSpacing: '-0.3px',
                whiteSpace: 'nowrap',
                lineHeight: 1.2,
              }}>
                AWA <span style={{ color: '#c8973a' }}>Asset</span>
              </span>
              <p style={{
                color: '#6b7280',
                fontSize: isMobile ? 7 : 8,
                margin: 0,
                fontWeight: 500,
                fontStyle: 'italic',
                whiteSpace: 'nowrap',
              }}>
                Built on Principles.
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {navItems.map((item) => (
                <div key={item.label} style={{ position: 'relative' }}
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setTimeout(() => setActiveMenu(p => p === item.label ? null : p), 100)}
                >
                  <button style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
                    color: activeMenu === item.label ? '#c8973a' : '#0a1628',
                    padding: '8px 11px', borderRadius: 4,
                    display: 'flex', alignItems: 'center', gap: 4,
                    transition: 'color 0.2s', whiteSpace: 'nowrap',
                  }}>
                    {item.label}
                    <svg width="9" height="6" viewBox="0 0 10 6" fill="none" style={{
                      transform: activeMenu === item.label ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s', flexShrink: 0,
                    }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {activeMenu === item.label && (
                    <div style={{
                      position: 'absolute', top: '100%', left: 0,
                      background: '#fff', border: '1px solid #ddd8d0',
                      borderRadius: 8, boxShadow: '0 12px 40px rgba(10,22,40,0.15)',
                      minWidth: 210, padding: '8px 0',
                      animation: 'fadeUp 0.15s ease', zIndex: 300,
                    }}
                      onMouseEnter={() => setActiveMenu(item.label)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      {item.children.map(child => (
                        <Link key={child.to} to={child.to} onClick={() => setActiveMenu(null)}
                          style={{ display: 'block', padding: '10px 20px', fontSize: 14, color: '#0a1628', fontWeight: 400, textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#f8f5f0'; e.currentTarget.style.color = '#c8973a'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#0a1628'; }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link to="/resources" style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500,
                color: '#0a1628', padding: '8px 11px', borderRadius: 4,
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#c8973a'}
                onMouseLeave={e => e.currentTarget.style.color = '#0a1628'}
              >
                Resources
              </Link>
            </nav>
          )}

          {/* Desktop CTAs */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <a href="https://awa-backend.onrender.com/partner_enrollment_final.html" style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                color: '#c8973a', padding: '7px 15px',
                border: '1.5px solid #c8973a', borderRadius: 4,
                textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#c8973a'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c8973a'; }}
              >
                Add Partner
              </a>
              <Link to="/login" style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                color: '#0a1628', padding: '7px 15px',
                border: '1.5px solid #0a1628', borderRadius: 4,
                textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
              >
                Log in
              </Link>
              <Link to="/open-account" style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600,
                color: '#fff', padding: '8px 15px',
                background: '#c8973a', borderRadius: 4,
                textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#0a1628'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
              >
                Open account
              </Link>
            </div>
          )}

          {/* Mobile: Log in + Hamburger */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href="https://awa-backend.onrender.com/partner_enrollment_final.html" style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 600,
                color: '#c8973a', padding: '6px 10px',
                border: '1.5px solid #c8973a', borderRadius: 4,
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}>
                Add Partner
              </a>
              <button
                onClick={() => setMobileOpen(o => !o)}
                style={{ background: 'none', border: 'none', padding: '4px 2px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                aria-label="Toggle menu"
              >
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          )}

        </div>
      </header>

      {/* Mobile drawer */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 190,
              background: 'rgba(10,22,40,0.45)',
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? 'auto' : 'none',
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Slide-in panel */}
          <div style={{
            position: 'fixed',
            top: 66, right: 0, bottom: 0,
            width: 'min(300px, 85vw)',
            background: '#fff',
            zIndex: 195,
            overflowY: 'auto',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(105%)',
            transition: 'transform 0.3s ease',
            boxShadow: '-8px 0 32px rgba(10,22,40,0.18)',
            display: 'flex',
            flexDirection: 'column',
          }}>

            <div style={{ flex: 1 }}>
              {navItems.map(item => (
                <div key={item.label} style={{ borderBottom: '1px solid #f0ece6' }}>
                  <button
                    onClick={() => setMobileExpanded(e => e === item.label ? null : item.label)}
                    style={{
                      width: '100%', background: 'none', border: 'none',
                      padding: '16px 22px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      cursor: 'pointer',
                      fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
                      color: mobileExpanded === item.label ? '#c8973a' : '#0a1628',
                      textAlign: 'left',
                    }}
                  >
                    {item.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{
                      transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.22s', flexShrink: 0,
                    }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <div style={{
                    maxHeight: mobileExpanded === item.label ? 500 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease',
                    background: '#faf7f3',
                  }}>
                    {item.children.map(child => (
                      <Link key={child.to} to={child.to}
                        style={{
                          display: 'block', padding: '12px 22px 12px 36px',
                          fontSize: 14, color: '#4a5568',
                          textDecoration: 'none',
                          borderBottom: '1px solid #ede9e3',
                          fontFamily: 'DM Sans, sans-serif',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#c8973a'}
                        onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
                      >
                        → {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <Link to="/resources"
                style={{
                  display: 'block', padding: '16px 22px',
                  fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
                  color: '#0a1628', textDecoration: 'none',
                  borderBottom: '1px solid #f0ece6',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#c8973a'}
                onMouseLeave={e => e.currentTarget.style.color = '#0a1628'}
              >
                Resources & education
              </Link>
            </div>

            {/* Bottom CTA */}
            <div style={{ padding: '20px 22px', borderTop: '1px solid #ddd8d0', background: '#f8f5f0' }}>
              <Link to="/open-account" style={{
                display: 'block',
                background: '#c8973a', color: '#fff',
                padding: '14px', borderRadius: 6,
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700, fontSize: 15,
                textAlign: 'center', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#0a1628'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
              >
                Open an account
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}