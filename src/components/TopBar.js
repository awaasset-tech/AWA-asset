import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const topLinks = [
  { label: 'Personal investors', to: '/personal' },
  { label: 'Financial professionals', to: '/professionals' },
  { label: 'Institutional investors', to: '/institutional' },
];

export default function TopBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isMobile) return null; // hide entirely on small screens

  return (
    <div style={{
      background: '#0a1628',
      padding: '6px 20px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: '20px',
      flexWrap: 'wrap',
    }}>
      {topLinks.map(l => (
        <Link key={l.to} to={l.to} style={{
          color: '#9aaec4',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.2px',
          transition: 'color 0.2s',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => e.target.style.color = '#e5b55a'}
          onMouseLeave={e => e.target.style.color = '#9aaec4'}
        >
          {l.label}
        </Link>
      ))}
    </div>
  );
}
