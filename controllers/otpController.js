// controllers/otpController.js
const otpModel = require('../models/otpModel');
const partnerModel = require('../models/partnerModel');
const { sendOTPEmail } = require('../config/email');

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    const otp = otpModel.generateOTP();
    await otpModel.saveOTP(email, otp);
    await sendOTPEmail(email, '', otp);

    res.json({ success: true, message: 'OTP sent successfully to your email', expiresIn: `${process.env.OTP_EXPIRY_MINUTES || 10} minutes` });
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ success: false, error: 'Failed to send OTP. Please try again.' });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, error: 'Email and OTP are required' });

    const result = await otpModel.verifyOTP(email, otp);
    if (!result.valid) return res.status(400).json({ success: false, error: result.message });

    res.json({ success: true, message: result.message, verified: true });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, error: 'Failed to verify OTP. Please try again.' });
  }
};

module.exports = { sendOTP, verifyOTP };
