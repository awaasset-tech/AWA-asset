import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  {
    label: 'Asset Class',
    children: [
      { label: 'Equity', to: '/assets/equity', children: [
        { label: 'PMS', to: '/assets/equity/pms' },
        { label: 'RIA', to: '/assets/equity/ria' },
        { label: "ETF's", to: '/assets/equity/etfs' },
        { label: 'Mutual Funds', to: '/assets/equity/mutual-funds' },
        { label: 'Stocks', to: '/assets/equity/stocks' },
      ]},
      { label: 'Debt', to: '/assets/debt', children: [
        { label: 'Fixed Deposit', to: '/assets/debt/fixed-deposit' },
        { label: 'Bonds', to: '/assets/debt/bonds' },
        { label: 'Debt MF', to: '/assets/debt/debtmf' },
      ]},
      { label: 'Real Estate', to: '/assets/real-estate', children: [
        { label: 'REITs', to: '/assets/real-estate/reits' },
        { label: 'Physical Real Estate', to: '/assets/real-estate/physical' },
      ]},
      { label: 'Commodity', to: '/assets/commodity', children: [
        { label: 'Gold', to: '/assets/commodity/gold' },
        { label: 'Silver', to: '/assets/commodity/silver' },
        { label: 'Other Commodities', to: '/assets/commodity/other' },
      ]},
      { label: 'Country Specific Asset', to: '/assets/country-specific', children: [
        { label: 'Nasdaq 100 - US', to: '/assets/country-specific/nasdaq100' },
        { label: 'S&P 500 - US', to: '/assets/country-specific/sp500' },
        { label: 'Hangseng - HK', to: '/assets/country-specific/hangseng' },
      ]},
      { label: 'Crypto Currency', to: '/assets/crypto', children: [
        { label: 'Bitcoin', to: '/assets/crypto/bitcoin' },
        { label: 'Ethereum', to: '/assets/crypto/ethereum' },
      ]},
    ],
  },
  {
    label: 'Other Products',
    children: [
      { label: 'Loans', to: '/products/loans' },
      { label: 'Insurance', to: '/products/insurance' },
    ],
  },
  {
    label: 'Advice & guidance',
    children: [
      { label: 'Wealth Planning', to: '/advice/wealth-planning' },
      { label: 'Retirement Planning', to: '/advice/retirement-planning' },
      { label: 'Risk Planning', to: '/advice/risk-planning' },
      { label: 'Tax Planning', to: '/advice/tax-planning' },
      { label: 'Estate Planning', to: '/advice/estate-planning' },
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
  {
    label: 'Resources',
    children: [
      { label: 'Financial Literacy', to: '/resources/financial-literacy' },
      { label: 'Financial News', to: '/resources/financial-news' },
    ],
  },
];

// Desktop: row with right-arrow flyout panel
function FlyoutItem({ child, onClose }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', fontSize: 14, color: open ? '#c8973a' : '#0a1628', background: open ? '#f8f5f0' : 'none', cursor: 'default', transition: 'background 0.15s, color 0.15s' }}>
        {child.label}
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" style={{ flexShrink: 0, marginLeft: 12 }}>
          <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {open && (
        <div style={{ position: 'absolute', top: 0, left: '100%', background: '#fff', border: '1px solid #ddd8d0', borderRadius: 8, boxShadow: '0 12px 40px rgba(10,22,40,0.15)', minWidth: 200, padding: '8px 0', zIndex: 400 }}>
          {child.children.map(sub => (
            <Link key={sub.to} to={sub.to} onClick={onClose}
              style={{ display: 'block', padding: '10px 20px', fontSize: 14, color: '#0a1628', textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f8f5f0'; e.currentTarget.style.color = '#c8973a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#0a1628'; }}
            >{sub.label}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Mobile: accordion child — expands sub-items inline if they exist
function MobileChild({ child }) {
  const [open, setOpen] = useState(false);
  if (!child.children) {
    return (
      <Link to={child.to}
        style={{ display: 'block', padding: '12px 22px 12px 36px', fontSize: 14, color: '#4a5568', textDecoration: 'none', borderBottom: '1px solid #ede9e3', fontFamily: 'DM Sans, sans-serif' }}
        onMouseEnter={e => e.currentTarget.style.color = '#c8973a'}
        onMouseLeave={e => e.currentTarget.style.color = '#4a5568'}
      >→ {child.label}</Link>
    );
  }
  return (
    <div>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: open ? '#edeae5' : '#faf7f3', border: 'none', borderBottom: '1px solid #ede9e3', padding: '12px 22px 12px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 600, color: open ? '#c8973a' : '#4a5568', textAlign: 'left' }}
      >
        {child.label}
        <svg width="8" height="5" viewBox="0 0 10 6" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{ maxHeight: open ? 400 : 0, overflow: 'hidden', transition: 'max-height 0.25s ease', background: '#f5f2ee' }}>
        {child.children.map(sub => (
          <Link key={sub.to} to={sub.to}
            style={{ display: 'block', padding: '10px 22px 10px 52px', fontSize: 13, color: '#6b7280', textDecoration: 'none', borderBottom: '1px solid #e8e4de', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c8973a'}
            onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
          >› {sub.label}</Link>
        ))}
      </div>
    </div>
  );
}

function HamburgerIcon({ open }) {
  return (
    <div style={{ width: 24, height: 18, position: 'relative' }}>
      {[0, 8, 16].map((top, i) => (
        <span key={i} style={{
          display: 'block', position: 'absolute', height: 2,
          background: '#0a1628', borderRadius: 2, top, left: 0, right: 0,
          transformOrigin: 'center', transition: 'all 0.25s ease',
          width: open && i === 1 ? 0 : '100%',
          opacity: open && i === 1 ? 0 : 1,
          transform: open
            ? i === 0 ? 'translateY(9px) rotate(45deg)'
            : i === 2 ? 'translateY(-9px) rotate(-45deg)' : 'none'
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

  useEffect(() => { setMobileOpen(false); setMobileExpanded(null); setActiveMenu(null); }, [location]);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    function handleClick(e) { if (navRef.current && !navRef.current.contains(e.target)) setActiveMenu(null); }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header style={{ background: '#fff', borderBottom: '1px solid #ddd8d0', position: 'sticky', top: 0, zIndex: 200, boxShadow: '0 2px 16px rgba(10,22,40,0.07)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 66 }} ref={navRef}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: isMobile ? 22.5 : 27, fontWeight: 700, color: '#0a1628', letterSpacing: '-0.3px', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                AWA <span style={{ color: '#c8973a' }}>Asset</span>
              </span>
              <p style={{ color: '#6b7280', fontSize: isMobile ? 10.5 : 12, margin: 0, fontWeight: 500, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
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
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 500, color: activeMenu === item.label ? '#c8973a' : '#0a1628', padding: '8px 11px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s', whiteSpace: 'nowrap' }}>
                    {item.label}
                    <svg width="9" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: activeMenu === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {activeMenu === item.label && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ddd8d0', borderRadius: 8, boxShadow: '0 12px 40px rgba(10,22,40,0.15)', minWidth: 220, padding: '8px 0', zIndex: 300 }}
                      onMouseEnter={() => setActiveMenu(item.label)}
                      onMouseLeave={() => setActiveMenu(null)}
                    >
                      {item.children.map(child => (
                        child.children
                          ? <FlyoutItem key={child.to} child={child} onClose={() => setActiveMenu(null)} />
                          : <Link key={child.to} to={child.to} onClick={() => setActiveMenu(null)}
                              style={{ display: 'block', padding: '10px 20px', fontSize: 14, color: '#0a1628', fontWeight: 400, textDecoration: 'none', transition: 'background 0.15s, color 0.15s' }}
                              onMouseEnter={e => { e.currentTarget.style.background = '#f8f5f0'; e.currentTarget.style.color = '#c8973a'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#0a1628'; }}
                            >{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          )}

          {/* Desktop CTAs */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
              <Link to="/login" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#0a1628', padding: '7px 15px', border: '1.5px solid #0a1628', borderRadius: 4, textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
              >Log in</Link>
              <Link to="/open-account" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, color: '#fff', padding: '8px 15px', background: '#c8973a', borderRadius: 4, textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0a1628'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
              >Open account</Link>
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setMobileOpen(o => !o)} style={{ background: 'none', border: 'none', padding: '4px 2px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} aria-label="Toggle menu">
                <HamburgerIcon open={mobileOpen} />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobile && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 190, background: 'rgba(10,22,40,0.45)', opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none', transition: 'opacity 0.3s ease' }} />
          <div style={{ position: 'fixed', top: 66, right: 0, bottom: 0, width: 'min(300px, 85vw)', background: '#fff', zIndex: 195, overflowY: 'auto', transform: mobileOpen ? 'translateX(0)' : 'translateX(105%)', transition: 'transform 0.3s ease', boxShadow: '-8px 0 32px rgba(10,22,40,0.18)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              {navItems.map(item => (
                <div key={item.label} style={{ borderBottom: '1px solid #f0ece6' }}>
                  <button onClick={() => setMobileExpanded(e => e === item.label ? null : item.label)} style={{ width: '100%', background: 'none', border: 'none', padding: '16px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600, color: mobileExpanded === item.label ? '#c8973a' : '#0a1628', textAlign: 'left' }}>
                    {item.label}
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.22s', flexShrink: 0 }}>
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div style={{ maxHeight: mobileExpanded === item.label ? 1000 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease', background: '#faf7f3' }}>
                    {item.children.map(child => (
                      <MobileChild key={child.to} child={child} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '20px 22px', borderTop: '1px solid #ddd8d0', background: '#f8f5f0' }}>
              <Link to="/open-account" style={{ display: 'block', background: '#c8973a', color: '#fff', padding: '14px', borderRadius: 6, fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 15, textAlign: 'center', textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#0a1628'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
              >Open an account</Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}