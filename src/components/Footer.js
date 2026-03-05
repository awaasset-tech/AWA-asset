import React from 'react';
import { Link } from 'react-router-dom';

const footerCols = [
  {
    heading: 'Accounts & plans',
    links: [
      { label: 'Individual accounts', to: '/accounts/individual' },
      { label: 'Retirement (IRA)', to: '/accounts/ira' },
      { label: 'Education savings', to: '/accounts/529' },
      { label: 'Cash Plus account', to: '/accounts/cash-plus' },
    ],
  },
  {
    heading: 'Investment products',
    links: [
      { label: 'Mutual funds', to: '/products/mutual-funds' },
      { label: 'ETFs', to: '/products/etfs' },
      { label: 'Stocks & bonds', to: '/products/stocks' },
      { label: 'Money markets', to: '/products/money-markets' },
    ],
  },
  {
    heading: 'Advice & guidance',
    links: [
      { label: 'Advisory services', to: '/advice' },
      { label: 'Digital advisor', to: '/advice/digital' },
      { label: 'Personal advisor', to: '/advice/personal' },
      { label: 'Wealth management', to: '/advice/wealth' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Investor education', to: '/resources' },
      { label: 'Market summary', to: '/resources/market' },
      { label: 'Tax information', to: '/resources/taxes' },
      { label: 'News & research', to: '/about/news' },
    ],
  },
  {
    heading: 'About AWA-asset',
    links: [
      { label: 'Why choose AWA-asset', to: '/about' },
      { label: 'Our principles', to: '/about/principles' },
      { label: 'Careers', to: '/about/careers' },
      { label: 'Contact us', to: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0a1628', color: '#9aaec4', marginTop: 0 }}>
      {/* CTA Banner */}
      <div style={{
        background: '#112240',
        padding: '52px 32px',
        textAlign: 'center',
        borderBottom: '1px solid #1d3461',
      }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          color: '#fff',
          fontSize: '2rem',
          marginBottom: 16,
        }}>
          Start investing in your goals today
        </h2>
        <p style={{ color: '#9aaec4', marginBottom: 28, fontSize: 15 }}>
          Join thousands of investors who trust AWA-asset to grow their wealth.
        </p>
        <Link to="/open-account" style={{
          display: 'inline-block',
          background: '#c8973a',
          color: '#fff',
          padding: '13px 32px',
          borderRadius: 4,
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 700,
          fontSize: 15,
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#e5b55a'}
          onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
        >
          Open an account
        </Link>
      </div>

      {/* Links grid */}
      <div className="container" style={{ padding: '52px 32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '32px 24px',
          marginBottom: 48,
        }}>
          {footerCols.map(col => (
            <div key={col.heading}>
              <div style={{
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                color: '#e5b55a',
                marginBottom: 14,
              }}>
                {col.heading}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                {col.links.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} style={{
                      color: '#9aaec4',
                      fontSize: 13,
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                      onMouseLeave={e => e.currentTarget.style.color = '#9aaec4'}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #1d3461',
          paddingTop: 28,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 20,
        }}>
          <div>
            <div style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 20,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 8,
            }}>
              AWA-asset <span style={{ color: '#c8973a' }}>Finance</span>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.6, maxWidth: 420, color: '#6b7c93' }}>
              India's Leading Multi-Asset Firm. We educate, guide, and empower our clients
              toward lasting financial stability — for this generation and all generations to come.
              All investing is subject to risk.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
            {['Privacy policy', 'Terms of use', 'Disclosures', 'Accessibility'].map(l => (
              <Link key={l} to="/legal" style={{
                color: '#6b7c93',
                fontSize: 12,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#6b7c93'}
              >
                {l}
              </Link>
            ))}
          </div>
          <p style={{ width: '100%', fontSize: 11, color: '#4a5568', marginTop: 8 }}>
            © {new Date().getFullYear()} AWA-asset Finance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
