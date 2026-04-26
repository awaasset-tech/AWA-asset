import React from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: '📈',
    title: 'Potential for Higher Returns',
    desc: 'Stocks have historically provided higher returns compared to other investment options. Keep in mind that higher reward can come with higher risk.',
  },
  {
    icon: '💰',
    title: 'Ownership & Dividends',
    desc: 'When you invest in stocks, you become a partial owner of the company and could receive regular dividend payments.',
  },
  {
    icon: '🥧',
    title: 'Flexibility',
    desc: 'You can choose from a wide range of stocks that align to your financial goals and personal preferences — across sectors, market caps, and geographies.',
  },
];

const stats = [
  {
    value: '₹0',
    title: 'No commissions to trade stocks online',
    desc: 'Save for a goal, like a house or tuition. Or consider bonds if you\'re looking for fixed income in retirement.',
    link: 'See our fees & commissions',
  },
  {
    value: 'Low E/Q',
    title: 'Best price on every trade',
    desc: 'We\'re constantly working to give you the best price on trades with a low effective over quoted spread (E/Q).',
    link: 'See how brokerage is built for you',
  },
  {
    value: '₹0',
    title: 'No account minimums',
    desc: 'There are no account minimums to buy stocks in your AWA Asset brokerage account.',
    link: 'Learn more about settlement funds',
  },
];

const strategies = [
  {
    icon: '📊',
    title: 'Trade on Margin',
    desc: 'Want to borrow the cash or securities you need to complete a trade or short sale? Margin trading lets experienced investors amplify positions.',
    link: 'Learn more about margin accounts',
  },
  {
    icon: '⚙️',
    title: 'Buy & Sell Options',
    desc: 'Options are complex investments that involve a high degree of risk, so they\'re best suited for experienced investors with a solid understanding of market mechanics.',
    link: 'Learn more about options trading',
  },
  {
    icon: '🔄',
    title: 'Compound Your Earnings',
    desc: 'A no-fee, no-commission reinvestment program that allows you to reinvest dividends and/or capital gains distributions — letting compounding do the heavy lifting.',
    link: 'Learn more about dividend reinvestment',
  },
];

const learnCards = [
  {
    icon: '🏢',
    tag: 'Investing Strategies',
    title: 'IPOs: What to Know',
    desc: 'Educating investors on all things IPO-related — from how to evaluate a new listing to participation strategies.',
  },
  {
    icon: '📦',
    tag: 'Investment Types',
    title: 'What are Equity or Stock Funds?',
    desc: 'Equity mutual funds and ETFs (exchange-traded funds) invest in a diverse mix of stocks for broad market exposure.',
  },
  {
    icon: '📋',
    tag: 'Education · Online Trading',
    title: 'Stock & ETF Order Types: Understanding Market, Limit...',
    desc: 'To understand when you might want to place a specific order type, check out these examples and explanations.',
  },
];

const resources = [
  {
    icon: '🧑‍💻',
    bg: '#fdf8ec',
    title: 'Investing on your own?',
    desc: 'Check out key information you can use as you begin your DIY investing journey with AWA Asset.',
    cta: 'Get DIY Resources',
    to: '/resources/financial-literacy',
  },
  {
    icon: '🧭',
    bg: '#edf7f4',
    title: 'Get professional advice',
    desc: 'We offer expert help and personalised guidance. Compare our advice services and find what fits your goals.',
    cta: 'Compare advice services',
    to: '/advice/wealth-planning',
  },
  {
    icon: '🗂️',
    bg: '#f8f5f0',
    title: 'Other investment products',
    desc: 'We have a variety of products to select from — bonds, ETFs, mutual funds, PMS and more. See which best fits your needs.',
    cta: 'Learn about other investments',
    to: '/open-account',
  },
];

const howSteps = [
  'Open an AWA Asset brokerage account.',
  'Navigate to "Transact", then "Buy and sell".',
  'Enter the ticker symbol, share quantity, and order type.',
  'Submit purchase.',
];

