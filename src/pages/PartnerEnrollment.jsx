import { useState } from "react";
import { Upload, CheckCircle, ChevronRight, Shield, Users, TrendingUp, FileText, Phone, Mail, User, CreditCard, X, ArrowRight, Star, Award } from "lucide-react";

const KYC_URL =
  "https://digiavatar-kyc.anandrathi.com/SIGNUP?RMCODE=607138&REFID=WQAAPGHNMYYE93G1F9HSQR47SM&TS=FRDEFAULT&DS=F2_N";

const DOCS = [
  { id: "pan", label: "PAN Card", icon: CreditCard, hint: "Your Income Tax PAN" },
  { id: "aadhar", label: "Aadhaar Card", icon: Shield, hint: "12-digit Aadhaar" },
  { id: "cheque", label: "Cancelled Cheque", icon: FileText, hint: "For bank verification" },
  { id: "nomineePan", label: "Nominee PAN", icon: CreditCard, hint: "Nominee's PAN card" },
  { id: "nomineeAadhar", label: "Nominee Aadhaar", icon: Shield, hint: "Nominee's Aadhaar" },
];

const STEPS = ["Personal Info", "Nominee", "Documents", "Complete"];

function StepIndicator({ current }) {
  return (
    <div className="step-bar">
      {STEPS.map((s, i) => (
        <div key={s} className={`step-item ${i < current ? "done" : i === current ? "active" : ""}`}>
          <div className="step-dot">
            {i < current ? <CheckCircle size={14} strokeWidth={2} /> : <span>{i + 1}</span>}
          </div>
          <span className="step-label">{s}</span>
          {i < STEPS.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  );
}

function OtpField({ value, onChange, onSend, sent, verified, setVerified }) {
  const [otp, setOtp] = useState("");
  const [checking, setChecking] = useState(false);

  const verify = () => {
    setChecking(true);
    setTimeout(() => { setChecking(false); setVerified(true); }, 900);
  };

  return (
    <div className="otp-group">
      <div className="input-row">
        <input
          type="tel"
          placeholder="+91 Mobile Number"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="field"
          maxLength={13}
        />
        <button className="btn-outline" onClick={onSend} disabled={sent || value.length < 10}>
          {sent ? "Resend" : "Send OTP"}
        </button>
      </div>
      {sent && !verified && (
        <div className="input-row" style={{ marginTop: 8 }}>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="field"
            maxLength={6}
          />
          <button className="btn-outline" onClick={verify} disabled={otp.length < 4 || checking}>
            {checking ? "…" : "Verify"}
          </button>
        </div>
      )}
      {verified && (
        <div className="verified-badge">
          <CheckCircle size={14} strokeWidth={2} /> Mobile verified
        </div>
      )}
    </div>
  );
}

function DocUpload({ doc, file, onChange }) {
  const Icon = doc.icon;
  return (
    <label className={`doc-card ${file ? "uploaded" : ""}`}>
      <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={e => onChange(doc.id, e.target.files[0])} style={{ display: "none" }} />
      <div className="doc-icon"><Icon size={20} strokeWidth={1.5} /></div>
      <div className="doc-info">
        <span className="doc-label">{doc.label}</span>
        <span className="doc-hint">{file ? file.name : doc.hint}</span>
      </div>
      {file
        ? <CheckCircle size={18} strokeWidth={2} className="doc-check" />
        : <Upload size={16} strokeWidth={1.5} className="doc-upload-icon" />}
    </label>
  );
}

export default function PartnerEnrollment() {
  const [step, setStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [files, setFiles] = useState({});
  const [form, setForm] = useState({ name: "", mobile: "", email: "", nomineeName: "" });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleFile = (id, f) => setFiles(prev => ({ ...prev, [id]: f }));

  const step0Valid = form.name && mobileVerified && form.email;
  const step1Valid = form.nomineeName;
  const step2Valid = DOCS.every(d => files[d.id]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Crimson+Pro:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #f5f0e8; font-family: 'Crimson Pro', Georgia, serif; color: #1a1a2e; }

        .page { min-height: 100vh; display: flex; flex-direction: column; }

        /* ── NAV ── */
        .nav {
          background: #0d1452;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px; height: 64px;
          border-bottom: 1px solid rgba(200,151,58,0.3);
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700;
          color: #f5f0e8; letter-spacing: 0.04em;
        }
        .nav-logo span { color: #c8973a; }
        .nav-link { color: rgba(245,240,232,0.65); font-size: 0.9rem; text-decoration: none; transition: color .2s; }
        .nav-link:hover { color: #c8973a; }

        /* ── HERO ── */
        .hero {
          background: #0d1452;
          padding: 56px 40px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 70% 60% at 50% 100%, rgba(200,151,58,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-eyebrow {
          font-family: 'Crimson Pro', serif; font-size: 0.85rem; letter-spacing: 0.2em;
          color: #c8973a; text-transform: uppercase; margin-bottom: 16px;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700; color: #f5f0e8;
          line-height: 1.15; margin-bottom: 16px;
        }
        .hero-title em { color: #c8973a; font-style: normal; }
        .hero-sub {
          font-size: 1.1rem; color: rgba(245,240,232,0.7);
          max-width: 560px; margin: 0 auto 36px; line-height: 1.65;
          font-weight: 300;
        }

        /* ── KYC BANNER ── */
        .kyc-banner {
          background: linear-gradient(135deg, #c8973a 0%, #a87730 100%);
          border-radius: 12px; max-width: 560px; margin: 0 auto;
          padding: 20px 28px; display: flex; align-items: center; gap: 16px;
          box-shadow: 0 8px 32px rgba(200,151,58,0.35);
          cursor: pointer; text-decoration: none;
          transition: transform .2s, box-shadow .2s;
        }
        .kyc-banner:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(200,151,58,0.45); }
        .kyc-icon { background: rgba(255,255,255,0.2); border-radius: 50%; padding: 10px; flex-shrink: 0; }
        .kyc-text { flex: 1; text-align: left; }
        .kyc-label { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #fff; font-weight: 600; }
        .kyc-sub { font-size: 0.85rem; color: rgba(255,255,255,0.85); margin-top: 2px; }
        .kyc-arrow { color: rgba(255,255,255,0.8); flex-shrink: 0; }

        /* ── STATS ── */
        .stats {
          background: #f5f0e8; padding: 28px 40px;
          display: flex; justify-content: center; gap: 64px;
          border-bottom: 1px solid rgba(13,20,82,0.1);
        }
        .stat { text-align: center; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 700; color: #0d1452;
        }
        .stat-label { font-size: 0.8rem; color: #666; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }

        /* ── CONTENT ── */
        .content { display: flex; gap: 0; flex: 1; max-width: 1100px; margin: 0 auto; width: 100%; padding: 48px 24px; align-items: flex-start; }

        /* ── SIDEBAR ── */
        .sidebar { width: 300px; flex-shrink: 0; margin-right: 48px; position: sticky; top: 24px; }
        .sidebar-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: #0d1452; margin-bottom: 20px; }
        .benefit-item { display: flex; gap: 12px; margin-bottom: 20px; align-items: flex-start; }
        .benefit-icon { color: #c8973a; flex-shrink: 0; margin-top: 2px; }
        .benefit-text strong { display: block; font-size: 0.95rem; color: #0d1452; font-weight: 500; margin-bottom: 2px; }
        .benefit-text span { font-size: 0.85rem; color: #666; line-height: 1.5; }
        .sidebar-divider { height: 1px; background: rgba(13,20,82,0.12); margin: 24px 0; }
        .already-link {
          display: flex; align-items: center; gap: 8px; font-size: 0.9rem;
          color: #0d1452; text-decoration: none; font-weight: 500;
        }
        .already-link:hover { color: #c8973a; }

        /* ── FORM CARD ── */
        .form-card {
          flex: 1; background: #fff;
          border-radius: 16px; padding: 40px;
          box-shadow: 0 4px 24px rgba(13,20,82,0.07);
          border: 1px solid rgba(13,20,82,0.06);
        }

        /* ── STEP BAR ── */
        .step-bar {
          display: flex; align-items: center; margin-bottom: 36px;
        }
        .step-item {
          display: flex; align-items: center; gap: 8px; position: relative;
        }
        .step-dot {
          width: 28px; height: 28px; border-radius: 50%;
          border: 2px solid #ddd; background: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; color: #999; flex-shrink: 0; transition: all .3s;
        }
        .step-item.active .step-dot { border-color: #0d1452; background: #0d1452; color: #fff; }
        .step-item.done .step-dot { border-color: #c8973a; background: #c8973a; color: #fff; }
        .step-label { font-size: 0.78rem; color: #999; white-space: nowrap; transition: color .3s; }
        .step-item.active .step-label { color: #0d1452; font-weight: 600; }
        .step-item.done .step-label { color: #c8973a; }
        .step-line { width: 32px; height: 2px; background: #e5e5e5; margin: 0 8px; flex-shrink: 0; }
        .step-item.done + .step-item .step-line,
        .step-item.done .step-line { background: #c8973a; }

        /* ── FORM ELEMENTS ── */
        .form-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem; color: #0d1452; margin-bottom: 6px;
        }
        .form-section-sub { font-size: 0.9rem; color: #777; margin-bottom: 28px; }

        .field-group { margin-bottom: 20px; }
        .field-label { font-size: 0.8rem; color: #444; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; display: block; }
        .field {
          width: 100%; padding: 12px 16px;
          border: 1.5px solid #e0ddd6; border-radius: 8px;
          font-family: 'Crimson Pro', serif; font-size: 1rem; color: #1a1a2e;
          background: #fdfcfa; outline: none; transition: border-color .2s;
        }
        .field:focus { border-color: #0d1452; background: #fff; }
        .field::placeholder { color: #bbb; }

        .otp-group { display: flex; flex-direction: column; gap: 0; }
        .input-row { display: flex; gap: 10px; }
        .input-row .field { flex: 1; }

        .btn-outline {
          padding: 12px 18px; border: 1.5px solid #0d1452; border-radius: 8px;
          background: transparent; color: #0d1452; font-family: 'Crimson Pro', serif;
          font-size: 0.9rem; cursor: pointer; white-space: nowrap; transition: all .2s;
          flex-shrink: 0;
        }
        .btn-outline:hover:not(:disabled) { background: #0d1452; color: #fff; }
        .btn-outline:disabled { opacity: 0.45; cursor: not-allowed; }

        .verified-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.82rem; color: #2d7a5e; margin-top: 8px;
          background: #eaf7f2; border-radius: 20px; padding: 4px 12px;
        }

        /* ── DOCS ── */
        .docs-grid { display: flex; flex-direction: column; gap: 10px; }
        .doc-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 10px;
          border: 1.5px dashed #d5d0c8; background: #fdfcfa;
          cursor: pointer; transition: all .2s;
        }
        .doc-card:hover { border-color: #c8973a; background: #fdf8f0; }
        .doc-card.uploaded { border-color: #c8973a; border-style: solid; background: #fdf8f0; }
        .doc-icon { color: #c8973a; flex-shrink: 0; }
        .doc-info { flex: 1; }
        .doc-label { display: block; font-size: 0.92rem; color: #0d1452; font-weight: 500; }
        .doc-hint { display: block; font-size: 0.78rem; color: #999; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 220px; }
        .doc-check { color: #c8973a; flex-shrink: 0; }
        .doc-upload-icon { color: #bbb; flex-shrink: 0; }

        /* ── BUTTONS ── */
        .actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 32px; }
        .btn-back {
          padding: 14px 24px; border: 1.5px solid #ddd; border-radius: 8px;
          background: transparent; color: #666; font-family: 'Crimson Pro', serif;
          font-size: 1rem; cursor: pointer; transition: all .2s;
        }
        .btn-back:hover { border-color: #0d1452; color: #0d1452; }
        .btn-primary {
          padding: 14px 32px; border: none; border-radius: 8px;
          background: #0d1452; color: #f5f0e8; font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 600; cursor: pointer;
          transition: all .2s; display: flex; align-items: center; gap: 8px;
          letter-spacing: 0.03em;
        }
        .btn-primary:hover:not(:disabled) { background: #c8973a; color: #fff; }
        .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

        /* ── SUCCESS ── */
        .success-view { text-align: center; padding: 20px 0; }
        .success-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: linear-gradient(135deg, #c8973a, #a87730);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
        }
        .success-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #0d1452; margin-bottom: 10px; }
        .success-sub { color: #666; font-size: 1rem; line-height: 1.65; max-width: 380px; margin: 0 auto 32px; }
        .dm-id-box {
          background: #f5f0e8; border: 1px solid rgba(200,151,58,0.4);
          border-radius: 10px; padding: 20px; display: inline-flex;
          flex-direction: column; align-items: center; gap: 4px; margin-bottom: 28px;
        }
        .dm-id-label { font-size: 0.75rem; color: #999; letter-spacing: 0.12em; text-transform: uppercase; }
        .dm-id-value { font-family: 'Playfair Display', serif; font-size: 2rem; color: #0d1452; font-weight: 700; letter-spacing: 0.1em; }

        .kyc-cta {
          display: inline-flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, #c8973a, #a87730);
          color: #fff; text-decoration: none; border-radius: 10px;
          padding: 16px 28px; font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 600; transition: all .2s;
          box-shadow: 0 6px 20px rgba(200,151,58,0.35);
        }
        .kyc-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(200,151,58,0.45); }

        /* ── FOOTER ── */
        .footer {
          background: #0d1452; padding: 24px 40px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .footer-logo { font-family: 'Playfair Display', serif; color: #f5f0e8; font-size: 1rem; }
        .footer-logo span { color: #c8973a; }
        .footer-copy { font-size: 0.78rem; color: rgba(245,240,232,0.4); }

        @media (max-width: 768px) {
          .content { flex-direction: column; padding: 24px 16px; }
          .sidebar { width: 100%; position: static; margin-right: 0; margin-bottom: 28px; }
          .stats { gap: 32px; padding: 20px; }
          .hero { padding: 40px 20px 48px; }
          .form-card { padding: 24px 20px; }
          .nav { padding: 0 20px; }
          .footer { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="page">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo">AWA <span>Asset</span></div>
          <a href="#" className="nav-link">← Back to Home</a>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="hero-eyebrow">Distribution Manager Program</div>
          <h1 className="hero-title">
            Build Wealth.<br />
            <em>Build Futures.</em>
          </h1>
          <p className="hero-sub">
            Join AWA Asset's nationwide network of Distribution Managers. Earn while empowering your clients with India's finest portfolio management solutions.
          </p>

          {/* KYC BANNER */}
          <a href={KYC_URL} target="_blank" rel="noopener noreferrer" className="kyc-banner">
            <div className="kyc-icon">
              <Award size={22} color="#fff" strokeWidth={1.5} />
            </div>
            <div className="kyc-text">
              <div className="kyc-label">Complete Your KYC with Anand Rathi</div>
              <div className="kyc-sub">Instant digital verification · Secure · Takes under 5 minutes</div>
            </div>
            <div className="kyc-arrow">
              <ArrowRight size={20} strokeWidth={1.5} />
            </div>
          </a>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stat">
            <div className="stat-num">₹500Cr+</div>
            <div className="stat-label">Assets Managed</div>
          </div>
          <div className="stat">
            <div className="stat-num">128+</div>
            <div className="stat-label">Active DMs</div>
          </div>
          <div className="stat">
            <div className="stat-num">15+</div>
            <div className="stat-label">Cities</div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">
          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="sidebar-title">Why become a DM?</div>

            {[
              { icon: TrendingUp, title: "Competitive Commissions", desc: "Industry-leading revenue sharing on every client you bring." },
              { icon: Shield, title: "Full Regulatory Support", desc: "SEBI-compliant framework. We handle compliance so you don't have to." },
              { icon: Users, title: "Dedicated RM Desk", desc: "Your personal relationship manager available whenever you need." },
              { icon: Star, title: "Training & Certification", desc: "Regular product training, market updates, and sales support." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="benefit-item">
                <div className="benefit-icon"><Icon size={18} strokeWidth={1.5} /></div>
                <div className="benefit-text">
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}

            <div className="sidebar-divider" />
            <a href="#" className="already-link">
              Already a DM? Sign in <ChevronRight size={14} />
            </a>
          </aside>

          {/* FORM CARD */}
          <div className="form-card">
            {step < 3 && <StepIndicator current={step} />}

            {/* STEP 0 — Personal Info */}
            {step === 0 && (
              <>
                <div className="form-section-title">Personal Information</div>
                <div className="form-section-sub">Tell us about yourself — all fields are required.</div>

                <div className="field-group">
                  <label className="field-label"><User size={12} strokeWidth={2} style={{ display: "inline", marginRight: 4 }} />Full Name</label>
                  <input className="field" placeholder="As per PAN card" value={form.name} onChange={e => set("name", e.target.value)} />
                </div>

                <div className="field-group">
                  <label className="field-label"><Phone size={12} strokeWidth={2} style={{ display: "inline", marginRight: 4 }} />Mobile Number</label>
                  <OtpField
                    value={form.mobile}
                    onChange={v => set("mobile", v)}
                    onSend={() => setOtpSent(true)}
                    sent={otpSent}
                    verified={mobileVerified}
                    setVerified={setMobileVerified}
                  />
                </div>

                <div className="field-group">
                  <label className="field-label"><Mail size={12} strokeWidth={2} style={{ display: "inline", marginRight: 4 }} />Email Address</label>
                  <input className="field" type="email" placeholder="your@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
                </div>

                <div className="actions">
                  <button className="btn-primary" disabled={!step0Valid} onClick={() => setStep(1)}>
                    Continue <ChevronRight size={16} strokeWidth={2} />
                  </button>
                </div>
              </>
            )}

            {/* STEP 1 — Nominee */}
            {step === 1 && (
              <>
                <div className="form-section-title">Nominee Details</div>
                <div className="form-section-sub">Your nominee will be listed on your DM agreement.</div>

                <div className="field-group">
                  <label className="field-label">Nominee Full Name</label>
                  <input className="field" placeholder="As per Aadhaar" value={form.nomineeName} onChange={e => set("nomineeName", e.target.value)} />
                </div>

                <div className="actions">
                  <button className="btn-back" onClick={() => setStep(0)}>Back</button>
                  <button className="btn-primary" disabled={!step1Valid} onClick={() => setStep(2)}>
                    Continue <ChevronRight size={16} strokeWidth={2} />
                  </button>
                </div>
              </>
            )}

            {/* STEP 2 — Documents */}
            {step === 2 && (
              <>
                <div className="form-section-title">KYC Documents</div>
                <div className="form-section-sub">Upload clear scans or photos. Accepted: PDF, JPG, PNG.</div>

                <div className="docs-grid">
                  {DOCS.map(doc => (
                    <DocUpload key={doc.id} doc={doc} file={files[doc.id]} onChange={handleFile} />
                  ))}
                </div>

                <div className="actions">
                  <button className="btn-back" onClick={() => setStep(1)}>Back</button>
                  <button className="btn-primary" disabled={!step2Valid} onClick={() => setStep(3)}>
                    Submit Application <ChevronRight size={16} strokeWidth={2} />
                  </button>
                </div>
              </>
            )}

            {/* STEP 3 — Success */}
            {step === 3 && (
              <div className="success-view">
                <div className="success-icon">
                  <CheckCircle size={32} color="#fff" strokeWidth={1.5} />
                </div>
                <div className="success-title">Welcome to AWA Asset!</div>
                <p className="success-sub">
                  Your application has been received. A welcome email is on its way to <strong>{form.email}</strong>. Your Distribution Manager ID is:
                </p>
                <div className="dm-id-box">
                  <span className="dm-id-label">Your DM ID</span>
                  <span className="dm-id-value">DM000129</span>
                </div>
                <p className="success-sub" style={{ marginBottom: 20 }}>
                  Complete your KYC with Anand Rathi to activate your account and start earning.
                </p>
                <a href={KYC_URL} target="_blank" rel="noopener noreferrer" className="kyc-cta">
                  <Award size={18} strokeWidth={1.5} />
                  Complete KYC Now
                  <ArrowRight size={16} strokeWidth={1.5} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-logo">AWA <span>Asset</span> Management</div>
          <div className="footer-copy">SEBI Registered · CIN: U65990MH2020PTC123456 · © 2026 AWA Asset</div>
        </footer>
      </div>
    </>
  );
}
