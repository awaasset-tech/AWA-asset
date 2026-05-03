// middleware/validate.js
const { body, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Mobile number validation
const validateMobile = [
  body('mobile')
    .trim()
    .matches(/^\+91[6-9]\d{9}$/)
    .withMessage('Invalid Indian mobile number. Format: +91XXXXXXXXXX'),
  handleValidationErrors
];

// OTP validation
const validateOTP = [
  body('mobile')
    .trim()
    .matches(/^\+91[6-9]\d{9}$/)
    .withMessage('Invalid mobile number'),
  body('otp')
    .trim()
    .isLength({ min: 6, max: 6 })
    .isNumeric()
    .withMessage('OTP must be 6 digits'),
  handleValidationErrors
];

// Partner enrollment validation
const validateEnrollment = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2-100 characters'),
  
  body('mobile')
    .trim()
    .matches(/^\+91[6-9]\d{9}$/)
    .withMessage('Invalid Indian mobile number'),
  
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  
  body('nomineeName')
    .trim()
    .notEmpty()
    .withMessage('Nominee name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nominee name must be between 2-100 characters'),
  
  body('documents')
    .isObject()
    .withMessage('Documents must be an object'),
  
  body('documents.panCard')
    .notEmpty()
    .isURL()
    .withMessage('PAN Card document URL is required'),
  
  body('documents.aadharCard')
    .notEmpty()
    .isURL()
    .withMessage('Aadhar Card document URL is required'),
  
  body('documents.cancelledCheque')
    .notEmpty()
    .isURL()
    .withMessage('Cancelled Cheque document URL is required'),
  
  body('documents.nomineeAadhar')
    .notEmpty()
    .isURL()
    .withMessage('Nominee Aadhar document URL is required'),
  
  body('documents.nomineePan')
    .notEmpty()
    .isURL()
    .withMessage('Nominee PAN document URL is required'),
  
  handleValidationErrors
];

module.exports = {
  validateMobile,
  validateOTP,
  validateEnrollment
};
