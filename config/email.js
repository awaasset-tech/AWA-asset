// config/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error.message);
  } else {
    console.log('✅ Email server ready');
  }
});

// Send OTP email
const sendOTPEmail = async (mobile, otp) => {
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_USER, // Send to tech@ for now (OTP via email workaround)
    subject: 'AWA Asset - OTP Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d1452;">Partner Enrollment - OTP Verification</h2>
        <p>Mobile Number: <strong>${mobile}</strong></p>
        <div style="background-color: #f5b800; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #0d1452; margin: 0; font-size: 36px; letter-spacing: 8px;">${otp}</h1>
        </div>
        <p>This OTP is valid for ${process.env.OTP_EXPIRY_MINUTES || 10} minutes.</p>
        <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #999; font-size: 11px;">AWA Asset Management | awaasset.com</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

// Send welcome email
const sendWelcomeEmail = async (email, name, partnerId) => {
  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: 'Welcome to AWA Asset Management',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #0d1452; padding: 30px; text-align: center;">
          <h1 style="color: #f5b800; margin: 0;">Welcome to AWA Asset</h1>
        </div>
        
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #0d1452;">Hello ${name}!</h2>
          <p>Thank you for enrolling as a Distribution Partner with AWA Asset Management.</p>
          
          <div style="background-color: white; padding: 20px; border-left: 4px solid #f5b800; margin: 20px 0;">
            <p style="margin: 0;"><strong>Your Partner ID:</strong></p>
            <h2 style="color: #0d1452; margin: 10px 0 0 0;">${partnerId}</h2>
          </div>
          
          <p>Your enrollment is currently under review. Our team will verify your documents and approve your account within 2-3 business days.</p>
          
          <p><strong>What's Next?</strong></p>
          <ul style="color: #666;">
            <li>Document verification by our team</li>
            <li>Account activation notification</li>
            <li>Access to partner portal</li>
          </ul>
          
          <p>If you have any questions, feel free to reach out to us.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #00b050;">
            <p style="color: #0d1452; font-weight: bold; margin: 0;">Best regards,</p>
            <p style="color: #0d1452; margin: 5px 0;">AWA Asset Management Team</p>
          </div>
        </div>
        
        <div style="background-color: #0d1452; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">
            © ${new Date().getFullYear()} AWA Asset Management. All rights reserved.
          </p>
        </div>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail
};
