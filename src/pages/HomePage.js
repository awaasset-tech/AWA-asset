import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';

/* ---- Small reusable Card ---- */
function GoalCard({ emoji, title, desc, cta, to }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={to} style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: hovered ? '#f8f5f0' : '#fff',
        border: `1.5px solid ${hovered ? '#c8973a' : '#ddd8d0'}`,
        borderRadius: 10,
        padding: '32px 28px',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 10px 32px rgba(10,22,40,0.1)' : '0 2px 8px rgba(10,22,40,0.04)',
        height: '100%',
      }}>
        <div style={{ fontSize: 36, marginBottom: 14 }}>{emoji}</div>
        <h3 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.2rem',
          color: '#0a1628',
          marginBottom: 10,
        }}>{title}</h3>
        <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{desc}</p>
        <span style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#c8973a',
          borderBottom: '2px solid #c8973a',
          paddingBottom: 2,
        }}>{cta} →</span>
      </div>
    </Link>
  );
}

/* ---- Product chip ---- */
function ProductChip({ label, to }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-block',
        background: hovered ? '#0a1628' : '#fff',
        color: hovered ? '#fff' : '#0a1628',
        border: '1.5px solid #0a1628',
        borderRadius: 4,
        padding: '9px 20px',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 600,
        fontSize: 14,
        textDecoration: 'none',
        transition: 'all 0.2s ease',
      }}>
      {label}
    </Link>
  );
}

/* ---- Resource card ---- */
function ResourceCard({ icon, title, desc, cta, to }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #ddd8d0',
      borderRadius: 10,
      overflow: 'hidden',
      transition: 'box-shadow 0.2s, transform 0.2s',
      transform: hovered ? 'translateY(-3px)' : 'none',
      boxShadow: hovered ? '0 12px 32px rgba(10,22,40,0.1)' : '0 2px 8px rgba(10,22,40,0.04)',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: `linear-gradient(135deg, #0a1628 0%, #1d3461 100%)`,
        height: 90,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 36,
      }}>{icon}</div>
      <div style={{ padding: '22px 22px 24px' }}>
        <h4 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1rem',
          color: '#0a1628',
          marginBottom: 8,
          lineHeight: 1.3,
        }}>{title}</h4>
        <p style={{ color: '#6b7280', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
        <Link to={to} style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#c8973a',
          textDecoration: 'none',
          borderBottom: '2px solid #c8973a',
          paddingBottom: 1,
        }}>{cta} →</Link>
      </div>
    </div>
  );
}

/* ---- Stat ---- */
function Stat({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '2.8rem',
        fontWeight: 700,
        color: '#e5b55a',
        lineHeight: 1,
        marginBottom: 8,
      }}>{value}</div>
      <div style={{ color: '#9aaec4', fontSize: 14, maxWidth: 200 }}>{label}</div>
    </div>
  );
}

