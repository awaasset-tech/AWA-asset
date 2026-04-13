import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    headline: 'Grow your wealth with confidence',
    sub: 'AWA Asset offers low-cost funds, smart tools, and trusted advice so your money works as hard as you do.',
    cta: 'Open an account',
    ctaTo: '/open-account',
    cta2: 'Explore funds',
    cta2To: '/products/mutual-funds',
    bg: 'linear-gradient(135deg, #0a1628 0%, #1d3461 55%, #2a4a7f 100%)',
    accent: '#e5b55a',
    tag: 'Get started',
  },
  {
    headline: 'Advice from a true partner',
    sub: 'Our advisory services are here to help at every step — from your first investment all the way through retirement.',
    cta: 'Compare services',
    ctaTo: '/advice',
    cta2: 'Learn more',
    cta2To: '/about',
    bg: 'linear-gradient(135deg, #112240 0%, #0e3b2f 55%, #155742 100%)',
    accent: '#6fcf97',
    tag: 'Advisory services',
  },
  {
    headline: 'Your investing costs just got lower',
    sub: 'Our latest expense ratio reductions are delivering real savings to investors — because every basis point matters.',
    cta: 'See our funds',
    ctaTo: '/products/mutual-funds',
    cta2: 'Why AWA Asset?',
    cta2To: '/about',
    bg: 'linear-gradient(135deg, #1a1428 0%, #2d1f4a 55%, #3d2d6b 100%)',
    accent: '#bb86fc',
    tag: 'New savings',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
      setAnimKey(k => k + 1);
    }, 5500);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (i) => {
    setCurrent(i);
    setAnimKey(k => k + 1);
  };

  const slide = slides[current];

  return (
    <section style={{
      position: 'relative',
      minHeight: 480,
      background: slide.bg,
      transition: 'background 0.8s ease',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(ellipse at 80% 50%, ${slide.accent}18 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: -60, top: -60,
        width: 400, height: 400,
        borderRadius: '50%',
        border: `1px solid ${slide.accent}22`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 60, top: 60,
        width: 260, height: 260,
        borderRadius: '50%',
        border: `1px solid ${slide.accent}15`,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, padding: '80px 32px' }}>
        <div style={{ maxWidth: 620 }}>
          {/* Tag */}
          <div key={`tag-${animKey}`} style={{
            display: 'inline-block',
            background: `${slide.accent}22`,
            color: slide.accent,
            borderRadius: 20,
            padding: '4px 14px',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            marginBottom: 20,
            animation: 'fadeUp 0.5s ease both',
          }}>
            {slide.tag}
          </div>

          <h1 key={`h1-${animKey}`} style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '3rem',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.15,
            marginBottom: 20,
            animation: 'fadeUp 0.5s 0.1s ease both',
          }}>
            {slide.headline}
          </h1>

          <p key={`p-${animKey}`} style={{
            color: '#b0c4d8',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            marginBottom: 36,
            animation: 'fadeUp 0.5s 0.2s ease both',
          }}>
            {slide.sub}
          </p>

          <div key={`btns-${animKey}`} style={{
            display: 'flex', gap: 14, flexWrap: 'wrap',
            animation: 'fadeUp 0.5s 0.3s ease both',
          }}>
            <Link to={slide.ctaTo} style={{
              background: slide.accent,
              color: '#fff',
              padding: '13px 28px',
              borderRadius: 4,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: 15,
              transition: 'opacity 0.2s, transform 0.15s',
              textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {slide.cta}
            </Link>
            <Link to={slide.cta2To} style={{
              background: 'transparent',
              color: '#fff',
              padding: '12px 26px',
              borderRadius: 4,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: 15,
              border: '1.5px solid rgba(255,255,255,0.4)',
              transition: 'border-color 0.2s, background 0.2s',
              textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {slide.cta2}
            </Link>
            <a href="https://awa-backend.onrender.com/partner_enrollment_final.html" style={{
              background: 'transparent',
              color: '#c8973a',
              padding: '12px 26px',
              borderRadius: 4,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: 15,
              border: '1.5px solid #c8973a',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c8973a'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c8973a'; }}
            >
              Add Partner
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicators + pause */}
      <div style={{
        position: 'absolute',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? 28 : 8,
            height: 8,
            borderRadius: 4,
            background: i === current ? slide.accent : 'rgba(255,255,255,0.35)',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            transition: 'all 0.3s ease',
          }} />
        ))}
        <button onClick={() => setPaused(p => !p)} style={{
          marginLeft: 6,
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          color: '#fff',
          width: 28,
          height: 28,
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: 11,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {paused ? '▶' : '⏸'}
        </button>
      </div>
    </section>
  );
}