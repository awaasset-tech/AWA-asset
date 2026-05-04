import React, { useState } from 'react';
import '../styles/PartnerEnrollment.css';

const PartnerEnrollment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    mobile: '',
    email: '',
    
    // OTP
    otp: '',
    mobileVerified: false,
    
    // Nominee Information
    nomineeName: '',
    
    // Professional Background
    education: '',
    annualIncome: '',
    yearsOfExperience: '',
    
    // Documents
    documents: {
      panCard: '',
      aadharCard: '',
      cancelledCheque: '',
      nomineeAadhar: '',
      nomineePan: ''
    }
  });

  const [uploadStatus, setUploadStatus] = useState({
    panCard: false,
    aadharCard: false,
    cancelledCheque: false,
    nomineeAadhar: false,
    nomineePan: false
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Send OTP
  const handleSendOTP = async () => {
    if (!formData.mobile.match(/^\+91[6-9]\d{9}$/)) {
      alert('Please enter a valid mobile number (e.g., +919876543210)');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: formData.mobile })
      });

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
        body: JSON.stringify({ 
          mobile: formData.mobile, 
          otp: formData.otp 
        })
      });

      const result = await response.json();
      
      if (result.success && result.verified) {
        setFormData(prev => ({ ...prev, mobileVerified: true }));
        setCurrentStep(2);
        alert('Mobile verified successfully!');
      } else {
        alert(result.error || 'Invalid OTP');
      }
    } catch (error) {
      alert('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Upload Document
  const handleDocumentUpload = async (e, documentType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({
          ...prev,
          documents: {
            ...prev.documents,
            [documentType]: result.data.url
          }
        }));
        setUploadStatus(prev => ({
          ...prev,
          [documentType]: true
        }));
      } else {
        alert(result.error);
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

    // Validate all documents uploaded
    const allDocsUploaded = Object.values(uploadStatus).every(status => status === true);
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
        alert(`Success! Your Partner ID: ${result.data.partnerId}\n\nWelcome email sent to ${result.data.email}`);
        // Reset form or redirect
        window.location.href = '/';
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('Enrollment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enrollment-container">
      <div className="enrollment-header">
        <h1>Partner Enrollment</h1>
        <p>Join AWA Asset Management's network of distribution partners</p>
      </div>

      <div className="progress-bar">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Verification</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Details</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Documents</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="enrollment-form">
        
        {/* STEP 1: Mobile Verification */}
        {currentStep === 1 && (
          <div className="form-section">
            <h2>Mobile Verification</h2>
            <p className="section-description">We'll send a verification code to your registered email</p>
            
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number *</label>
              <div className="input-with-button">
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+919876543210"
                  required
                  disabled={otpSent}
                />
                <button 
                  type="button" 
                  onClick={handleSendOTP}
                  disabled={loading || otpSent}
                  className="btn-secondary"
                >
                  {loading ? 'Sending...' : otpSent ? 'OTP Sent' : 'Send OTP'}
                </button>
              </div>
              <small>Format: +91XXXXXXXXXX</small>
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
                    placeholder="123456"
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

        {/* STEP 2: Personal & Professional Details */}
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
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    required
                  >
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
                  <select
                    id="annualIncome"
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Annual Income</option>
                    <option value="10 Lac - 20 Lac">₹10 Lac - ₹20 Lac</option>
                    <option value="20 Lac - 40 Lac">₹20 Lac - ₹40 Lac</option>
                    <option value="40 Lac & Above">₹40 Lac & Above</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="yearsOfExperience">Years of Experience *</label>
                  <select
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Experience</option>
                    <option value="5 - 10 years">5 - 10 years</option>
                    <option value="10 - 20 years">10 - 20 years</option>
                    <option value="20 years & Above">20 years & Above</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => setCurrentStep(3)}
                className="btn-primary"
              >
                Continue to Documents
              </button>
            </div>
          </>
        )}

        {/* STEP 3: Document Upload */}
        {currentStep === 3 && (
          <>
            <div className="form-section">
              <h2>KYC Documents</h2>
              <p className="section-description">Upload clear copies of the following documents (Max 5MB each)</p>
              
              <div className="documents-grid">
                {/* PAN Card */}
                <div className="document-upload">
                  <label className="upload-label">
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">
                      <strong>PAN Card</strong>
                      <span>Click to upload</span>
                    </div>
                    {uploadStatus.panCard && <div className="upload-success">✓</div>}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleDocumentUpload(e, 'panCard')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Aadhar Card */}
                <div className="document-upload">
                  <label className="upload-label">
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">
                      <strong>Aadhar Card</strong>
                      <span>Click to upload</span>
                    </div>
                    {uploadStatus.aadharCard && <div className="upload-success">✓</div>}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleDocumentUpload(e, 'aadharCard')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Cancelled Cheque */}
                <div className="document-upload">
                  <label className="upload-label">
                    <div className="upload-icon">🏦</div>
                    <div className="upload-text">
                      <strong>Cancelled Cheque</strong>
                      <span>Click to upload</span>
                    </div>
                    {uploadStatus.cancelledCheque && <div className="upload-success">✓</div>}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleDocumentUpload(e, 'cancelledCheque')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Nominee Aadhar */}
                <div className="document-upload">
                  <label className="upload-label">
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">
                      <strong>Nominee Aadhar</strong>
                      <span>Click to upload</span>
                    </div>
                    {uploadStatus.nomineeAadhar && <div className="upload-success">✓</div>}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleDocumentUpload(e, 'nomineeAadhar')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Nominee PAN */}
                <div className="document-upload">
                  <label className="upload-label">
                    <div className="upload-icon">📄</div>
                    <div className="upload-text">
                      <strong>Nominee PAN</strong>
                      <span>Click to upload</span>
                    </div>
                    {uploadStatus.nomineePan && <div className="upload-success">✓</div>}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleDocumentUpload(e, 'nomineePan')}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => setCurrentStep(2)}
                className="btn-secondary"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={loading || !Object.values(uploadStatus).every(v => v)}
                className="btn-primary"
              >
                {loading ? 'Submitting...' : 'Submit Enrollment'}
              </button>
            </div>
          </>
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
