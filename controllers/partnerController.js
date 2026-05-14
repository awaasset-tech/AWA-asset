// controllers/partnerController.js
const partnerModel = require('../models/partnerModel');
const otpModel = require('../models/otpModel');
const { sendWelcomeEmail } = require('../config/email');

// Enroll new partner
const enrollPartner = async (req, res) => {
  try {
    const { name, mobile, email, nomineeName, documents } = req.body;
    
        success: false,
    }
    
    // Check if mobile already exists
    const emailExists = await partnerModel.emailExists(email);
    if (emailExists) {
      return res.status(409).json({
        success: false,
        error: 'Email already registered'
      });
    }

    
    // Create partner
    const partner = await partnerModel.createPartner({
      name,
      mobile,
      email,
      nomineeName,
      documents
    });
    
    // Send welcome email
    try {
      await sendWelcomeEmail(email, name, partner.partner_id);
    } catch (emailError) {
      console.error('Welcome email error:', emailError);
      // Don't fail enrollment if email fails
    }
    
    res.status(201).json({
      success: true,
      message: 'Enrollment successful! Welcome email sent.',
      data: {
        partnerId: partner.partner_id,
        name: partner.name,
        email: partner.email,
        status: partner.status
      }
    });
    
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete enrollment. Please try again.'
    });
  }
};

// Get partner status
const getPartnerStatus = async (req, res) => {
  try {
    const { partnerId } = req.params;
    
    const partner = await partnerModel.getPartnerById(partnerId);
    
    if (!partner) {
      return res.status(404).json({
        success: false,
        error: 'Partner not found'
      });
    }
    
    res.json({
      success: true,
      data: partner
    });
    
  } catch (error) {
    console.error('Get partner error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve partner information'
    });
  }
};

module.exports = {
  enrollPartner,
  getPartnerStatus
};
