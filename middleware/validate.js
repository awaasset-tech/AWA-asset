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

// OTP send — email only, no mobile
const validateMobile = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
  handleValidationErrors
];

// OTP verify — email + otp
const validateOTP = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
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
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 2-100 characters'),


  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),

  body('nomineeName')
    .trim()
    .notEmpty()
    .withMessage('Nominee name is required')
    .isLength({ min: 1, max: 100 })
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