import React, { useState } from 'react';
import '../styles/PartnerEnrollment.css';

// Document configuration - single source of truth
const DOCUMENTS = [
  { key: 'panCard',          label: 'PAN Card',          icon: '📄' },
  { key: 'aadharCard',       label: 'Aadhar Card',       icon: '📄' },
  { key: 'cancelledCheque',  label: 'Cancelled Cheque',  icon: '🏦' },
  { key: 'nomineeAadhar',    label: 'Nominee Aadhar',    icon: '📄' },
  { key: 'nomineePan',       label: 'Nominee PAN',       icon: '📄' },
];

const PartnerEnrollment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [partnerId, setPartnerId] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    otp: '',
    mobileVerified: false,
    nomineeName: '',
    education: '',
    annualIncome: '',
    yearsOfExperience: '',
    documents: {
      panCard: '',
      aadharCard: '',
      cancelledCheque: '',
      nomineeAadhar: '',
      nomineePan: ''
    }
  });

  // Track upload status AND filename for each document
  const [uploadStatus, setUploadStatus] = useState({
    panCard:         { uploaded: false, fileName: '' },
    aadharCard:      { uploaded: false, fileName: '' },
    cancelledCheque: { uploaded: false, fileName: '' },
    nomineeAadhar:   { uploaded: false, fileName: '' },
    nomineePan:      { uploaded: false, fileName: '' },
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (!formData.mobile.match(/^\+91[6-9]\d{9}$/)) {
      alert('Please enter a valid mobile number');
      return;
    }
    if (!formData.email) {
      alert('Please enter your email address first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mobile: formData.mobile,
          email: formData.email    // ← add this
        })
      });
      // rest stays same...
      const result = await response.json();
      if (result.success) {
        setOtpSent(true);
        alert('OTP sent! Check your registered email.');
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
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
        body: JSON.stringify({ mobile: formData.mobile, otp: formData.otp })
      });
      const result = await response.json();
      if (result.success && result.verified) {
        setFormData(prev => ({ ...prev, mobileVerified: true }));
        setCurrentStep(2);
      } else {
        alert(result.error || 'Invalid OTP');
      }
    } catch (error) {
      alert('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Upload Document - with re-upload support + filename display
  const handleDocumentUpload = async (e, documentType) => {
    const file = e.target.files[0];
    if (!file) return;

    // File type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG or PDF files are allowed.');
      e.target.value = ''; // Reset input
      return;
    }

    // File size validation - 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert('File size must be less than 2MB. Please compress the file and try again.');
      e.target.value = ''; // Reset input
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('documentType', documentType);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: data
      });
      const result = await response.json();

      if (result.success) {
        // Update document URL
        setFormData(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            [documentType]: result.data.url
          }
        }));
        // Update upload status with filename
        setUploadStatus(prev => ({
          ...prev,
          [documentType]: {
            uploaded: true,
            fileName: file.name
          }
        }));
      } else {
        alert(result.error || 'Upload failed. Please try again.');
      }
    } catch (error) {
      alert('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Submit Enrollment
  const handleSubmit = async (e) => {
    e.preventDefault();

    const allDocsUploaded = Object.values(uploadStatus).every(s => s.uploaded);
    if (!allDocsUploaded) {
      alert('Please upload all required documents');
      return;
    }

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
        setCurrentStep(4); // Show success screen
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

  return (
    <div className="enrollment-container">

      {/* Header - hide on success */}
      {currentStep !== 4 && (
        <>
          <div className="enrollment-header">
            <h1>Partner Enrollment</h1>
            <p>Join AWA Asset Management's network of distribution partners</p>
          </div>

          <div className="progress-bar">
            {['Verification', 'Details', 'Documents'].map((label, i) => (
              <React.Fragment key={label}>
                <div className={`progress-step ${currentStep >= i + 1 ? 'active' : ''}`}>
                  <div className="step-number">{i + 1}</div>
                  <div className="step-label">{label}</div>
                </div>
                {i < 2 && <div className="progress-line"></div>}
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      <form onSubmit={handleSubmit} className="enrollment-form">

        {/* ── STEP 1: Mobile Verification ── */}
        {currentStep === 1 && (
          <div className="form-section">
            <h2>Mobile Verification</h2>
            <p className="section-description">We'll send a verification code to your registered email</p>

            {/* Step 1: Verification */}
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
              <div className="input-with-button">
                <input type="tel" name="mobile" ... />
                <button onClick={handleSendOTP}>Send OTP</button>
              </div>
            </div>

            {otpSent && (
              <div className="form-group otp-section">
                <label htmlFor="otp">Enter OTP *</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="6-digit OTP"
                    maxLength="6"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={loading}
                    className="btn-primary"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Personal & Professional Details ── */}
        {currentStep === 2 && (
          <>
            <div className="form-section">
              <h2>Personal Information</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="nomineeName">Nominee Name *</label>
                <input
                  type="text"
                  id="nomineeName"
                  name="nomineeName"
                  value={formData.nomineeName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-section professional-background">
              <h2>Professional Background</h2>
              <p className="section-description">Help us understand your professional profile</p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="education">Education *</label>
                  <select id="education" name="education" value={formData.education} onChange={handleChange} required>
                    <option value="">Select Education</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="CA">Chartered Accountant (CA)</option>
                    <option value="CS">Company Secretary (CS)</option>
                    <option value="Doctorate">Doctorate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="annualIncome">Annual Income *</label>
                  <select id="annualIncome" name="annualIncome" value={formData.annualIncome} onChange={handleChange} required>
                    <option value="">Select Annual Income</option>
                    <option value="10 Lac - 20 Lac">₹10 Lac – ₹20 Lac</option>
                    <option value="20 Lac - 40 Lac">₹20 Lac – ₹40 Lac</option>
                    <option value="40 Lac & Above">₹40 Lac & Above</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="yearsOfExperience">Years of Experience *</label>
                  <select id="yearsOfExperience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} required>
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

        {/* ── STEP 3: Document Upload ── */}
        {currentStep === 3 && (
          <>
            <div className="form-section">
              <h2>KYC Documents</h2>
              <p className="section-description">
                Upload JPG, PNG or PDF only • Max 2MB per document • Click any document to replace it
              </p>

              <div className="documents-grid">
                {DOCUMENTS.map(({ key, label, icon }) => {
                  const status = uploadStatus[key];
                  return (
                    <div className={`document-upload ${status.uploaded ? 'uploaded' : ''}`} key={key}>
                      <label className="upload-label">
                        {/* Green checkmark badge */}
                        {status.uploaded && <div className="upload-badge">✓</div>}

                        <div className="upload-icon">{status.uploaded ? '✅' : icon}</div>

                        <div className="upload-text">
                          <strong>{label}</strong>
                          {status.uploaded ? (
                            <>
                              <span className="file-name" title={status.fileName}>
                                {status.fileName.length > 20
                                  ? status.fileName.substring(0, 20) + '...'
                                  : status.fileName}
                              </span>
                              <span className="re-upload-hint">Click to replace</span>
                            </>
                          ) : (
                            <span>JPG, PNG or PDF • Max 2MB</span>
                          )}
                        </div>

                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,application/pdf"
                          onChange={(e) => handleDocumentUpload(e, key)}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </div>
                  );
                })}
              </div>

              {/* Upload progress indicator */}
              <div className="upload-progress">
                <span>{Object.values(uploadStatus).filter(s => s.uploaded).length} of 5 documents uploaded</span>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${(Object.values(uploadStatus).filter(s => s.uploaded).length / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setCurrentStep(2)} className="btn-secondary">
                Back
              </button>
              <button
                type="submit"
                disabled={loading || !allDocsUploaded}
                className="btn-primary"
              >
                {loading ? 'Submitting...' : 'Submit Enrollment'}
              </button>
            </div>
          </>
        )}

        {/* ── STEP 4: Success Screen ── */}
        {currentStep === 4 && (
          <div className="success-screen">
            <div className="success-icon-wrap">
              <div className="success-circle">✓</div>
            </div>

            <h2>Enrollment Successful!</h2>
            <p className="success-subtitle">Welcome to AWA Asset Management</p>

            <div className="partner-id-box">
              <p className="partner-id-label">YOUR PARTNER ID</p>
              <h1 className="partner-id-value">{partnerId}</h1>
            </div>

            <div className="success-info">
              <p>A welcome email has been sent to <strong>{partnerEmail}</strong></p>
              <p>Our team will verify your documents within <strong>2–3 business days.</strong></p>
            </div>

            <div className="success-steps">
              <div className="success-step">
                <span className="step-dot">1</span>
                <span>Document verification</span>
              </div>
              <div className="success-step">
                <span className="step-dot">2</span>
                <span>Account activation</span>
              </div>
              <div className="success-step">
                <span className="step-dot">3</span>
                <span>Partner portal access</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.location.href = '/'}
              className="btn-primary"
            >
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
