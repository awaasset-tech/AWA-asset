// models/otpModel.js
const pool = require('../config/db');

// Generate random OTP
const generateOTP = () => {
  const length = parseInt(process.env.OTP_LENGTH) || 6;
  return Math.floor(100000 + Math.random() * 900000).toString().substring(0, length);
};

// Save OTP to database
const saveOTP = async (mobile, otp) => {
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 10;
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
  
  const query = `
    INSERT INTO otp_verification (mobile, otp, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id, expires_at
  `;
  
  const result = await pool.query(query, [mobile, otp, expiresAt]);
  return result.rows[0];
};

// Verify OTP
const verifyOTP = async (mobile, otp) => {
  const query = `
    SELECT * FROM otp_verification
    WHERE mobile = $1 AND otp = $2 AND verified = false AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
  `;
  
  const result = await pool.query(query, [mobile, otp]);
  
  if (result.rows.length === 0) {
    return { valid: false, message: 'Invalid or expired OTP' };
  }
  
  // Mark as verified
  const updateQuery = `
    UPDATE otp_verification
    SET verified = true
    WHERE id = $1
  `;
  
  await pool.query(updateQuery, [result.rows[0].id]);
  
  return { valid: true, message: 'OTP verified successfully' };
};

// Check if mobile is already verified
const isMobileVerified = async (mobile) => {
  const query = `
    SELECT COUNT(*) as count FROM otp_verification
    WHERE mobile = $1 AND verified = true
  `;
  
  const result = await pool.query(query, [mobile]);
  return result.rows[0].count > 0;
};

// Clean up expired OTPs
const cleanupExpiredOTPs = async () => {
  const query = `
    DELETE FROM otp_verification
    WHERE expires_at < NOW() OR verified = true
  `;
  
  const result = await pool.query(query);
  return result.rowCount;
};

module.exports = {
  generateOTP,
  saveOTP,
  verifyOTP,
  isMobileVerified,
  cleanupExpiredOTPs
};
