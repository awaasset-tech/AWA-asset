import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: '📈',
    title: 'Income Stability',
    desc: 'Bonds pay regular interest, giving you a steady stream of income over time. Having an additional source of income can be especially helpful in retirement.',
  },
  {
    icon: '🥧',
    title: 'Portfolio Diversification',
    desc: 'Getting broad exposure to bonds and other asset types can help balance your portfolio and reduce your overall risk.',
  },
  {
    icon: '⚖️',
    title: 'Risk Mitigation',
    desc: 'Investing in bonds can offset the risk of stocks. Bond rates and stock prices typically move in opposite directions — having bonds can balance the risks of stocks in your portfolio.',
  },
  {
    icon: '🧾',
    title: 'Tax Advantages',
    desc: 'Some bonds offer tax-free income. Depending on the issuer, bonds can generate federal and state tax-exempt earnings.',
  },
];

const bondTypes = [
  {
    title: 'Government Bonds',
    desc: 'Issued by national governments, these are considered the safest bonds. In India, these include RBI bonds, sovereign gold bonds, and treasury bills.',
    tag: 'Low Risk',
    tagColor: '#00b050',
  },
  {
    title: 'Private / Corporate Bonds',
    desc: 'Issued by companies to raise capital. They typically offer higher yields than government bonds to compensate for higher credit risk.',
    tag: 'Medium Risk',
    tagColor: '#c8973a',
  },
  {
    title: 'Debt Mutual Funds',
    desc: 'Pooled funds that invest primarily in bonds and fixed-income securities. Managed professionally, offering liquidity and diversification.',
    tag: 'Managed',
    tagColor: '#0a1628',
  },
];

export default function Bonds() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#0a1628', background: '#fff' }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ background: '#f8f5f0', borderBottom: '1px solid #e8e2d9', padding: '12px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontSize: 13, color: '#6b7280', display: 'flex', gap: 6, alignItems: 'center' }}>
          <Link to="/" style={{ color: '#c8973a', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/assets/equity" style={{ color: '#c8973a', textDecoration: 'none' }}>Asset Class</Link>
          <span>›</span>
          <Link to="/assets/debt" style={{ color: '#c8973a', textDecoration: 'none' }}>Debt</Link>
          <span>›</span>
          <span style={{ color: '#0a1628', fontWeight: 600 }}>Bonds</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>
              Debt · Bonds
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
              What is a Bond?
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 32px' }}>
              A bond is a loan you give to a company or government. The amount of the loan is called "par value." The bond issuer agrees to repay the par value along with interest — called the "coupon" — by a specified date, or "maturity."
            </p>
            <Link to="/open-account"
              style={{ display: 'inline-block', background: '#c8973a', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 32px', textDecoration: 'none', borderRadius: 4, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#a87830'}
              onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
            >
              Start investing in Bonds →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Fixed Income', icon: '💰' },
              { label: 'Capital Preservation', icon: '🛡️' },
              { label: 'Regular Coupon Payments', icon: '📅' },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(200,151,58,0.3)', borderLeft: '4px solid #c8973a', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ background: '#f8f5f0', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>
              Why Invest
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Benefits of investing in bonds
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: '#fff', borderTop: '4px solid #c8973a', padding: '32px 24px' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOND TYPES ── */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>
              Options Available
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>
              Types of bonds at AWA Asset
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', margin: 0 }}>Choose the right bond category based on your risk appetite and investment goals.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {bondTypes.map(b => (
              <div key={b.title} style={{ border: '1px solid #e8e2d9', borderTop: `4px solid ${b.tagColor}`, padding: '32px 28px', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,22,40,0.1)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', background: b.tagColor, padding: '3px 10px', borderRadius: 2, marginBottom: 16 }}>
                  {b.tag}
                </span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: '0 0 24px' }}>{b.desc}</p>
                <Link to="/open-account" style={{ fontSize: 13, fontWeight: 700, color: '#c8973a', textDecoration: 'none' }}>
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW BONDS WORK ── */}
      <section style={{ background: '#0a1628', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>
              How It Works
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.2 }}>
              Understanding bond mechanics
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: 0 }}>
              When you buy a bond, you're lending money to the issuer for a set period. In return, the issuer pays you periodic interest (the coupon) and returns your principal at maturity. Bond prices move inversely to interest rates — when rates rise, bond prices fall, and vice versa.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { step: '01', title: 'You lend money', desc: 'Purchase a bond at its face (par) value or at a market price.' },
              { step: '02', title: 'Receive coupon payments', desc: 'Earn regular interest payments — monthly, quarterly, or annually.' },
              { step: '03', title: 'Bond matures', desc: 'At the maturity date, the issuer repays your full principal amount.' },
            ].map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: 24, padding: '24px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#c8973a', flexShrink: 0, lineHeight: 1 }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAY IN THE KNOW (newsletter) ── */}
      <section style={{ background: '#fef3e8', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>
              Stay in the know
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', margin: '0 0 28px', lineHeight: 1.65 }}>
              Get updates about new products, opportunities, and investing news from AWA Asset — a source trusted by our partner network across India.
            </p>
            {submitted ? (
              <div style={{ fontSize: 16, fontWeight: 600, color: '#00b050' }}>✓ You're subscribed! We'll be in touch.</div>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ flex: 1, maxWidth: 360, padding: '13px 16px', border: '1.5px solid #ddd8d0', borderRadius: 4, fontSize: 15, fontFamily: 'DM Sans, sans-serif', outline: 'none' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#c8973a'}
                  onBlur={e => e.currentTarget.style.borderColor = '#ddd8d0'}
                />
                <button
                  onClick={handleSubmit}
                  style={{ background: '#0a1628', color: '#fff', border: 'none', borderRadius: 4, padding: '13px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#c8973a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0a1628'}
                >Submit</button>
              </div>
            )}
          </div>
          <div style={{ width: 160, height: 160, background: 'linear-gradient(135deg, #c8973a, #0a1628)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 60 }}>📬</span>
          </div>
        </div>
      </section>

      {/* ── START INVESTING CTA ── */}
      <section style={{ background: '#0a1628', padding: '40px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: '#fff', margin: 0 }}>
            Start investing today
          </h2>
          <Link to="/open-account"
            style={{ display: 'inline-block', background: 'transparent', color: '#fff', border: '2px solid #fff', fontWeight: 700, fontSize: 15, padding: '13px 32px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0a1628'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >
            Open an account
          </Link>
        </div>
      </section>

    </div>
  );
}
