import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const benefits = [
  {
    icon: '📈',
    title: 'Competitive, Long-term Returns',
    desc: 'The majority of AWA-recommended ETFs outperform the returns of their peer-group averages over a 10-year horizon — compounding your wealth over time.',
  },
  {
    icon: '🏷️',
    title: 'Lower Taxes',
    desc: 'Most ETFs in our portfolio have had no taxable capital gains distributions in the last 5 years — keeping more money working for you.',
  },
  {
    icon: '🌱',
    title: 'Lower Expense Ratios',
    desc: 'Our average ETF expense ratio is significantly less than the industry average — because every basis point you save is a basis point you earn.',
  },
  {
    icon: '⚡',
    title: 'Better Prices for Your Trades',
    desc: 'The vast majority of ETF shares bought and sold through AWA Asset accounts are executed at a better price than the quoted market price.',
  },
];

const strategies = [
  {
    icon: '🧩',
    bg: '#fef3e8',
    title: 'Core ETFs',
    desc: 'Build a fully diversified portfolio with total-market ETFs that cover nearly all aspects of Indian and international stock and bond markets.',
    cta: 'Explore core ETFs',
  },
  {
    icon: '🌍',
    bg: '#edf7f4',
    title: 'ESG ETFs',
    desc: 'Explore funds that reflect your personal preferences and consider environmental, social, and governance (ESG) issues in every investment decision.',
    cta: 'Explore ESG ETFs',
  },
  {
    icon: '⏱️',
    bg: '#fdf8ec',
    title: 'Short-term ETFs',
    desc: 'These ETFs can help you diversify your portfolio and save for short-term goals — like a down payment on a car, home, or any near-term financial milestone.',
    cta: 'Explore short-term ETFs',
  },
];

const etfPoints = [
  'Buy and sell ETFs throughout the trading day at real-time pricing, just like stocks.',
  'Low investment minimums — starting at the share price.',
  'ETFs are generally more tax-efficient than mutual funds.',
  'Available as both index and actively managed ETFs.',
];

const mfPoints = [
  'Place buy or sell orders throughout the day; trades are processed and priced at end-of-day NAV.',
  'Investment minimums typically range from ₹500 to ₹5,00,000 depending on the fund.',
  'Mutual funds are generally less tax-efficient than ETFs.',
  'Available as both index and actively managed funds.',
];

const goalCards = [
  {
    icon: '📱',
    title: 'Mutual Funds',
    desc: 'Diversify your portfolio with high-quality, low-cost mutual funds across equity, debt, and hybrid categories.',
    cta: 'Explore mutual funds',
    to: '/assets/equity/mutual-funds',
  },
  {
    icon: '💧',
    title: 'Money Market Funds',
    desc: 'Save for short-term goals and emergencies with a lower-risk investment that offers liquidity and stability.',
    cta: 'Explore money markets',
    to: '/open-account',
  },
  {
    icon: '🗂️',
    title: 'Other Investment Products',
    desc: 'Choose from a variety of products across PMS, RIA, bonds, commodities, and more that may fit your needs.',
    cta: 'Explore other investments',
    to: '/open-account',
  },
];

const QUIZ_QUESTIONS = [
  {
    q: 'What is your primary investment goal?',
    options: ['Wealth creation', 'Regular income', 'Capital preservation', 'Short-term savings'],
  },
  {
    q: 'What is your investment horizon?',
    options: ['Less than 1 year', '1–3 years', '3–7 years', '7+ years'],
  },
  {
    q: 'How would you react if your portfolio dropped 20% in a month?',
    options: ['Sell everything', 'Sell some', 'Hold steady', 'Buy more'],
  },
];

function InvestorQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const pick = (ans) => {
    const next = [...answers, ans];
    setAnswers(next);
    if (step + 1 >= QUIZ_QUESTIONS.length) setDone(true);
    else setStep(step + 1);
  };

  const reset = () => { setStep(0); setAnswers([]); setDone(false); };

  const getResult = () => {
    const riskScore = answers[2];
    if (riskScore === 'Buy more') return { type: 'Aggressive Growth ETFs', desc: 'You have a high risk appetite. Consider small-cap and sectoral ETFs for maximum long-term growth.', color: '#c8973a' };
    if (riskScore === 'Hold steady') return { type: 'Balanced Core ETFs', desc: 'You are a balanced investor. A mix of large-cap equity and short-duration bond ETFs suits you well.', color: '#0a1628' };
    return { type: 'Conservative ETFs', desc: 'Capital preservation matters most to you. Short-term bond ETFs and liquid funds align with your risk profile.', color: '#00b050' };
  };

  if (done) {
    const r = getResult();
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#0a1628', margin: '0 0 8px' }}>Your recommended ETF type:</h3>
        <div style={{ fontSize: 22, fontWeight: 700, color: r.color, margin: '0 0 12px' }}>{r.type}</div>
        <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.65 }}>{r.desc}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/open-account" style={{ background: '#c8973a', color: '#fff', fontWeight: 700, fontSize: 14, padding: '12px 28px', textDecoration: 'none', borderRadius: 4 }}>Open an account</Link>
          <button onClick={reset} style={{ background: 'transparent', border: '1.5px solid #0a1628', color: '#0a1628', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 4, cursor: 'pointer' }}>Retake quiz</button>
        </div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[step];
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#c8973a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        Question {step + 1} of {QUIZ_QUESTIONS.length}
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
        {QUIZ_QUESTIONS.map((_, i) => (
          <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i <= step ? '#c8973a' : '#e8e2d9', transition: 'background 0.3s' }} />
        ))}
      </div>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, color: '#0a1628', margin: '0 0 24px', lineHeight: 1.3 }}>{q.q}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {q.options.map(opt => (
          <button key={opt} onClick={() => pick(opt)}
            style={{ background: '#fff', border: '1.5px solid #e8e2d9', borderRadius: 4, padding: '14px 20px', textAlign: 'left', fontSize: 15, color: '#0a1628', fontFamily: 'DM Sans, sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8973a'; e.currentTarget.style.background = '#fef3e8'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e2d9'; e.currentTarget.style.background = '#fff'; }}
          >{opt}</button>
        ))}
      </div>
    </div>
  );
}

