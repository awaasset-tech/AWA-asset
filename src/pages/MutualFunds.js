import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign, PieChart, Users, Smartphone,
  Shuffle, Calculator, Target, Globe,
  Package, TrendingUp, BarChart2, Compass,
  Zap, Landmark, UserCheck
} from 'lucide-react';

const benefits = [
  {
    icon: <DollarSign size={36} color="#c8973a" strokeWidth={1.5} />,
    title: 'Low Costs',
    desc: 'Our average expense ratio across mutual funds and ETFs is significantly lower than the industry average — keeping more returns in your pocket.',
  },
  {
    icon: <PieChart size={36} color="#c8973a" strokeWidth={1.5} />,
    title: 'Less Risk Through Diversification',
    desc: 'Mutual fund diversification helps reduce risk by spreading your investment across a range of securities, so underperformance in one area can be offset by better performance in others.',
  },
  {
    icon: <UserCheck size={36} color="#c8973a" strokeWidth={1.5} />,
    title: 'Professional Management',
    desc: "You don't have to keep track of every security your mutual fund owns. The fund is managed by experts who take care of that for you, so you're free to focus on other things.",
  },
  {
    icon: <Smartphone size={36} color="#c8973a" strokeWidth={1.5} />,
    title: 'Convenience',
    desc: 'You can buy and sell mutual fund shares online and set up recurring investments and withdrawals — all from one place.',
  },
];

const fundTypes = [
  {
    icon: <Shuffle size={52} color="#c8973a" strokeWidth={1} />,
    bg: '#fef3e8',
    title: 'Index Funds',
    desc: 'Enjoy the benefits of diversification, tax efficiency, and low costs with index mutual funds that track a market benchmark.',
    cta: 'Explore index funds',
  },
  {
    icon: <Calculator size={52} color="#c8973a" strokeWidth={1} />,
    bg: '#fdf8ec',
    title: 'Actively Managed Funds',
    desc: 'Our careful selection of talent, paired with a consistent investment approach and client-first focus, sets our actively managed mutual funds apart.',
    cta: 'Explore active funds',
  },
  {
    icon: <Target size={52} color="#c8973a" strokeWidth={1} />,
    bg: '#fef3e8',
    title: 'Target Retirement Funds',
    desc: 'You make just one decision, and the fund managers maintain the target risk and handle rebalancing for you — ideal for long-term goals.',
    cta: 'Explore TRFs',
  },
  {
    icon: <Globe size={52} color="#c8973a" strokeWidth={1} />,
    bg: '#edf7f4',
    title: 'ESG Funds',
    desc: 'Invest in what matters to you. ESG (environmental, social, governance) funds allow you to invest in funds that align with your personal values.',
    cta: 'Explore ESG funds',
  },
];

const etfPoints = [
  'Buy and sell throughout the trading day at real-time pricing, just like stocks.',
  'Generally more tax-efficient than mutual funds.',
  'Low investment minimums — starting at the share price.',
  'Available as both index and actively managed ETFs.',
];

const mfPoints = [
  'Place buy or sell orders throughout the day; trades are processed at end-of-day NAV.',
  'Investment minimums typically range from ₹500 to ₹5,00,000 depending on the fund.',
  'Mutual funds are generally less tax-efficient than ETFs.',
  'Available as both index and actively managed funds.',
];

