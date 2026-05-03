// models/partnerModel.js
const pool = require('../config/db');

// Create new partner
const createPartner = async (partnerData) => {
  const {
    name,
    mobile,
    email,
    nomineeName,
    documents
  } = partnerData;
  
  const query = `
    INSERT INTO partners (
      name, mobile, email, nominee_name, mobile_verified,
      doc_pan_card, doc_aadhar_card, doc_cancelled_cheque,
      doc_nominee_aadhar, doc_nominee_pan
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING partner_id, name, email, mobile, status, created_at
  `;
  
  const values = [
    name,
    mobile,
    email,
    nomineeName,
    true, // mobile_verified (since OTP was verified)
    documents.panCard,
    documents.aadharCard,
    documents.cancelledCheque,
    documents.nomineeAadhar,
    documents.nomineePan
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Check if mobile already exists
const mobileExists = async (mobile) => {
  const query = 'SELECT COUNT(*) as count FROM partners WHERE mobile = $1';
  const result = await pool.query(query, [mobile]);
  return result.rows[0].count > 0;
};

// Check if email already exists
const emailExists = async (email) => {
  const query = 'SELECT COUNT(*) as count FROM partners WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0].count > 0;
};

// Get partner by ID
const getPartnerById = async (partnerId) => {
  const query = `
    SELECT 
      partner_id, name, mobile, email, nominee_name,
      status, created_at, updated_at
    FROM partners
    WHERE partner_id = $1
  `;
  
  const result = await pool.query(query, [partnerId]);
  return result.rows[0] || null;
};

// Get partner by mobile
const getPartnerByMobile = async (mobile) => {
  const query = `
    SELECT 
      partner_id, name, mobile, email, nominee_name,
      status, created_at, updated_at
    FROM partners
    WHERE mobile = $1
  `;
  
  const result = await pool.query(query, [mobile]);
  return result.rows[0] || null;
};

// Get all partners (for admin)
const getAllPartners = async (filters = {}) => {
  let query = `
    SELECT 
      partner_id, name, mobile, email, nominee_name,
      status, created_at, updated_at
    FROM partners
  `;
  
  const conditions = [];
  const values = [];
  
  if (filters.status) {
    conditions.push(`status = $${values.length + 1}`);
    values.push(filters.status);
  }
  
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  
  query += ' ORDER BY created_at DESC';
  
  if (filters.limit) {
    query += ` LIMIT $${values.length + 1}`;
    values.push(filters.limit);
  }
  
  const result = await pool.query(query, values);
  return result.rows;
};

// Update partner status
const updatePartnerStatus = async (partnerId, status) => {
  const query = `
    UPDATE partners
    SET status = $1, updated_at = NOW()
    WHERE partner_id = $2
    RETURNING partner_id, name, status, updated_at
  `;
  
  const result = await pool.query(query, [status, partnerId]);
  return result.rows[0] || null;
};

module.exports = {
  createPartner,
  mobileExists,
  emailExists,
  getPartnerById,
  getPartnerByMobile,
  getAllPartners,
  updatePartnerStatus
};
