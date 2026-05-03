// routes/documents.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const rateLimit = require('express-rate-limit');

// Rate limiter for uploads (10 per hour per IP)
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.UPLOAD_RATE_LIMIT) || 10,
  message: {
    success: false,
    error: 'Too many upload requests. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// POST /api/documents/upload
router.post('/upload', uploadLimiter, documentController.uploadDocument);

module.exports = router;
