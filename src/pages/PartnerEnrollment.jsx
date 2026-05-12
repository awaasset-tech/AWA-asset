import React, { useState } from 'react';
import '../styles/PartnerEnrollment.css';

const DOCUMENTS = [
  { key: 'panCard',          label: 'PAN Card',         icon: '📄' },
  { key: 'aadharCard',       label: 'Aadhar Card',      icon: '📄' },
  { key: 'cancelledCheque',  label: 'Cancelled Cheque', icon: '🏦' },
  { key: 'nomineeAadhar',    label: 'Nominee Aadhar',   icon: '📄' },
  { key: 'nomineePan',       label: 'Nominee PAN',      icon: '📄' },
];

const TERMS_TEXT = `This AGREEMENT is made at Mumbai on this __ day of __ by and between AWA Asset Management, a firm having its registered office at Mumbai (hereinafter referred to as "AWA Asset"), of the FIRST PART, AND the Partner, of the SECOND PART.

The expressions "AWA Asset" and "The Partner" shall unless repugnant to the context or meaning thereof mean and include their respective legal successors and permitted assigns. ["AWA Asset" and "The Partner" shall together be referred to as "parties" and individually as "Party"]

ARTICLE 1: DEFINITION
• "Partner" shall mean and include any individual/entity who has agreed to avail the services offered by AWA Asset and is eligible to be duly appointed as a Distribution Manager of AWA Asset for such service(s).
• "Client(s)" shall mean individuals/entities making investments through the Partner in various products.
• "Portal" shall mean the website hosted by AWA Asset through which the partner accesses the Partner desk and other online facilities.
• "Products" shall mean investment products viz. Mutual Funds, Fixed Deposits, Bonds, PMS, and other financial products offered by AWA Asset to Partners from time to time.
• "Services" shall mean the activities connected with the distribution/sale of the products.

ARTICLE 2: ELIGIBILITY AND APPOINTMENT
• Any individual or entity seeking appointment as a Partner shall be qualified as per relevant laws, regulations and rules to carry out the business of distribution of the products offered by AWA Asset. Such eligibility will include (but not be limited to) passing the NISM Series V-A: Mutual Fund Distributors Certification Exam as required by any regulatory body in India.
• The Partner shall provide information and details which AWA Asset requires at the time of application as well as from time to time during the tenure of this Agreement.
• Upon acceptance of the Partner, AWA Asset shall issue to the Partner an appointment letter mentioning the Partner's code and other terms and conditions.
• AWA Asset grants the partner a non-transferable, revocable and non-exclusive licence to use the Portal and other online facilities for bonafide purposes only.
• The relation between the Partner and AWA Asset shall be on a principal-to-principal basis.

ARTICLE 3: RIGHTS AND OBLIGATIONS OF PARTNER
• The Partner shall maintain all information of their clients required for the conduct of business.
• The Partner specifically ensures that any person involved in selling and/or advising of mutual funds through the partner code is duly authorized and has the necessary AMFI certification.
• The Partner shall secure an ARN Number and shall renew such ARN at appropriate times and shall intimate the status of such ARN to AWA Asset.
• The Partner shall be solely responsible for the protection and privacy of the user id and password of the Partner Desk.
• The Partner shall be solely responsible for adhering to KYC (Know Your Customer) and AML (Anti Money Laundering) norms under PMLA regulations.

ARTICLE 4: RIGHTS AND OBLIGATIONS OF AWA ASSET
• AWA Asset reserves the right to reject any application for enrolling as a Partner at its sole discretion at any time.
• AWA Asset retains the sole right and discretion to change, amend or modify the rules, regulations, and eligibility criteria.
• AWA Asset rightfully performs maintenance and development work on all portals and partner desks.

ARTICLE 5: COMMISSION AND PAYMENTS
• The Partner shall be eligible to earn commissions on business mobilised as communicated by AWA Asset from time to time.
• Commission structures are subject to change at AWA Asset's discretion with reasonable notice.
• Trail commissions are subject to continued ARN validity and compliance.

DECLARATION
I/We hereby declare that the information furnished is true and correct to the best of my/our knowledge and belief. I/We undertake to abide by the terms and conditions stated herein and the changes in Terms & Conditions from time to time relating to the empanelment as a Distribution Manager. I/We am/are not an employee or a relative of a Director/employee of AWA Asset Management or any of its associates.`;