/* ============================== */
export default function HomePage() {
  return (
    <main>

      {/* HERO */}
      <HeroSlider />

      {/* QUICK ACTIONS — the "log in / open / set up" strip */}
      <div style={{ background: '#f8f5f0', borderBottom: '1px solid #ddd8d0' }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0,
          justifyContent: 'center',
        }}>
          {[
            { label: 'Log in to your account', icon: '🔐', to: '/login' },
            { label: 'Open an account', icon: '✨', to: '/open-account' },
            { label: 'Set up online access', icon: '⚙️', to: '/setup' },
          ].map((item, i) => (
            <Link key={i} to={item.to} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '18px 36px',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              color: '#0a1628',
              textDecoration: 'none',
              borderRight: i < 2 ? '1px solid #ddd8d0' : 'none',
              transition: 'background 0.2s, color 0.2s',
              flex: '1 1 200px',
              justifyContent: 'center',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#c8973a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* GOALS SECTION */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#c8973a',
              marginBottom: 10,
            }}>YOUR FINANCIAL JOURNEY</p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.2rem',
              color: '#0a1628',
              marginBottom: 14,
            }}>Which goal can you check off your list?</h2>
            <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
              Whether you're saving for retirement, building an emergency fund, or planning for education — XYZ has you covered.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 24,
          }}>
            <GoalCard
              emoji="🏖️"
              title="Prep for retirement"
              desc="Work with an advisor or a robo-advisor to get a personalized retirement strategy in place."
              cta="Advice services"
              to="/advice"
            />
            <GoalCard
              emoji="💰"
              title="Live in the moment"
              desc="We'll help you save so you don't have to sweat surprise expenses or short-term goals."
              cta="Cash management"
              to="/products/cash-investments"
            />
            <GoalCard
              emoji="📋"
              title="Plan your estate"
              desc="Pass your wealth to the people and causes you care about most with expert estate planning."
              cta="Estate planning"
              to="/advice/wealth"
            />
            <GoalCard
              emoji="🎓"
              title="Save for school"
              desc="Tuition and education expenses can be costly. Start planning now so you're prepared."
              cta="529 savings plan"
              to="/accounts/529"
            />
          </div>
        </div>
      </section>

      {/* INVESTMENT PRODUCTS */}
      <section style={{ padding: '72px 0', background: '#f3f0eb' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 44,
            gap: 20,
          }}>
            <div>
              <p style={{
                fontSize: 12, fontWeight: 700,
                letterSpacing: '1.2px', textTransform: 'uppercase',
                color: '#c8973a', marginBottom: 10,
              }}>WHAT WE OFFER</p>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '2.2rem',
                color: '#0a1628',
                maxWidth: 480,
              }}>
                Investment products to support your financial strategy
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/products/all" style={{
                fontSize: 14, fontWeight: 600, color: '#0a1628',
                textDecoration: 'none',
                borderBottom: '2px solid #c8973a', paddingBottom: 2,
              }}>View all funds →</Link>
              <Link to="/fees" style={{
                fontSize: 14, fontWeight: 600, color: '#6b7280',
                textDecoration: 'none', paddingBottom: 2,
              }}>Review fees & commissions</Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[
              { label: 'Mutual funds', to: '/products/mutual-funds' },
              { label: 'ETFs', to: '/products/etfs' },
              { label: 'Money market funds', to: '/products/money-markets' },
              { label: 'Stocks', to: '/products/stocks' },
              { label: 'CDs', to: '/products/cds' },
              { label: 'Bonds', to: '/products/bonds' },
            ].map(p => <ProductChip key={p.to} {...p} />)}
          </div>

          {/* Featured products grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            marginTop: 36,
          }}>
            {[
              {
                name: 'XYZ 500 Index Fund', type: 'Mutual Fund',
                return: '+14.2%', period: '10-yr avg annual',
                er: '0.04%', desc: 'Tracks the performance of 500 large-cap U.S. stocks.',
                to: '/products/mutual-funds',
              },
              {
                name: 'XYZ Total Market ETF', type: 'ETF',
                return: '+13.8%', period: '10-yr avg annual',
                er: '0.03%', desc: 'Broad exposure to the entire U.S. stock market.',
                to: '/products/etfs',
              },
              {
                name: 'XYZ Bond Index Fund', type: 'Mutual Fund',
                return: '+4.1%', period: '10-yr avg annual',
                er: '0.05%', desc: 'Diversified exposure to the U.S. bond market.',
                to: '/products/mutual-funds',
              },
            ].map(p => (
              <Link key={p.name} to={p.to} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff',
                  border: '1.5px solid #ddd8d0',
                  borderRadius: 10,
                  padding: '24px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8973a'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(10,22,40,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd8d0'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.8px',
                    textTransform: 'uppercase', color: '#c8973a', marginBottom: 8,
                  }}>{p.type}</div>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', color: '#0a1628', marginBottom: 8 }}>{p.name}</h4>
                  <p style={{ color: '#6b7280', fontSize: 13, marginBottom: 16 }}>{p.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: '#0a6b45', fontFamily: 'DM Sans, sans-serif' }}>{p.return}</div>
                      <div style={{ fontSize: 11, color: '#9aaec4' }}>{p.period}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#0a1628' }}>{p.er}</div>
                      <div style={{ fontSize: 11, color: '#9aaec4' }}>expense ratio</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY XYZ — STATS */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #0a1628 0%, #112240 50%, #1d3461 100%)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{
              fontSize: 12, fontWeight: 700,
              letterSpacing: '1.2px', textTransform: 'uppercase',
              color: '#e5b55a', marginBottom: 10,
            }}>WHY CHOOSE XYZ</p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.2rem',
              color: '#fff',
              marginBottom: 14,
            }}>Empowering investors for the long term</h2>
            <p style={{ color: '#9aaec4', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
              We stick to 4 principles designed to set investors up for success: goals, balance, costs, and discipline.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 40,
            maxWidth: 800,
            margin: '0 auto 56px',
          }}>
            <Stat value="50M+" label="investors trust us with their money" />
            <Stat value="84%" label="of XYZ funds outperformed peer-group averages" />
            <Stat value="$9T+" label="in global assets under management" />
            <Stat value="0.06%" label="average expense ratio — industry-leading low" />
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/about" style={{
              background: '#c8973a',
              color: '#fff',
              padding: '13px 32px',
              borderRadius: 4,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#e5b55a'}
              onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
            >
              Learn about XYZ
            </Link>
          </div>
        </div>
      </section>

      {/* MISSION STRIP */}
      <section style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #1d3461 100%)',
        padding: '56px 32px',
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}>
          <div style={{ maxWidth: 580 }}>
            <p style={{
              fontSize: 11, fontWeight: 700,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              color: '#e5b55a', marginBottom: 12,
            }}>Our Mission</p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.9rem',
              color: '#fff',
              lineHeight: 1.3,
              marginBottom: 14,
            }}>
              Making financial education a<br />
              <span style={{ color: '#e5b55a' }}>primary focus in our community</span>
            </h2>
            <p style={{ color: '#9aaec4', fontSize: 14, lineHeight: 1.75 }}>
              To empower this generation and generations to come with financial stability —
              and to live in a community where economic enlightenment empowers every person.
            </p>
          </div>
          <Link to="/about" style={{
            background: '#c8973a', color: '#fff',
            padding: '13px 28px', borderRadius: 4,
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700, fontSize: 14,
            textDecoration: 'none', flexShrink: 0,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#e5b55a'}
            onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
          >
            Our story →
          </Link>
        </div>
      </section>

      {/* GROWTH STRATEGY — replaces 4 Principles */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{
              fontSize: 12, fontWeight: 700,
              letterSpacing: '1.2px', textTransform: 'uppercase',
              color: '#c8973a', marginBottom: 10,
            }}>OUR APPROACH</p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.2rem',
              color: '#0a1628',
              marginBottom: 14,
            }}>
              Designing Growth Strategy<br />for your money
            </h2>
            <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
              We believe every rupee you earn deserves a plan. Here's how we make that happen.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}>
            {[
              {
                icon: '🛡️',
                step: '01',
                title: 'We secure your life',
                desc: 'So that you can live happily with ease and grace — free from the anxiety of financial uncertainty.',
                color: '#0a6b45',
              },
              {
                icon: '🎓',
                step: '02',
                title: 'We give you the right solution',
                desc: 'Creating sustainability so you can give your children the best education, retire early, and save for the future.',
                color: '#0a1628',
              },
              {
                icon: '📈',
                step: '03',
                title: 'We help you upgrade your lifestyle',
                desc: 'Scale up and reclaim your time and money — to do the things you\'ve always wanted to do, on your terms.',
                color: '#7b3f00',
              },
            ].map((p, i) => (
              <div key={i} style={{
                borderTop: `3px solid #c8973a`,
                padding: '32px 28px',
                background: '#f8f5f0',
                borderRadius: '0 0 12px 12px',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(10,22,40,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: 32, marginBottom: 14 }}>{p.icon}</div>
                <div style={{
                  fontSize: 11, fontWeight: 700,
                  color: '#c8973a', letterSpacing: '1px',
                  textTransform: 'uppercase', marginBottom: 8,
                }}>{p.step}</div>
                <h3 style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.2rem', color: '#0a1628', marginBottom: 12,
                }}>{p.title}</h3>
                <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/about" style={{
              fontSize: 14, fontWeight: 700,
              color: '#c8973a', textDecoration: 'none',
              borderBottom: '2px solid #c8973a', paddingBottom: 2,
            }}>
              Learn more about our approach →
            </Link>
          </div>
        </div>
      </section>

      {/* HELPFUL RESOURCES */}
      <section style={{ padding: '72px 0', background: '#f3f0eb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <p style={{
              fontSize: 12, fontWeight: 700,
              letterSpacing: '1.2px', textTransform: 'uppercase',
              color: '#c8973a', marginBottom: 10,
            }}>LEARN & GROW</p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.2rem',
              color: '#0a1628',
            }}>Helpful resources</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 24,
          }}>
            <ResourceCard icon="📈" title="5 behaviors to boost your financial health" desc="Practices you can adopt right now to become a smarter, more confident investor." cta="Get our tips" to="/resources/financial-health" />
            <ResourceCard icon="📚" title="Resources & education" desc="Helpful articles covering investment basics, market updates, and planning strategies." cta="Read articles" to="/resources" />
            <ResourceCard icon="🧾" title="Tax forms & information" desc="Your most commonly asked tax questions answered, including deadlines and forms." cta="Access tax FAQs" to="/resources/taxes" />
            <ResourceCard icon="📊" title="See how the market is doing" desc="We update key market insights regularly so you can check performance anytime." cta="Market summary" to="/resources/market" />
          </div>
        </div>
      </section>

      {/* AWARD BANNER */}
      <section style={{
        background: '#fff',
        borderTop: '1px solid #ddd8d0',
        borderBottom: '1px solid #ddd8d0',
        padding: '40px 32px',
        textAlign: 'center',
      }}>
        <div className="container">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <div style={{
              width: 60, height: 60,
              background: 'linear-gradient(135deg, #0a1628, #c8973a)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              flexShrink: 0,
            }}>🏆</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#0a1628',
                marginBottom: 4,
              }}>
                Trusted by investors. Built on principles.
              </div>
              <p style={{ color: '#6b7280', fontSize: 13 }}>
                XYZ Investments is committed to low costs, transparency, and putting investors first — always.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