export default function MutualFunds() {
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
          <span style={{ color: '#0a1628', fontWeight: 600 }}>Mutual Funds</span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)', padding: '72px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 16 }}>
              Equity · Mutual Funds
            </div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: '0 0 20px' }}>
              What's a Mutual Fund?
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, margin: '0 0 32px' }}>
              A mutual fund is a collection of investors' money that fund managers use to invest in stocks, bonds, and other securities — giving you instant diversification with professional oversight.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/open-account"
                style={{ display: 'inline-block', background: '#c8973a', color: '#fff', fontWeight: 700, fontSize: 15, padding: '14px 28px', textDecoration: 'none', borderRadius: 4, transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#a87830'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
              >Start investing →</Link>
              <Link to="/advice/wealth-planning"
                style={{ display: 'inline-block', background: 'transparent', border: '2px solid rgba(255,255,255,0.4)', color: '#fff', fontWeight: 600, fontSize: 15, padding: '12px 28px', textDecoration: 'none', borderRadius: 4, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
              >Learn more</Link>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: <Package size={22} color="#c8973a" strokeWidth={1.5} />, label: 'Pooled Investments' },
              { icon: <Users size={22} color="#c8973a" strokeWidth={1.5} />, label: 'Expert Fund Management' },
              { icon: <TrendingUp size={22} color="#c8973a" strokeWidth={1.5} />, label: 'Long-term Wealth Creation' },
            ].map(item => (
              <div key={item.label} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(200,151,58,0.3)', borderLeft: '4px solid #c8973a', padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
                {item.icon}
                <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY INVEST ── */}
      <section style={{ background: '#f8f5f0', padding: '80px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Why Invest</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>
              Why invest in mutual funds?
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', margin: '0 auto 48px', maxWidth: 620 }}>
              Mutual funds can be particularly suitable for investors seeking long-term, tax-deferred growth in retirement accounts.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {benefits.map(b => (
              <div key={b.title} style={{ background: '#fff', borderTop: '4px solid #c8973a', padding: '32px 24px' }}>
                <div style={{ marginBottom: 16 }}>{b.icon}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#0a1628', marginBottom: 12, lineHeight: 1.3 }}>{b.title}</h3>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUND OPTIONS ── */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Fund Options</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>
              AWA Asset mutual fund options
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 680, margin: '0 auto' }}>
              AWA Asset offers a range of mutual funds designed to serve different investment goals and risk tolerances. Here's an overview of our 4 main types.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {fundTypes.map(f => (
              <div key={f.title} style={{ border: '1px solid #e8e2d9', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ background: f.bg, padding: '36px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {f.icon}
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#0a1628', margin: '0 0 10px', lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.65, margin: '0 0 20px', flex: 1 }}>{f.desc}</p>
                  <Link to="/open-account"
                    style={{ display: 'inline-block', border: '1.5px solid #0a1628', color: '#0a1628', fontWeight: 700, fontSize: 13, padding: '9px 18px', textDecoration: 'none', borderRadius: 50, transition: 'all 0.2s', textAlign: 'center' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
                  >{f.cta}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2 WAYS TO INVEST ── */}
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
              {
                icon: <BarChart2 size={72} color="#c8973a" strokeWidth={1} />,
                bg: '#fdf8ec',
                title: 'Do it yourself',
                desc: 'Both industry experts and everyday people rely on our low-cost mutual funds and ETFs. Choose from diverse investments to save for your financial goals — on your own terms.',
                cta: 'Invest on your own',
                to: '/open-account',
              },
              {
                icon: <Compass size={72} color="#c8973a" strokeWidth={1} />,
                bg: '#edf7f4',
                title: 'Explore professional advice',
                desc: "Whatever you're working toward, we have a range of services to help you get there. Get a personalized plan and judgment-free guidance to keep you on track.",
                cta: 'Compare advice services',
                to: '/advice/wealth-planning',
              },
            ].map(item => (
              <div key={item.title} style={{ border: '1px solid #e8e2d9', overflow: 'hidden', background: '#fff' }}>
                <div style={{ background: item.bg, padding: '48px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
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

      {/* ── MUTUAL FUNDS vs ETFs ── */}
      <section style={{ padding: '80px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8973a', marginBottom: 12 }}>Comparison</div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, fontWeight: 700, color: '#0a1628', margin: '0 0 12px' }}>
              Mutual funds vs. ETFs
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 640, margin: '0 auto 48px' }}>
              Mutual funds and ETFs are similar in many ways, but there are a few key differences that set them apart.
            </p>
          </div>

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
                <Zap size={28} color="#c8973a" strokeWidth={1.5} />
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#0a1628', margin: 0 }}>ETFs</h3>
              </div>
              <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, margin: '0 0 20px' }}>
                An ETF is a collection of hundreds or thousands of stocks, bonds, or other securities, managed by experts, in a single fund that trades on major stock exchanges.
              </p>
              <ul style={{ paddingLeft: 20, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {etfPoints.map((p, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#4a5568', lineHeight: 1.65 }}>{p}</li>
                ))}
              </ul>
              <Link to="/assets/equity/etfs"
                style={{ fontSize: 14, fontWeight: 700, color: '#c8973a', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >Explore ETFs →</Link>
            </div>

            <div style={{ border: `2px solid ${activeTab === 'mf' ? '#c8973a' : '#e8e2d9'}`, padding: '36px 32px', transition: 'border-color 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <Landmark size={28} color="#c8973a" strokeWidth={1.5} />
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#0a1628', margin: 0 }}>Mutual Funds</h3>
              </div>
              <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.7, margin: '0 0 20px' }}>
                A mutual fund is a collection of stocks, bonds, or other securities, managed by experts, in a single fund that's bought and sold at end-of-day based on its net asset value (NAV).
              </p>
              <ul style={{ paddingLeft: 20, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {mfPoints.map((p, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#4a5568', lineHeight: 1.65 }}>{p}</li>
                ))}
              </ul>
              <Link to="/open-account"
                style={{ fontSize: 14, fontWeight: 700, color: '#c8973a', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >Explore mutual funds →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── START INVESTING CTA ── */}
      <section style={{ background: '#0a1628', padding: '44px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>
              Start investing today
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Join 128+ Distribution Partners already building wealth through AWA Asset.
            </p>
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