export default function Stocks() {
  return (
    <div style={{ fontFamily: 'DM Sans, sans-serif', color: '#0a1628', background: '#fff' }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ background: '#f8f5f0', borderBottom: '1px solid #e8e2d9', padding: '12px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', fontSize: 13, color: '#6b7280', display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: '#c8973a', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/assets/equity" style={{ color: '#c8973a', textDecoration: 'none' }}>Asset Class</Link>
          <span>›</span>
          <Link to="/assets/equity" style={{ color: '#c8973a', textDecoration: 'none' }}>Equity</Link>
          <span>›</span>
          <span style={{ color: '#0a1628', fontWeight: 600 }}>Stocks</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>
              Equity · Stocks
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
              What are Stocks?
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 32px' }}>
              Stocks represent part ownership in a corporation. Each share of stock is a proportional stake in the corporation's assets and profits. Depending on the company, your investment value changes through fluctuation in share price or dividend payments.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/open-account"
                style={{ display: 'inline-block', background: '#c8973a', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 28px', textDecoration: 'none', borderRadius: 4, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#a87830'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
              >Start investing in Stocks →</Link>
              <Link to="/assets/equity/etfs"
                style={{ display: 'inline-block', background: 'transparent', border: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 600, fontSize: 15, padding: '12px 28px', textDecoration: 'none', borderRadius: 4, transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
              >Explore ETFs instead</Link>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🏢', label: 'Part Ownership in Real Companies' },
              { icon: '💸', label: 'Dividend Income Potential' },
              { icon: '📊', label: 'Trade Live During Market Hours' },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(200,151,58,0.3)', borderLeft: '4px solid #c8973a', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTING WITH AWA MEANS... ── */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Our Edge</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Investing in stocks with AWA Asset means…
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '3px solid #c8973a' }}>
            {stats.map((s, i) => (
              <div key={s.title} style={{ padding: '40px 36px', borderRight: i < 2 ? '1px solid #e8e2d9' : 'none' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 52, fontWeight: 700, color: '#0a1628', lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontWeight: 700, fontSize: 17, color: '#0a1628', marginBottom: 12, lineHeight: 1.3 }}>{s.title}</div>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: '0 0 16px' }}>{s.desc}</p>
                <Link to="/open-account" style={{ fontSize: 13, fontWeight: 700, color: '#c8973a', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >{s.link} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVEST IN HUNDREDS WITH ONE ETF ── */}
      <section style={{ background: '#f8f5f0', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          {/* Mock portfolio display */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: '#0a1628', borderRadius: 12, padding: '28px', color: '#fff', boxShadow: '0 20px 60px rgba(10,22,40,0.25)' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Portfolio Value</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: '#c8973a', marginBottom: 20 }}>₹54,41,590</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Equity', pct: 68, color: '#c8973a' },
                  { label: 'Bonds', pct: 20, color: '#4a7c59' },
                  { label: 'ETFs', pct: 8, color: '#6b9bd2' },
                  { label: 'Cash', pct: 4, color: '#aaa' },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                      <span style={{ color: '#fff', fontWeight: 600 }}>{item.pct}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                      <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>For illustrative purposes only</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>Smarter Way to Invest</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: '#0a1628', margin: '0 0 16px', lineHeight: 1.2 }}>
              Invest in hundreds of stocks with just one ETF
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7, margin: '0 0 28px' }}>
              Diversify your portfolio without worrying about investing in and managing multiple individual stocks. You can choose from a variety of AWA Asset stock funds or other individual stocks of your choice.
            </p>
            <Link to="/assets/equity/etfs"
              style={{ display: 'inline-block', border: '1.5px solid #0a1628', color: '#0a1628', fontWeight: 700, fontSize: 14, padding: '12px 28px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
            >Check out AWA Asset ETFs</Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ background: '#fff', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Why Stocks</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Benefits of investing in stocks
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {benefits.map(b => (
              <div key={b.title} style={{ borderTop: '4px solid #c8973a', background: '#f8f5f0', padding: '36px 28px' }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{b.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO BUY ── */}
      <section style={{ background: '#0a1628', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>Getting Started</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#fff', margin: '0 0 36px', lineHeight: 1.2 }}>
              How to buy stocks at AWA Asset
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {howSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, paddingBottom: i < howSteps.length - 1 ? 28 : 0, position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#c8973a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0 }}>✓</div>
                    {i < howSteps.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: 'rgba(200,151,58,0.3)', marginTop: 6 }} />
                    )}
                  </div>
                  <div style={{ paddingTop: 6, paddingBottom: i < howSteps.length - 1 ? 20 : 0 }}>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', margin: 0, lineHeight: 1.55 }}>{step}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 36 }}>
              <Link to="/open-account"
                style={{ display: 'inline-block', background: '#c8973a', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 32px', textDecoration: 'none', borderRadius: 4, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#a87830'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
              >Open an account now</Link>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 200, height: 200, background: 'linear-gradient(135deg, #c8973a 0%, #0a1628 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, boxShadow: '0 0 60px rgba(200,151,58,0.3)' }}>
              💳
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGIES FOR EXPERIENCED INVESTORS ── */}
      <section style={{ background: '#edf7f4', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0a1628', opacity: 0.5, marginBottom: 12 }}>Advanced</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>
              Stock trading strategies for experienced investors
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 700, margin: '0 auto' }}>
              In addition to commission-free online stock trading and high-quality trade execution, you can invest using sophisticated trading techniques.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {strategies.map(s => (
              <div key={s.title} style={{ background: '#fff', borderTop: '4px solid #0a1628', padding: '32px 28px' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#0a1628', marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: '0 0 16px' }}>{s.desc}</p>
                <Link to="/open-account" style={{ fontSize: 13, fontWeight: 700, color: '#c8973a', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >{s.link} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARN MORE ── */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Financial Literacy</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Want to learn more about stocks?
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {learnCards.map(c => (
              <div key={c.title} style={{ border: '1px solid #e8e2d9', overflow: 'hidden', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(10,22,40,0.10)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ background: '#f8f5f0', height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                  {c.icon}
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 8 }}>{c.tag}</div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#0a1628', margin: '0 0 10px', lineHeight: 1.3 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: '0 0 16px' }}>{c.desc}</p>
                  <Link to="/resources/financial-literacy" style={{ fontSize: 13, fontWeight: 700, color: '#c8973a', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                  >Read article →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER RESOURCES ── */}
      <section style={{ background: '#f8f5f0', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Related</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Other investing resources
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {resources.map(r => (
              <div key={r.title} style={{ border: '1px solid #e8e2d9', overflow: 'hidden', background: '#fff' }}>
                <div style={{ background: r.bg, padding: '48px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60 }}>
                  {r.icon}
                </div>
                <div style={{ padding: '28px 24px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#0a1628', margin: '0 0 10px', lineHeight: 1.3 }}>{r.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: '0 0 20px' }}>{r.desc}</p>
                  <Link to={r.to}
                    style={{ display: 'inline-block', border: '1.5px solid #0a1628', color: '#0a1628', fontWeight: 700, fontSize: 13, padding: '9px 20px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
                  >{r.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: '#0a1628', padding: '44px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Start investing today</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 }}>Join 128+ Distribution Partners already building wealth through AWA Asset.</p>
          </div>
          <Link to="/open-account"
            style={{ display: 'inline-block', background: 'transparent', color: '#fff', border: '2px solid #fff', fontWeight: 700, fontSize: 15, padding: '13px 32px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0a1628'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; }}
          >Open an account</Link>
        </div>
      </section>

    </div>
  );
}