export default function ETFs() {
  const [activeTab, setActiveTab] = useState('etf');

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
          <span style={{ color: '#0a1628', fontWeight: 600 }}>ETFs</span>
        </div>
      </div>

      {/* ── HERO — What's an ETF? ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>
              Equity · ETFs
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
              What's an ETF?
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 32px' }}>
              An ETF is a collection of hundreds or thousands of stocks, bonds, or other securities, managed by experts, in a single fund that trades on major stock exchanges. ETFs offer diversification, low costs, and the ability to trade shares live during the trading day.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/open-account"
                style={{ display: 'inline-block', background: '#c8973a', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 28px', textDecoration: 'none', borderRadius: 4, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#a87830'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
              >Start investing in ETFs →</Link>
              <Link to="/assets/equity/mutual-funds"
                style={{ display: 'inline-block', background: 'transparent', border: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 600, fontSize: 15, padding: '12px 28px', textDecoration: 'none', borderRadius: 4, transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
              >Compare with Mutual Funds</Link>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '🔄', label: 'Trades Like a Stock — Intraday Pricing' },
              { icon: '📦', label: 'Instant Diversification in One Fund' },
              { icon: '💰', label: 'Low Expense Ratios' },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(200,151,58,0.3)', borderLeft: '4px solid #c8973a', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 BENEFITS ── */}
      <section style={{ background: '#f8f5f0', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Why ETFs</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: 0 }}>
              4 benefits of investing in ETFs
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: '#fff', borderTop: '4px solid #c8973a', padding: '32px 24px' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#0a1628', marginBottom: 12, lineHeight: 1.3 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STRATEGIES ── */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Strategies</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>
              ETF investment strategies at AWA Asset
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 620, margin: '0 auto' }}>
              With a variety of options, you can choose ETFs that best fit your goals, values, and overall portfolio strategy.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {strategies.map(s => (
              <div key={s.title} style={{ border: '1px solid #e8e2d9', overflow: 'hidden' }}>
                <div style={{ background: s.bg, padding: '48px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                  {s.icon}
                </div>
                <div style={{ padding: '28px 24px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#0a1628', margin: '0 0 10px' }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: '0 0 20px' }}>{s.desc}</p>
                  <Link to="/open-account"
                    style={{ display: 'inline-block', border: '1.5px solid #0a1628', color: '#0a1628', fontWeight: 700, fontSize: 13, padding: '9px 20px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
                  >{s.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHICH ETFs ARE GOOD? — Investor Quiz ── */}
      <section style={{ background: '#edf7f4', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0a1628', marginBottom: 16, opacity: 0.6 }}>
              Find Your Fit
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: '#0a1628', margin: '0 0 16px', lineHeight: 1.2 }}>
              Which ETFs are good to invest in?
            </h2>
            <p style={{ fontSize: 16, color: '#4a5568', lineHeight: 1.7, margin: '0 0 12px' }}>
              Every investor is unique. Use our questionnaire to find an asset mix — a combination of stocks, bonds, and short-term reserves — that fits your investment goals and risk tolerance.
            </p>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65 }}>
              Answer 3 quick questions and we'll point you to the ETF category that matches your profile.
            </p>
          </div>
          <div style={{ background: '#fff', padding: '36px 32px', border: '1px solid #d8ede9' }}>
            <InvestorQuiz />
          </div>
        </div>
      </section>

      {/* ── HOW TO INVEST ── */}
      <section style={{ background: '#0a1628', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { step: '01', title: 'Open an account', desc: 'Start investing in an ETF by opening an AWA Asset brokerage account or logging in to your existing account.' },
              { step: '02', title: 'Choose your ETF', desc: 'Browse our curated ETF options — core, ESG, or short-term — based on your investor questionnaire result.' },
              { step: '03', title: 'Place your trade', desc: 'Enter the ETF trade through our Buy & Sell page. ETFs trade live during market hours at real-time prices.' },
            ].map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: 24, padding: '28px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#c8973a', flexShrink: 0, lineHeight: 1 }}>{s.step}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: '#fff', marginBottom: 6 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>Getting Started</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.2 }}>
              How do I invest in an ETF?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, margin: '0 0 32px' }}>
              Start investing in an ETF by opening an AWA Asset account or logging into your existing account. Enter the ETF trade path through the Buy &amp; Sell page — it only takes minutes.
            </p>
            <Link to="/open-account"
              style={{ display: 'inline-block', background: '#c8973a', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 32px', textDecoration: 'none', borderRadius: 4, transition: 'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#a87830'}
              onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
            >Open an AWA Asset Account</Link>
          </div>
        </div>
      </section>

      {/* ── ETFs vs MUTUAL FUNDS ── */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Comparison</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>
              ETFs vs. Mutual Funds
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 640, margin: '0 auto 36px' }}>
              ETFs and mutual funds are similar in many ways, but a few key differences set them apart. Toggle to highlight your preferred option.
            </p>
          </div>
          {/* Toggle */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
            <div style={{ display: 'flex', border: '1.5px solid #0a1628', borderRadius: 50, overflow: 'hidden' }}>
              {[{ id: 'etf', label: 'ETFs' }, { id: 'mf', label: 'Mutual Funds' }].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ padding: '10px 32px', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', background: activeTab === tab.id ? '#0a1628' : 'transparent', color: activeTab === tab.id ? '#fff' : '#0a1628', transition: 'all 0.2s' }}
                >{tab.label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ border: `2px solid ${activeTab === 'etf' ? '#c8973a' : '#e8e2d9'}`, padding: '36px 32px', transition: 'border-color 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>⚡</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#0a1628', margin: 0 }}>ETFs</h3>
              </div>
              <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, margin: '0 0 20px' }}>
                An ETF is a collection of hundreds or thousands of stocks, bonds, or other securities, managed by experts, in a single fund that trades on major stock exchanges.
              </p>
              <ul style={{ paddingLeft: 20, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {etfPoints.map((p, i) => <li key={i} style={{ fontSize: 14, color: '#4a5568', lineHeight: 1.65 }}>{p}</li>)}
              </ul>
              <Link to="/open-account" style={{ fontSize: 14, fontWeight: 700, color: '#c8973a', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >Explore ETFs →</Link>
            </div>
            <div style={{ border: `2px solid ${activeTab === 'mf' ? '#c8973a' : '#e8e2d9'}`, padding: '36px 32px', transition: 'border-color 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>🏦</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#0a1628', margin: 0 }}>Mutual Funds</h3>
              </div>
              <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, margin: '0 0 20px' }}>
                A mutual fund is a collection of stocks, bonds, or other securities, managed by experts, bought and sold at the end of each trading day based on its net asset value (NAV).
              </p>
              <ul style={{ paddingLeft: 20, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {mfPoints.map((p, i) => <li key={i} style={{ fontSize: 14, color: '#4a5568', lineHeight: 1.65 }}>{p}</li>)}
              </ul>
              <Link to="/assets/equity/mutual-funds" style={{ fontSize: 14, fontWeight: 700, color: '#c8973a', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >Explore Mutual Funds →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2 WAYS ── */}
      <section style={{ background: '#f8f5f0', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Getting Started</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: 0 }}>
              2 ways to open an investment account
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { icon: '📊', bg: '#fdf8ec', title: 'Do it yourself', desc: 'Both industry experts and everyday people rely on our low-cost ETFs and mutual funds. Choose from diverse investments to save for your financial goals — on your own terms.', cta: 'Invest on your own', to: '/open-account' },
              { icon: '🧭', bg: '#edf7f4', title: 'Explore professional advice', desc: "Whatever you're working toward, we have a range of services to help you get there. Get a personalized plan and judgment-free guidance to keep you on track.", cta: 'Compare advice services', to: '/advice/wealth-planning' },
            ].map(item => (
              <div key={item.title} style={{ border: '1px solid #e8e2d9', overflow: 'hidden', background: '#fff' }}>
                <div style={{ background: item.bg, padding: '48px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72 }}>{item.icon}</div>
                <div style={{ padding: '32px 28px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>{item.title}</h3>
                  <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, margin: '0 0 24px' }}>{item.desc}</p>
                  <Link to={item.to}
                    style={{ display: 'inline-block', border: '1.5px solid #0a1628', color: '#0a1628', fontWeight: 700, fontSize: 14, padding: '10px 22px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
                  >{item.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVEST ACCORDING TO YOUR GOALS ── */}
      <section style={{ padding: '0 0 80px' }}>
        <div style={{ background: '#0a1628', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#fff', margin: 0 }}>
              Explore AWA Asset ETFs
            </h2>
            <Link to="/open-account"
              style={{ display: 'inline-block', background: '#fff', color: '#0a1628', fontWeight: 700, fontSize: 14, padding: '10px 24px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c8973a'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0a1628'; }}
            >Shop ETFs</Link>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Related Products</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, fontWeight: 700, color: '#0a1628', margin: 0 }}>
              Invest according to your goals
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {goalCards.map(g => (
              <div key={g.title} style={{ border: '1px solid #e8e2d9', overflow: 'hidden' }}>
                <div style={{ background: '#f8f5f0', padding: '40px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>{g.icon}</div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#0a1628', margin: '0 0 10px' }}>{g.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: '0 0 20px' }}>{g.desc}</p>
                  <Link to={g.to}
                    style={{ display: 'inline-block', border: '1.5px solid #0a1628', color: '#0a1628', fontWeight: 700, fontSize: 13, padding: '9px 18px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
                  >{g.cta}</Link>
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
