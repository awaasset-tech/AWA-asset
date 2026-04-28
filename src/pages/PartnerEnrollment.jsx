import React, { useState, useRef } from 'react';

const API_BASE = 'https://awa-backend-v2.onrender.com';

// ── EXACT awaasset.com design tokens ──
const C = {
  navy:       '#0d1452',
  navyMid:    '#1a2260',
  cream:      '#f5f0e8',
  creamLight: '#faf7f2',
  gold:       '#c8973a',
  text:       '#1a1a2e',
  textMuted:  '#6b6b80',
  border:     '#e2d9c8',
  white:      '#ffffff',
  error:      '#c62828',
};

const serif = "'Playfair Display', 'Georgia', serif";
const sans  = "'DM Sans', 'Helvetica Neue', sans-serif";

function Field({ label, required, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.textMuted }}>
        {label} {required && <span style={{ color: C.gold }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function TextInput({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        fontFamily: sans, fontSize: 15, color: C.text,
        background: 'transparent', border: 'none',
        borderBottom: `2px solid ${focused ? C.gold : C.border}`,
        borderRadius: 0, padding: '10px 2px', outline: 'none',
        width: '100%', transition: 'border-color 0.2s', ...style,
      }}
      {...props}
    />
  );
}

function SelectInput({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        fontFamily: sans, fontSize: 15, color: props.value ? C.text : C.textMuted,
        background: 'transparent', border: 'none',
        borderBottom: `2px solid ${focused ? C.gold : C.border}`,
        borderRadius: 0, padding: '10px 2px', outline: 'none',
        width: '100%', cursor: 'pointer', transition: 'border-color 0.2s', ...style,
      }}
      {...props}
    />
  );
}

const DOCS = [
  { key: 'pan_card',         label: 'PAN Card',          icon: '🪪', required: true  },
  { key: 'aadhar_card',      label: 'Aadhaar Card',      icon: '📋', required: true  },
  { key: 'cancelled_cheque', label: 'Cancelled Cheque',  icon: '🏦', required: true  },
  { key: 'nominee_pan',      label: "Nominee's PAN",     icon: '🪪', required: false },
  { key: 'nominee_aadhar',   label: "Nominee's Aadhaar", icon: '📋', required: false },
];

