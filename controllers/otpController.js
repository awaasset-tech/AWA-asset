// controllers/otpController.js
const otpModel = require('../models/otpModel');
const partnerModel = require('../models/partnerModel');
const { sendOTPEmail } = require('../config/email');

// Send OTP
const sendOTP = async (req, res) => {
  try {
    const { mobile } = req.body;
    
    // Check if mobile is already registered
    const exists = await partnerModel.mobileExists(mobile);
    if (exists) {
      return res.status(409).json({
        success: false,
        error: 'Mobile number already registered'
      });
    }
    
    // Generate OTP
    const otp = otpModel.generateOTP();
    
    // Save to database
    await otpModel.saveOTP(mobile, otp);
    
    // Send OTP via email (email-based OTP workaround until WhatsApp is set up)
    await sendOTPEmail(mobile, otp);
    
    res.json({
      success: true,
      message: 'OTP sent successfully to registered email',
      expiresIn: `${process.env.OTP_EXPIRY_MINUTES || 10} minutes`
    });
    
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP. Please try again.'
    });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    
    // Verify OTP
    const result = await otpModel.verifyOTP(mobile, otp);
    
    if (!result.valid) {
      return res.status(400).json({
        success: false,
        error: result.message
      });
    }
    
    res.json({
      success: true,
      message: result.message,
      verified: true
    });
    
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify OTP. Please try again.'
    });
  }
};

module.exports = {
  sendOTP,
  verifyOTP
};
