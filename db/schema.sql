-- AWA Asset Management - Partner Enrollment Database Schema
-- Run this with: psql [EXTERNAL_DATABASE_URL] -f db/schema.sql

-- Drop existing tables if they exist (for fresh setup)
DROP TABLE IF EXISTS otp_verification CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS partners CASCADE;

-- Partners Table
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  partner_id VARCHAR(20) UNIQUE NOT NULL,
  
  -- Personal Information
  name VARCHAR(100) NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  mobile_verified BOOLEAN DEFAULT false,
  
  -- Nominee Information
  nominee_name VARCHAR(100),
  
  -- Document URLs (Cloudinary)
  doc_pan_card TEXT,
  doc_aadhar_card TEXT,
  doc_cancelled_cheque TEXT,
  doc_nominee_aadhar TEXT,
  doc_nominee_pan TEXT,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- OTP Verification Table
CREATE TABLE otp_verification (
  id SERIAL PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  verified BOOLEAN DEFAULT false,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX idx_partners_mobile ON partners(mobile);
CREATE INDEX idx_partners_email ON partners(email);
CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_partners_created_at ON partners(created_at DESC);
CREATE INDEX idx_otp_mobile ON otp_verification(mobile);
CREATE INDEX idx_otp_expires_at ON otp_verification(expires_at);

-- Function to auto-generate partner_id
CREATE OR REPLACE FUNCTION generate_partner_id() 
RETURNS TRIGGER AS $$
DECLARE
  max_id INTEGER;
  new_id INTEGER;
BEGIN
  -- Get the maximum numeric part from existing partner_ids
  SELECT COALESCE(MAX(CAST(SUBSTRING(partner_id FROM 3) AS INTEGER)), 0) 
  INTO max_id 
  FROM partners;
  
  -- Increment and format as DM000XXX
  new_id := max_id + 1;
  NEW.partner_id := 'DM' || LPAD(new_id::TEXT, 6, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate partner_id on insert
CREATE TRIGGER trigger_generate_partner_id
BEFORE INSERT ON partners
FOR EACH ROW
WHEN (NEW.partner_id IS NULL)
EXECUTE FUNCTION generate_partner_id();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER trigger_update_partner_timestamp
BEFORE UPDATE ON partners
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Clean up expired OTPs (optional - can be run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_otps()
RETURNS void AS $$
BEGIN
  DELETE FROM otp_verification 
  WHERE expires_at < NOW() OR verified = true;
END;
$$ LANGUAGE plpgsql;

-- Insert a test partner (optional - remove in production)
-- INSERT INTO partners (name, mobile, email, nominee_name, mobile_verified, status)
-- VALUES ('Test Partner', '+919999999999', 'test@awaasset.com', 'Test Nominee', true, 'approved');

-- Verify schema
SELECT 'Schema created successfully!' AS message;
SELECT COUNT(*) AS total_partners FROM partners;
