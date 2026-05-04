// config/email.js - Using Resend API (replaces nodemailer)
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('✅ Resend email service initialized');

// Send OTP email
const sendOTPEmail = async (email, mobile, otp) => {
  const { data, error } = await resend.emails.send({
    from: `AWA Asset Management <noreply@awaasset.com>`,
    to: [email],
    subject: 'AWA Asset - OTP Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #003B5C; padding: 30px; text-align: center;">
          <h1 style="color: #B8860B; margin: 0; font-size: 28px;">AWA Asset Management</h1>
        </div>
        
        <div style="padding: 40px; background-color: #FAF8F3;">
          <h2 style="color: #003B5C;">Partner Enrollment - OTP Verification</h2>
          <p style="color: #666;">Mobile Number: <strong>${mobile}</strong></p>
          
          <div style="background-color: #003B5C; padding: 30px; text-align: center; margin: 30px 0; border-radius: 8px;">
            <p style="color: #FAF8F3; margin: 0 0 10px 0; font-size: 14px;">Your One-Time Password</p>
            <h1 style="color: #B8860B; margin: 0; font-size: 48px; letter-spacing: 12px;">${otp}</h1>
          </div>
          
          <p style="color: #666;">This OTP is valid for <strong>${process.env.OTP_EXPIRY_MINUTES || 10} minutes</strong>.</p>
          <p style="color: #999; font-size: 13px;">If you didn't request this, please ignore this email.</p>
        </div>
        
        <div style="background-color: #003B5C; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">
            © ${new Date().getFullYear()} AWA Asset Management | awaasset.com
          </p>
        </div>
      </div>
    `
  });

  if (error) {
    throw new Error(`Resend OTP error: ${error.message}`);
  }

  return data;
};

// Send welcome email
const sendWelcomeEmail = async (email, name, partnerId) => {
  const { data, error } = await resend.emails.send({
    from: `AWA Asset Management <noreply@awaasset.com>`,
    to: [email],
    subject: 'Welcome to AWA Asset Management',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #003B5C; padding: 30px; text-align: center;">
          <h1 style="color: #B8860B; margin: 0; font-size: 28px;">AWA Asset Management</h1>
        </div>
        
        <div style="padding: 40px; background-color: #FAF8F3;">
          <h2 style="color: #003B5C;">Welcome, ${name}!</h2>
          <p style="color: #666;">Thank you for enrolling as a Distribution Partner with AWA Asset Management.</p>
          
          <div style="background-color: white; padding: 24px; border-left: 4px solid #B8860B; margin: 24px 0; border-radius: 4px;">
            <p style="margin: 0; color: #666; font-size: 14px;">YOUR PARTNER ID</p>
            <h2 style="color: #003B5C; margin: 8px 0 0 0; font-size: 32px; letter-spacing: 2px;">${partnerId}</h2>
          </div>
          
          <p style="color: #666;">Your enrollment is currently <strong>under review</strong>. Our team will verify your documents and activate your account within 2-3 business days.</p>
          
          <p style="color: #003B5C; font-weight: bold;">What's Next?</p>
          <ul style="color: #666; line-height: 1.8;">
            <li>Document verification by our team</li>
            <li>Account activation notification</li>
            <li>Access to partner portal</li>
          </ul>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E0E0E0;">
            <p style="color: #003B5C; font-weight: bold; margin: 0;">Best regards,</p>
            <p style="color: #003B5C; margin: 5px 0;">AWA Asset Management Team</p>
          </div>
        </div>
        
        <div style="background-color: #003B5C; padding: 20px; text-align: center;">
          <p style="color: #999; margin: 0; font-size: 12px;">
            © ${new Date().getFullYear()} AWA Asset Management | awaasset.com
          </p>
        </div>
      </div>
    `
  });

  if (error) {
    throw new Error(`Resend welcome email error: ${error.message}`);
  }

  return data;
};

module.exports = {
  sendOTPEmail,
  sendWelcomeEmail
};
