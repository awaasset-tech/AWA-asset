// routes/otp.js
const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otpController');
const { validateMobile, validateOTP } = require('../middleware/validate');
const rateLimit = require('express-rate-limit');

// Rate limiter for OTP requests (3 per hour per IP)
const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.OTP_RATE_LIMIT) || 3,
  message: {
    success: false,
    error: 'Too many OTP requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// POST /api/otp/send
router.post('/send', otpLimiter, validateMobile, otpController.sendOTP);

// POST /api/otp/verify
router.post('/verify', validateOTP, otpController.verifyOTP);

module.exports = router;