const PartnerEnrollment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [partnerId, setPartnerId] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    email: '',
    otp: '',
    emailVerified: false,
    // Step 2 - Personal
    salutation: '',
    name: '',
    mobile: '',
    dateOfBirth: '',
    address: '',
    city: '',
    pinCode: '',
    marriageAnniversary: '',
    category: '',
    // Step 2 - Tax / Entity
    entityType: '',
    panNo: '',
    // Step 2 - ARN
    arnNo: '',
    arnIssueDate: '',
    arnValidUpto: '',
    // Step 2 - Bank
    accountNo: '',
    bankName: '',
    bankBranch: '',
    ifscCode: '',
    micrCode: '',
    accountType: '',
    // Step 2 - Nominee
    nomineeName: '',
    nomineeAddress: '',
    nomineeRelationship: '',
    nomineeIsMinor: false,
    nomineeDob: '',
    guardianName: '',
    guardianAddress: '',
    // Step 2 - Experience
    experienceLand: false,
    experienceFD: false,
    experienceInsurance: false,
    experienceMF: false,
    experienceBonds: false,
    experiencePPF: false,
    // Step 2 - Professional
    education: '',
    annualIncome: '',
    yearsOfExperience: '',
    // Step 3 - Documents
    documents: {
      panCard: '',
      aadharCard: '',
      cancelledCheque: '',
      nomineeAadhar: '',
      nomineePan: '',
    }
  });

  const [uploadStatus, setUploadStatus] = useState({
    panCard:         { uploaded: false, fileName: '' },
    aadharCard:      { uploaded: false, fileName: '' },
    cancelledCheque: { uploaded: false, fileName: '' },
    nomineeAadhar:   { uploaded: false, fileName: '' },
    nomineePan:      { uploaded: false, fileName: '' },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSendOTP = async () => {
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const result = await response.json();
      if (result.success) {
        setOtpSent(true);
        alert(`OTP sent to ${formData.email}. Please check your inbox.`);
      } else {
        alert(result.message || result.error || 'Failed to send OTP');
      }
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp || formData.otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp })
      });
      const result = await response.json();
      if (result.success && result.verified) {
        setFormData(prev => ({ ...prev, emailVerified: true }));
        setCurrentStep(2);
      } else {
        alert(result.error || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      alert('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (e, documentType) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) { alert('Only JPG, PNG or PDF files are allowed.'); e.target.value = ''; return; }
    if (file.size > 2 * 1024 * 1024) { alert('File size must be less than 2MB.'); e.target.value = ''; return; }

    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('documentType', documentType);
    try {
      const response = await fetch('/api/documents/upload', { method: 'POST', body: data });
      const result = await response.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, documents: { ...prev.documents, [documentType]: result.data.url } }));
        setUploadStatus(prev => ({ ...prev, [documentType]: { uploaded: true, fileName: file.name } }));
      } else {
        alert(result.error || 'Upload failed.');
      }
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) { setShowTerms(true); return; }

    const allDocsUploaded = Object.values(uploadStatus).every(s => s.uploaded);
    if (!allDocsUploaded) { alert('Please upload all required documents'); return; }

    setLoading(true);
    try {
      const response = await fetch('/api/partner/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          nomineeName: formData.nomineeName,
          education: formData.education,
          annualIncome: formData.annualIncome,
          yearsOfExperience: formData.yearsOfExperience,
          documents: formData.documents
        })
      });
      const result = await response.json();
      if (result.success) {
        setPartnerId(result.data.partnerId);
        setPartnerEmail(result.data.email);
        setCurrentStep(5);
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const allDocsUploaded = Object.values(uploadStatus).every(s => s.uploaded);
  const STEPS = ['Verification', 'Details', 'Documents', 'Review'];

  return (
    <div className="enrollment-container">

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Terms & Conditions</h2>
              <p>Privileged Partner Program — AWA Asset Management</p>
            </div>
            <div className="modal-body">
              {TERMS_TEXT.split('\n').map((line, i) => (
                <p key={i} style={{ marginBottom: line === '' ? '12px' : '4px', fontWeight: line.startsWith('ARTICLE') || line === 'DECLARATION' ? '700' : '400', color: line.startsWith('ARTICLE') || line === 'DECLARATION' ? '#0d1452' : '#444' }}>
                  {line}
                </p>
              ))}
            </div>
            <div className="modal-footer">
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={e => setTermsAccepted(e.target.checked)}
                />
                <span>I have read and agree to the Terms & Conditions</span>
              </label>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowTerms(false)}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  disabled={!termsAccepted}
                  onClick={() => { setShowTerms(false); handleSubmit({ preventDefault: () => {} }); }}
                >
                  Accept & Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      {currentStep !== 5 && (
        <>
          <div className="enrollment-header">
            <h1>Partner Enrollment</h1>
            <p>Join AWA Asset Management's Privileged Partner Program</p>
          </div>
          <div className="progress-bar">
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className={`progress-step ${currentStep >= i + 1 ? 'active' : ''}`}>
                  <div className="step-number">{i + 1}</div>
                  <div className="step-label">{label}</div>
                </div>
                {i < STEPS.length - 1 && <div className="progress-line"></div>}
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="enrollment-form">

        {/* ── STEP 1: Email Verification ── */}
        {currentStep === 1 && (
          <div className="form-section">
            <h2>Email Verification</h2>
            <p className="section-description">We'll send a verification code to your email address</p>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <div className="input-with-button">
                <input type="email" id="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="you@example.com" required disabled={otpSent} />
                <button type="button" onClick={handleSendOTP} disabled={loading || otpSent} className="btn-secondary">
                  {loading ? 'Sending...' : otpSent ? '✓ OTP Sent' : 'Send OTP'}
                </button>
              </div>
              <small>A 6-digit OTP will be sent to this email</small>
            </div>
            {otpSent && (
              <div className="form-group otp-section">
                <label htmlFor="otp">Enter OTP *</label>
                <div className="input-with-button">
                  <input type="text" id="otp" name="otp" value={formData.otp}
                    onChange={handleChange} placeholder="6-digit OTP" maxLength="6" required />
                  <button type="button" onClick={handleVerifyOTP} disabled={loading} className="btn-primary">
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Full Details ── */}
        {currentStep === 2 && (
          <>
            {/* Personal Info */}
            <div className="form-section">
              <h2>Personal Information</h2>
              <div className="form-row">
                <div className="form-group" style={{maxWidth:'120px'}}>
                  <label>Salutation</label>
                  <select name="salutation" value={formData.salutation} onChange={handleChange}>
                    <option value="">—</option>
                    <option>Mr</option><option>Ms</option><option>Mrs</option><option>Dr</option><option>M/s</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Marriage Anniversary</label>
                  <input type="date" name="marriageAnniversary" value={formData.marriageAnniversary} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Privilege Partner">Privilege Partner</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Address *</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Pin Code *</label>
                  <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} maxLength="6" required />
                </div>
              </div>
            </div>

            {/* Tax / Entity */}
            <div className="form-section">
              <h2>Tax & Entity Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Entity Type *</label>
                  <select name="entityType" value={formData.entityType} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Individual">Individual</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="HUF">HUF</option>
                    <option value="Private Limited">Private Limited Company</option>
                    <option value="Partnership Firm">Partnership Firm</option>
                    <option value="Public Limited">Public Limited Company</option>
                    <option value="Trust">Trust</option>
                    <option value="Society">Society</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>PAN Number *</label>
                  <input type="text" name="panNo" value={formData.panNo} onChange={handleChange} placeholder="ABCDE1234F" maxLength="10" required />
                </div>
              </div>
            </div>

            {/* ARN Details */}
            <div className="form-section">
              <h2>ARN Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>ARN Registration No</label>
                  <input type="text" name="arnNo" value={formData.arnNo} onChange={handleChange} placeholder="ARN-XXXXXX" />
                </div>
                <div className="form-group">
                  <label>Issue Date</label>
                  <input type="date" name="arnIssueDate" value={formData.arnIssueDate} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Valid Upto</label>
                  <input type="date" name="arnValidUpto" value={formData.arnValidUpto} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="form-section">
              <h2>Bank Account Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Account Number *</label>
                  <input type="text" name="accountNo" value={formData.accountNo} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Account Type *</label>
                  <select name="accountType" value={formData.accountType} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Savings">Savings</option>
                    <option value="Current">Current</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bank Name *</label>
                  <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Branch *</label>
                  <input type="text" name="bankBranch" value={formData.bankBranch} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>IFSC Code *</label>
                  <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="SBIN0001234" required />
                </div>
                <div className="form-group">
                  <label>MICR Code</label>
                  <input type="text" name="micrCode" value={formData.micrCode} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Nominee Details */}
            <div className="form-section">
              <h2>Nominee Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Nominee Name *</label>
                  <input type="text" name="nomineeName" value={formData.nomineeName} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Relationship with Partner *</label>
                  <input type="text" name="nomineeRelationship" value={formData.nomineeRelationship} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Nominee Address</label>
                <input type="text" name="nomineeAddress" value={formData.nomineeAddress} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="nomineeIsMinor" checked={formData.nomineeIsMinor} onChange={handleChange} />
                  <span>Nominee is a Minor</span>
                </label>
              </div>
              {formData.nomineeIsMinor && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Date of Birth of Nominee</label>
                    <input type="date" name="nomineeDob" value={formData.nomineeDob} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Name of Legal Guardian</label>
                    <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Address of Legal Guardian</label>
                    <input type="text" name="guardianAddress" value={formData.guardianAddress} onChange={handleChange} />
                  </div>
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="form-section">
              <h2>Experience in Selling</h2>
              <p className="section-description">Select all that apply</p>
              <div className="checkbox-grid">
                {[
                  { name: 'experienceLand',      label: 'Land / Real Estate' },
                  { name: 'experienceFD',        label: 'Fixed Deposits' },
                  { name: 'experienceInsurance', label: 'Insurance' },
                  { name: 'experienceMF',        label: 'Mutual Funds' },
                  { name: 'experienceBonds',     label: 'Bonds' },
                  { name: 'experiencePPF',       label: 'PPF' },
                ].map(({ name, label }) => (
                  <label key={name} className="checkbox-label">
                    <input type="checkbox" name={name} checked={formData[name]} onChange={handleChange} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Professional Background */}
            <div className="form-section professional-background">
              <h2>Professional Background</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Education *</label>
                  <select name="education" value={formData.education} onChange={handleChange} required>
                    <option value="">Select Education</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="CA">Chartered Accountant (CA)</option>
                    <option value="CS">Company Secretary (CS)</option>
                    <option value="Doctorate">Doctorate</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Annual Income *</label>
                  <select name="annualIncome" value={formData.annualIncome} onChange={handleChange} required>
                    <option value="">Select Annual Income</option>
                    <option value="10 Lac - 20 Lac">₹10 Lac – ₹20 Lac</option>
                    <option value="20 Lac - 40 Lac">₹20 Lac – ₹40 Lac</option>
                    <option value="40 Lac & Above">₹40 Lac & Above</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Years of Experience *</label>
                  <select name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} required>
                    <option value="">Select Experience</option>
                    <option value="5 - 10 years">5 – 10 years</option>
                    <option value="10 - 20 years">10 – 20 years</option>
                    <option value="20 years & Above">20 years & Above</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setCurrentStep(3)} className="btn-primary">
                Continue to Documents
              </button>
            </div>
          </>
        )}

        {/* ── STEP 3: Documents ── */}
        {currentStep === 3 && (
          <>
            <div className="form-section">
              <h2>KYC Documents</h2>
              <p className="section-description">Upload JPG, PNG or PDF only • Max 2MB per document • Click to replace</p>
              <div className="documents-grid">
                {DOCUMENTS.map(({ key, label, icon }) => {
                  const status = uploadStatus[key];
                  return (
                    <div className={`document-upload ${status.uploaded ? 'uploaded' : ''}`} key={key}>
                      <label className="upload-label">
                        {status.uploaded && <div className="upload-badge">✓</div>}
                        <div className="upload-icon">{status.uploaded ? '✅' : icon}</div>
                        <div className="upload-text">
                          <strong>{label}</strong>
                          {status.uploaded ? (
                            <>
                              <span className="file-name" title={status.fileName}>
                                {status.fileName.length > 20 ? status.fileName.substring(0, 20) + '...' : status.fileName}
                              </span>
                              <span className="re-upload-hint">Click to replace</span>
                            </>
                          ) : (
                            <span>JPG, PNG or PDF • Max 2MB</span>
                          )}
                        </div>
                        <input type="file" accept="image/jpeg,image/jpg,image/png,application/pdf"
                          onChange={(e) => handleDocumentUpload(e, key)} style={{ display: 'none' }} />
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="upload-progress">
                <span>{Object.values(uploadStatus).filter(s => s.uploaded).length} of 5 documents uploaded</span>
                <div className="progress-track">
                  <div className="progress-fill"
                    style={{ width: `${(Object.values(uploadStatus).filter(s => s.uploaded).length / 5) * 100}%` }} />
                </div>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setCurrentStep(2)} className="btn-secondary">Back</button>
              <button type="button" onClick={() => setCurrentStep(4)} disabled={!allDocsUploaded} className="btn-primary">
                Review & Submit
              </button>
            </div>
          </>
        )}

        {/* ── STEP 4: Review ── */}
        {currentStep === 4 && (
          <>
            <div className="form-section">
              <h2>Review Your Application</h2>
              <p className="section-description">Please verify your details before submitting</p>

              <div className="review-grid">
                <div className="review-block">
                  <h3>Personal Details</h3>
                  <div className="review-row"><span>Name</span><strong>{formData.salutation} {formData.name}</strong></div>
                  <div className="review-row"><span>Email</span><strong>{formData.email}</strong></div>
                  <div className="review-row"><span>Mobile</span><strong>{formData.mobile}</strong></div>
                  <div className="review-row"><span>Date of Birth</span><strong>{formData.dateOfBirth}</strong></div>
                  <div className="review-row"><span>Category</span><strong>{formData.category}</strong></div>
                  <div className="review-row"><span>Address</span><strong>{formData.address}, {formData.city} – {formData.pinCode}</strong></div>
                </div>
                <div className="review-block">
                  <h3>Tax & ARN</h3>
                  <div className="review-row"><span>Entity Type</span><strong>{formData.entityType}</strong></div>
                  <div className="review-row"><span>PAN</span><strong>{formData.panNo}</strong></div>
                  <div className="review-row"><span>ARN No</span><strong>{formData.arnNo || '—'}</strong></div>
                  <div className="review-row"><span>ARN Valid Upto</span><strong>{formData.arnValidUpto || '—'}</strong></div>
                </div>
                <div className="review-block">
                  <h3>Bank Details</h3>
                  <div className="review-row"><span>Bank</span><strong>{formData.bankName}</strong></div>
                  <div className="review-row"><span>Account No</span><strong>{formData.accountNo}</strong></div>
                  <div className="review-row"><span>IFSC</span><strong>{formData.ifscCode}</strong></div>
                  <div className="review-row"><span>Type</span><strong>{formData.accountType}</strong></div>
                </div>
                <div className="review-block">
                  <h3>Nominee</h3>
                  <div className="review-row"><span>Name</span><strong>{formData.nomineeName}</strong></div>
                  <div className="review-row"><span>Relationship</span><strong>{formData.nomineeRelationship}</strong></div>
                </div>
                <div className="review-block">
                  <h3>Documents</h3>
                  {DOCUMENTS.map(({ key, label }) => (
                    <div className="review-row" key={key}>
                      <span>{label}</span>
                      <strong style={{ color: uploadStatus[key].uploaded ? '#2e7d32' : '#c62828' }}>
                        {uploadStatus[key].uploaded ? '✓ Uploaded' : '✗ Missing'}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="terms-notice">
              By submitting, you agree to AWA Asset Management's{' '}
              <button type="button" className="terms-link" onClick={() => setShowTerms(true)}>
                Terms & Conditions
              </button>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setCurrentStep(3)} className="btn-secondary">Back</button>
              <button type="button" onClick={() => setShowTerms(true)} disabled={loading} className="btn-primary">
                {loading ? 'Submitting...' : 'Read T&C & Submit'}
              </button>
            </div>
          </>
        )}

        {/* ── STEP 5: Success ── */}
        {currentStep === 5 && (
          <div className="success-screen">
            <div className="success-icon-wrap">
              <div className="success-circle">✓</div>
            </div>
            <h2>Enrollment Successful!</h2>
            <p className="success-subtitle">Welcome to AWA Asset Management's Privileged Partner Program</p>
            <div className="partner-id-box">
              <p className="partner-id-label">YOUR PARTNER ID</p>
              <h1 className="partner-id-value">{partnerId}</h1>
            </div>
            <div className="success-info">
              <p>A welcome email has been sent to <strong>{partnerEmail}</strong></p>
              <p>Our team will verify your documents within <strong>2–3 business days.</strong></p>
            </div>
            <div className="success-steps">
              <div className="success-step"><span className="step-dot">1</span><span>Document verification</span></div>
              <div className="success-step"><span className="step-dot">2</span><span>Account activation</span></div>
              <div className="success-step"><span className="step-dot">3</span><span>Partner portal access</span></div>
            </div>
            <button type="button" onClick={() => window.location.href = '/'} className="btn-primary">
              Go to Homepage
            </button>
          </div>
        )}

      </form>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default PartnerEnrollment;