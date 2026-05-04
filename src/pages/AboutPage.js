import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Landmark, Handshake,
  Target, Sparkles,
  Shield, GraduationCap, TrendingUp,
  Rocket, Flag
} from 'lucide-react';

/* ---- StatPill ---- */
function StatPill({ value, label, icon }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(229,181,90,0.2)',
      borderRadius: 12,
      padding: '28px 24px',
      textAlign: 'center',
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{icon}</div>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '2rem',
        fontWeight: 700,
        color: '#e5b55a',
        lineHeight: 1,
        marginBottom: 8,
      }}>{value}</div>
      <div style={{ color: '#9aaec4', fontSize: 13, lineHeight: 1.5 }}>{label}</div>
    </div>
  );
}

/* ---- Message card ---- */
function MessageCard({ icon, audience, title, body, accentColor, to }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: `2px solid ${hovered ? accentColor : '#ddd8d0'}`,
        borderRadius: 12,
        padding: '36px 32px',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 16px 40px ${accentColor}20` : '0 4px 16px rgba(10,22,40,0.06)',
        flex: '1 1 300px',
      }}
    >
      <div style={{
        width: 52, height: 52,
        background: `${accentColor}15`,
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
      }}>{icon}</div>

      <div style={{
        fontSize: 11, fontWeight: 700,
        letterSpacing: '1px', textTransform: 'uppercase',
        color: accentColor, marginBottom: 8,
      }}>{audience}</div>

      <h3 style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: '1.3rem',
        color: '#0a1628',
        marginBottom: 16,
        lineHeight: 1.3,
      }}>{title}</h3>

      <p style={{
        color: '#6b7280',
        fontSize: 14,
        lineHeight: 1.75,
        marginBottom: 24,
      }}>{body}</p>

      <Link to={to} style={{
        fontSize: 13,
        fontWeight: 700,
        color: accentColor,
        textDecoration: 'none',
        borderBottom: `2px solid ${accentColor}`,
        paddingBottom: 2,
      }}>
        Learn more →
      </Link>
    </div>
  );
}

/* ---- Growth strategy item ---- */
function GrowthItem({ number, icon, headline, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: 24,
        padding: '28px 0',
        borderBottom: '1px solid #f0ece6',
        transition: 'transform 0.2s',
        transform: hovered ? 'translateX(6px)' : 'none',
      }}
    >
      <div style={{
        width: 48, height: 48,
        background: hovered ? '#0a1628' : '#f8f5f0',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        transition: 'background 0.2s',
      }}>{icon(hovered)}</div>
      <div>
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '1.15rem',
          color: '#0a1628',
          marginBottom: 8,
          fontWeight: 600,
        }}>{headline}</div>
        <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

/* ============================== */
export default function AboutPage() {
  return (
    <main>

      {/* MISSION & VISION */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{
              fontSize: 12, fontWeight: 700,
              letterSpacing: '1.2px', textTransform: 'uppercase',
              color: '#c8973a', marginBottom: 10,
            }}>What Drives Us</p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.2rem', color: '#0a1628',
            }}>Our Mission & Vision</h2>
          </div>

          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {/* MISSION */}
            <div style={{
              flex: '1 1 300px',
              background: 'linear-gradient(135deg, #0a1628 0%, #1d3461 100%)',
              borderRadius: 14,
              padding: '44px 36px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 160, height: 160, borderRadius: '50%',
                background: 'rgba(229,181,90,0.07)',
              }} />
              <div style={{ marginBottom: 20 }}>
                <Target size={36} color="#c8973a" strokeWidth={1.5} />
              </div>
              <div style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#e5b55a', marginBottom: 12,
              }}>Our Mission</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem', color: '#fff',
                lineHeight: 1.3, marginBottom: 16,
              }}>
                Financial Education<br />as a Primary Focus
              </h3>
              <div style={{
                width: 40, height: 3,
                background: 'linear-gradient(90deg, #c8973a, #e5b55a)',
                borderRadius: 2, marginBottom: 18,
              }} />
              <p style={{ color: '#9aaec4', fontSize: 14, lineHeight: 1.75 }}>
                To make financial education a primary focus in our community —
                and to empower this generation and generations to come
                with financial stability.
              </p>
            </div>

            {/* VISION */}
            <div style={{
              flex: '1 1 300px',
              background: '#f8f5f0',
              border: '2px solid #ddd8d0',
              borderRadius: 14,
              padding: '44px 36px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -30, right: -30,
                width: 160, height: 160, borderRadius: '50%',
                background: 'rgba(200,151,58,0.07)',
              }} />
              <div style={{ marginBottom: 20 }}>
                <Flag size={36} color="#c8973a" strokeWidth={1.5} />
              </div>
              <div style={{
                fontSize: 11, fontWeight: 700,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#c8973a', marginBottom: 12,
              }}>Our Vision</div>
              <h3 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.5rem', color: '#0a1628',
                lineHeight: 1.3, marginBottom: 16,
              }}>
                A Financially Stable<br />Community
              </h3>
              <div style={{
                width: 40, height: 3,
                background: 'linear-gradient(90deg, #c8973a, #e5b55a)',
                borderRadius: 2, marginBottom: 18,
              }} />
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.75 }}>
                To live in a financially stable community that uses economic
                enlightenment to empower the people — creating lasting
                freedom and opportunity for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MESSAGES — CLIENTS & PARTNERS */}
      <section style={{ padding: '80px 0', background: '#f3f0eb' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{
              fontSize: 12, fontWeight: 700,
              letterSpacing: '1.2px', textTransform: 'uppercase',
              color: '#c8973a', marginBottom: 10,
            }}>Who We Serve</p>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2.2rem', color: '#0a1628',
              marginBottom: 14,
            }}>A message from us</h2>
            <p style={{ color: '#6b7280', fontSize: 15, maxWidth: 480, margin: '0 auto' }}>
              Whether you're a client seeking guidance or a partner building a practice —
              we're in your corner.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <MessageCard
              icon={<Handshake size={24} color="#c8973a" strokeWidth={1.5} />}
              audience="Message to our Clients"
              title="Your satisfaction is our sharp focus"
              body="We take pride in our focus on customer satisfaction. Our job is to educate you, find the right solution for your specific situation, and become your trusted guide for every financial decision. We focus on your needs and affordability — always."
              accentColor="#c8973a"
              to="/open-account"
            />
            <MessageCard
              icon={<Rocket size={24} color="#1d6b8a" strokeWidth={1.5} />}
              audience="Message to our Partners"
              title="We grind side by side with you"
              body="We are here to help you achieve your goals and train you to become the best financial planner you can be. We work shoulder to shoulder with you to give our clients the best possible products within our Customer First environment."
              accentColor="#1d6b8a"
              to="/advice"
            />
          </div>
        </div>
      </section>

      {/* GROWTH STRATEGY */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}>
            <div style={{ position: 'sticky', top: 100 }}>
              <p style={{
                fontSize: 12, fontWeight: 700,
                letterSpacing: '1.2px', textTransform: 'uppercase',
                color: '#c8973a', marginBottom: 12,
              }}>What We Do For You</p>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '2.4rem', color: '#0a1628',
                lineHeight: 1.2, marginBottom: 20,
              }}>
                Designing Growth Strategy<br />
                <span style={{ color: '#c8973a' }}>for your money</span>
              </h2>
              <div style={{
                width: 50, height: 3,
                background: 'linear-gradient(90deg, #c8973a, #e5b55a)',
                borderRadius: 2, marginBottom: 24,
              }} />
              <p style={{
                color: '#6b7280', fontSize: 15,
                lineHeight: 1.75, marginBottom: 32,
              }}>
                We believe every rupee you earn deserves a plan.
                Our approach is built around three core commitments
                that create lasting financial freedom.
              </p>
              <Link to="/open-account" style={{
                display: 'inline-block',
                background: '#0a1628', color: '#fff',
                padding: '13px 28px', borderRadius: 4,
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 700, fontSize: 14,
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#c8973a'}
                onMouseLeave={e => e.currentTarget.style.background = '#0a1628'}
              >
                Build your strategy →
              </Link>
            </div>

            <div>
              <GrowthItem
                number="1"
                icon={(hovered) => <Shield size={22} color={hovered ? '#c8973a' : '#0a1628'} strokeWidth={1.5} />}
                headline="We secure your life"
                desc="So that you can live happily with ease and grace — without the anxiety of financial uncertainty hanging over you or your family."
              />
              <GrowthItem
                number="2"
                icon={(hovered) => <GraduationCap size={22} color={hovered ? '#c8973a' : '#0a1628'} strokeWidth={1.5} />}
                headline="We give you the right solution"
                desc="Creating sustainability so you can give your children the best education, retire early, and save confidently for the future."
              />
              <GrowthItem
                number="3"
                icon={(hovered) => <TrendingUp size={22} color={hovered ? '#c8973a' : '#0a1628'} strokeWidth={1.5} />}
                headline="We help you upgrade your lifestyle"
                desc="So you can scale up, gain back your time and money, and finally do the things you've always wanted to do — on your terms."
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{
        padding: '72px 0',
        background: 'linear-gradient(135deg, #0a1628 0%, #112240 50%, #1d3461 100%)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '2rem', color: '#fff', marginBottom: 12,
            }}>You're in good company</h2>
            <p style={{ color: '#9aaec4', fontSize: 15 }}>
              Trusted by families, professionals, and partners across India.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 20,
          }}>
            <StatPill icon={<Users size={28} color="#e5b55a" strokeWidth={1.5} />} value="10,000+" label="families guided toward financial freedom" />
            <StatPill icon={<Landmark size={28} color="#e5b55a" strokeWidth={1.5} />} value="Multi-Asset" label="expertise across equity, debt, insurance & more" />
            <StatPill icon={<Handshake size={28} color="#e5b55a" strokeWidth={1.5} />} value="500+" label="partner advisors trained and empowered" />
            <StatPill icon={<TrendingUp size={28} color="#e5b55a" strokeWidth={1.5} />} value="#1" label="focus: financial education in our community" />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        padding: '72px 32px',
        background: '#f8f5f0',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.2rem', color: '#0a1628',
            marginBottom: 14,
          }}>Ready to start your journey?</h2>
          <p style={{
            color: '#6b7280', fontSize: 15,
            maxWidth: 460, margin: '0 auto 32px',
            lineHeight: 1.7,
          }}>
            Whether you're a first-time investor or looking to grow an existing portfolio,
            we're here to guide you every step of the way.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/open-account" style={{
              background: '#c8973a', color: '#fff',
              padding: '13px 30px', borderRadius: 4,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700, fontSize: 15,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#0a1628'}
              onMouseLeave={e => e.currentTarget.style.background = '#c8973a'}
            >
              Open an account
            </Link>
            <Link to="/advice" style={{
              background: 'transparent', color: '#0a1628',
              padding: '12px 28px', borderRadius: 4,
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 700, fontSize: 15,
              border: '2px solid #0a1628',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a1628'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a1628'; }}
            >
              Talk to an advisor
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
