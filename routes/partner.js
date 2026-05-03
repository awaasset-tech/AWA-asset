// routes/partner.js
const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partnerController');
const { validateEnrollment } = require('../middleware/validate');
const rateLimit = require('express-rate-limit');

// Rate limiter for enrollment (5 per hour per IP)
const enrollLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.ENROLL_RATE_LIMIT) || 5,
  message: {
    success: false,
    error: 'Too many enrollment requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// POST /api/partner/enroll
router.post('/enroll', enrollLimiter, validateEnrollment, partnerController.enrollPartner);

// GET /api/partner/:partnerId/status
router.get('/:partnerId/status', partnerController.getPartnerStatus);

module.exports = router;
