// models/otpModel.js
const pool = require('../config/db');

const generateOTP = () => {
  const length = parseInt(process.env.OTP_LENGTH) || 6;
  return Math.floor(100000 + Math.random() * 900000).toString().substring(0, length);
};

const saveOTP = async (email, otp) => {
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 10;
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);
  const query = `
    INSERT INTO otp_verification (email, otp, expires_at)
    VALUES ($1, $2, $3)
    RETURNING id, expires_at
  `;
  const result = await pool.query(query, [email, otp, expiresAt]);
  return result.rows[0];
};

const verifyOTP = async (email, otp) => {
  const query = `
    SELECT * FROM otp_verification
    WHERE email = $1 AND otp = $2 AND verified = false AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
  `;
  const result = await pool.query(query, [email, otp]);
  if (result.rows.length === 0) {
    return { valid: false, message: 'Invalid or expired OTP' };
  }
  await pool.query(`UPDATE otp_verification SET verified = true WHERE id = $1`, [result.rows[0].id]);
  return { valid: true, message: 'OTP verified successfully' };
};

const isEmailVerified = async (email) => {
  const query = `SELECT COUNT(*) as count FROM otp_verification WHERE email = $1 AND verified = true`;
  const result = await pool.query(query, [email]);
  return result.rows[0].count > 0;
};

const cleanupExpiredOTPs = async () => {
  const result = await pool.query(`DELETE FROM otp_verification WHERE expires_at < NOW() OR verified = true`);
  return result.rowCount;
};

module.exports = { generateOTP, saveOTP, verifyOTP, isEmailVerified, cleanupExpiredOTPs };