function Card({ step, title, children }) {
  return (
    <div style={{ background: C.creamLight, border: `1px solid ${C.border}`, marginBottom: 20 }}>
      <div style={{ background: C.navy, padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          border: `1.5px solid ${C.gold}`, color: C.gold,
          fontFamily: serif, fontSize: 13, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{step}</div>
        <span style={{ fontFamily: serif, fontSize: 17, fontWeight: 600, color: C.white, letterSpacing: '0.02em' }}>{title}</span>
      </div>
      <div style={{ padding: '28px 28px 32px' }}>{children}</div>
    </div>
  );
}

export default function PartnerEnrollment() {
  const [form, setForm] = useState({ full_name: '', mobile: '', email: '', nominee_name: '', nominee_relationship: '' });
  const [otp, setOtp]             = useState('');
  const [otpSent, setOtpSent]     = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [docs, setDocs]           = useState({});
  const [previews, setPreviews]   = useState({});
  const [status, setStatus]       = useState({ type: '', msg: '' });
  const [loading, setLoading]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileRefs = useRef({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const sendOtp = async () => {
    if (!form.email || !form.full_name) { setStatus({ type: 'error', msg: 'Please enter your name and email first.' }); return; }
    setLoading('otp'); setStatus({ type: '', msg: '' });
    try {
      const res = await fetch(`${API_BASE}/api/send-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, name: form.full_name }),
      });
      const data = await res.json();
      if (res.ok) { setOtpSent(true); setStatus({ type: 'ok', msg: `OTP sent to ${form.email}` }); }
      else setStatus({ type: 'error', msg: data.message || 'Failed to send OTP.' });
    } catch { setStatus({ type: 'error', msg: 'Network error. Try again.' }); }
    setLoading('');
  };

  const verifyOtp = async () => {
    if (!otp) return;
    setLoading('verify'); setStatus({ type: '', msg: '' });
    try {
      const res = await fetch(`${API_BASE}/api/verify-otp`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });
      const data = await res.json();
      if (res.ok) { setOtpVerified(true); setStatus({ type: 'ok', msg: 'Email verified ✓' }); }
      else setStatus({ type: 'error', msg: data.message || 'Invalid OTP.' });
    } catch { setStatus({ type: 'error', msg: 'Network error. Try again.' }); }
    setLoading('');
  };

  const handleFile = (key, file) => {
    if (!file) return;
    setDocs(d => ({ ...d, [key]: file }));
    const r = new FileReader();
    r.onload = e => setPreviews(p => ({ ...p, [key]: e.target.result }));
    r.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!otpVerified) { setStatus({ type: 'error', msg: 'Please verify your email first.' }); return; }
    const missing = DOCS.filter(d => d.required && !docs[d.key]).map(d => d.label);
    if (missing.length) { setStatus({ type: 'error', msg: `Please upload: ${missing.join(', ')}` }); return; }
    if (!form.full_name || !form.mobile || !form.email || !form.nominee_name) { setStatus({ type: 'error', msg: 'Please fill all required fields.' }); return; }
    setLoading('submit'); setStatus({ type: '', msg: '' });
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      DOCS.forEach(({ key }) => { if (docs[key]) fd.append(key, docs[key]); });
      const res = await fetch(`${API_BASE}/api/enroll`, { method: 'POST', body: fd });
      if (res.ok) setSubmitted(true);
      else { const d = await res.json(); setStatus({ type: 'error', msg: d.message || 'Submission failed.' }); }
    } catch { setStatus({ type: 'error', msg: 'Network error. Try again.' }); }
    setLoading('');
  };

  if (submitted) return (
    <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: C.creamLight, border: `1px solid ${C.border}`, padding: '56px 48px', maxWidth: 520, width: '100%', textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: C.navy, border: `3px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 26, color: C.gold }}>✓</div>
        <h2 style={{ fontFamily: serif, fontSize: 32, fontWeight: 700, color: C.navy, marginBottom: 16 }}>Welcome to AWA Asset</h2>
        <p style={{ fontFamily: sans, color: C.textMuted, lineHeight: 1.8, marginBottom: 8 }}>
          Your enrollment has been received. A welcome email has been sent to <strong style={{ color: C.text }}>{form.email}</strong>.
        </p>
        <p style={{ fontFamily: sans, color: C.textMuted, lineHeight: 1.8, marginBottom: 36 }}>
          Our team will reach out within 1–2 business days to complete your onboarding.
        </p>
        <a href="/" style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: C.gold, color: C.white, padding: '14px 36px', textDecoration: 'none', display: 'inline-block' }}>
          Back to Home
        </a>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: C.cream, fontFamily: sans }}>

      {/* HERO — dark navy like awaasset.com */}
      <div style={{ background: `linear-gradient(160deg, ${C.navy} 0%, ${C.navyMid} 100%)`, padding: 'clamp(48px,8vw,80px) 24px clamp(40px,6vw,64px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', border: `1px solid rgba(200,151,58,0.12)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 40, width: 180, height: 180, borderRadius: '50%', border: `1px solid rgba(200,151,58,0.08)`, pointerEvents: 'none' }} />
        <p style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.gold, marginBottom: 16 }}>
          Distribution Manager Program
        </p>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(32px,6vw,54px)', fontWeight: 700, color: C.white, marginBottom: 20, lineHeight: 1.15 }}>
          Become a Partner
        </h1>
        <div style={{ width: 48, height: 2, background: C.gold, margin: '0 auto 20px' }} />
        <p style={{ fontFamily: sans, fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
          Join AWA Asset's network of Distribution Managers and build a rewarding career in wealth management.
        </p>
      </div>

      {/* BREADCRUMB */}
      <div style={{ background: C.creamLight, borderBottom: `1px solid ${C.border}`, padding: '10px 24px', display: 'flex', gap: 6, alignItems: 'center' }}>
        {['Home', 'Partners', 'Enroll'].map((s, i, arr) => (
          <React.Fragment key={s}>
            <span style={{ fontFamily: sans, fontSize: 12, color: i < arr.length - 1 ? C.gold : C.textMuted, fontWeight: i < arr.length - 1 ? 500 : 400 }}>{s}</span>
            {i < arr.length - 1 && <span style={{ color: C.border, fontSize: 12 }}>›</span>}
          </React.Fragment>
        ))}
      </div>

      {/* FORM */}
      <div style={{ maxWidth: 740, margin: '36px auto 80px', padding: '0 16px' }}>

        {status.msg && (
          <div style={{ marginBottom: 20, padding: '14px 20px', background: status.type === 'error' ? '#fff5f5' : '#fffbf0', border: `1px solid ${status.type === 'error' ? '#fca5a5' : C.gold}`, color: status.type === 'error' ? C.error : C.navy, fontFamily: sans, fontSize: 14 }}>
            {status.msg}
          </div>
        )}

        {/* 1 — Personal Details */}
        <Card step="1" title="Personal Details">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 28 }}>
            <Field label="Full Name" required>
              <TextInput placeholder="As per PAN card" value={form.full_name} onChange={e => set('full_name', e.target.value)} />
            </Field>
            <Field label="Mobile Number" required>
              <TextInput type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={e => set('mobile', e.target.value)} maxLength={13} />
            </Field>
          </div>
        </Card>

        {/* 2 — Email Verification */}
        <Card step="2" title={`Email Verification${otpVerified ? ' ✓' : ''}`}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 240px' }}>
              <Field label="Email Address" required>
                <TextInput type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} disabled={otpVerified} />
              </Field>
            </div>
            {!otpVerified && (
              <button onClick={sendOtp} disabled={loading === 'otp'} style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: loading === 'otp' ? C.border : C.navy, color: C.white, border: 'none', padding: '12px 24px', cursor: 'pointer', transition: 'background 0.2s', whiteSpace: 'nowrap' }}>
                {loading === 'otp' ? 'Sending…' : otpSent ? 'Resend OTP' : 'Send OTP'}
              </button>
            )}
          </div>
          {otpSent && !otpVerified && (
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap', marginTop: 24 }}>
              <div style={{ flex: '1 1 180px' }}>
                <Field label="Enter OTP">
                  <TextInput type="text" placeholder="6-digit code" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} style={{ letterSpacing: '0.25em', fontSize: 20 }} />
                </Field>
              </div>
              <button onClick={verifyOtp} disabled={loading === 'verify'} style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', background: C.gold, color: C.white, border: 'none', padding: '12px 28px', cursor: 'pointer', opacity: loading === 'verify' ? 0.7 : 1 }}>
                {loading === 'verify' ? 'Verifying…' : 'Verify'}
              </button>
            </div>
          )}
        </Card>

        {/* 3 — Nominee */}
        <Card step="3" title="Nominee Information">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 28 }}>
            <Field label="Nominee Full Name" required>
              <TextInput placeholder="Nominee's legal name" value={form.nominee_name} onChange={e => set('nominee_name', e.target.value)} />
            </Field>
            <Field label="Relationship">
              <SelectInput value={form.nominee_relationship} onChange={e => set('nominee_relationship', e.target.value)}>
                <option value="">Select relationship</option>
                {['Spouse','Father','Mother','Son','Daughter','Brother','Sister','Other'].map(r => <option key={r} value={r}>{r}</option>)}
              </SelectInput>
            </Field>
          </div>
        </Card>

        {/* 4 — Documents */}
        <Card step="4" title="KYC Documents">
          <p style={{ fontFamily: sans, fontSize: 13, color: C.textMuted, marginBottom: 24, lineHeight: 1.7 }}>
            Upload clear scans or photos · JPG, PNG, PDF · Max 5MB each
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 14 }}>
            {DOCS.map(({ key, label, icon, required }) => {
              const uploaded = !!docs[key];
              return (
                <div key={key} onClick={() => fileRefs.current[key]?.click()} style={{ border: `2px dashed ${uploaded ? C.gold : C.border}`, padding: '22px 14px', cursor: 'pointer', textAlign: 'center', background: uploaded ? 'rgba(200,151,58,0.06)' : C.creamLight, transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minHeight: 120 }}>
                  <input type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: 'none' }} ref={el => fileRefs.current[key] = el} onChange={e => handleFile(key, e.target.files[0])} />
                  {previews[key]?.startsWith('data:image') ? (
                    <img src={previews[key]} alt={label} style={{ width: '100%', maxHeight: 52, objectFit: 'cover' }} />
                  ) : (
                    <span style={{ fontSize: 26 }}>{uploaded ? '📄' : icon}</span>
                  )}
                  <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: uploaded ? C.gold : C.text, lineHeight: 1.4 }}>
                    {uploaded ? docs[key].name.slice(0, 22) : label}
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: uploaded ? C.gold : required ? C.error : C.textMuted }}>
                    {uploaded ? '✓ UPLOADED' : required ? 'REQUIRED' : 'OPTIONAL'}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          <button onClick={() => window.history.back()} style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: 'transparent', color: C.textMuted, border: `1px solid ${C.border}`, padding: '12px 24px', cursor: 'pointer' }}>
            ← Back
          </button>
          <button onClick={handleSubmit} disabled={loading === 'submit'} style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: loading === 'submit' ? C.border : C.gold, color: C.white, border: 'none', padding: '15px 44px', cursor: loading === 'submit' ? 'not-allowed' : 'pointer', transition: 'background 0.2s', minWidth: 200 }}>
            {loading === 'submit' ? 'Submitting…' : 'Submit Enrollment →'}
          </button>
        </div>

        <p style={{ fontFamily: sans, textAlign: 'center', color: C.textMuted, fontSize: 11, marginTop: 24, lineHeight: 1.8, letterSpacing: '0.02em' }}>
          By submitting, you agree to AWA Asset's terms and consent to KYC processing.<br />
          All data is encrypted and stored securely.
        </p>
      </div>
    </div>
  );
}
