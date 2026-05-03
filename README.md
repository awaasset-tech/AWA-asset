# AWA Asset Management - Partner Enrollment API v2.0

Scalable backend API for partner enrollment with OTP verification and document management.

## 🏗️ Architecture

```
awa-backend-v2/
├── server.js                 # Main Express application
├── config/                   # Configuration files
│   ├── db.js                # PostgreSQL connection
│   ├── cloudinary.js        # Cloudinary setup
│   └── email.js             # Email service (nodemailer)
├── routes/                   # API routes
│   ├── otp.js               # OTP endpoints
│   ├── partner.js           # Partner enrollment
│   └── documents.js         # Document uploads
├── controllers/              # Business logic
│   ├── otpController.js
│   ├── partnerController.js
│   └── documentController.js
├── models/                   # Database operations
│   ├── otpModel.js
│   └── partnerModel.js
├── middleware/               # Validation & helpers
│   └── validate.js
├── db/                       # Database schema
│   └── schema.sql
└── public/                   # Your frontend files
    ├── index.html
    ├── style.css
    └── script.js
```

## 🚀 Deployment Steps

### 1. Setup Environment Variables on Render

Go to your Render dashboard > Environment variables and add:

```
NODE_ENV=production
PORT=3000

# Database (Render PostgreSQL - External URL)
DATABASE_URL=postgresql://user:password@host:port/database

# Cloudinary
CLOUDINARY_CLOUD_NAME=dhfzjdhjl
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Google Workspace)
EMAIL_USER=noreply@awaasset.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@awaasset.com
EMAIL_FROM_NAME=AWA Asset Management

# Security
OTP_EXPIRY_MINUTES=10
OTP_LENGTH=6

# Rate Limits
OTP_RATE_LIMIT=3
UPLOAD_RATE_LIMIT=10
ENROLL_RATE_LIMIT=5

# Frontend
FRONTEND_URL=https://awaasset.com
```

### 2. Deploy Database Schema

**IMPORTANT:** Use the **External Database URL** from Render (not Internal URL).

```bash
# On your local machine (inside project folder)
psql postgresql://user:password@host:port/database -f db/schema.sql
```

You should see: "Schema created successfully!"

### 3. Deploy to Render

#### Option A: Via GitHub
1. Push code to GitHub (awaasset-tech organization)
2. Connect Render to your repo
3. Render will auto-deploy on git push

#### Option B: Manual Deploy
1. Zip the project
2. Upload to Render dashboard
3. Click "Deploy"

### 4. Verify Deployment

After deployment, test these endpoints:

```bash
# Health check
curl https://awaasset.com/health

# API info
curl https://awaasset.com/api

# Test OTP send (will return error if mobile exists, which is good)
curl -X POST https://awaasset.com/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"mobile":"+919999999999"}'
```

## 📡 API Endpoints

### 1. Send OTP
```
POST /api/otp/send
Content-Type: application/json

{
  "mobile": "+919876543210"
}

Response:
{
  "success": true,
  "message": "OTP sent successfully to registered email",
  "expiresIn": "10 minutes"
}
```

### 2. Verify OTP
```
POST /api/otp/verify
Content-Type: application/json

{
  "mobile": "+919876543210",
  "otp": "123456"
}

Response:
{
  "success": true,
  "message": "OTP verified successfully",
  "verified": true
}
```

### 3. Upload Document
```
POST /api/documents/upload
Content-Type: multipart/form-data

FormData:
- file: (binary)
- documentType: "panCard" | "aadharCard" | "cancelledCheque" | "nomineeAadhar" | "nomineePan"

Response:
{
  "success": true,
  "message": "Document uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "publicId": "awa-partners/panCard/abc123",
    "format": "jpg",
    "size": 245678
  }
}
```

### 4. Submit Enrollment
```
POST /api/partner/enroll
Content-Type: application/json

{
  "name": "Swati Mathkar",
  "mobile": "+919876543210",
  "email": "swati@example.com",
  "nomineeName": "Yogesh Mathkar",
  "documents": {
    "panCard": "https://res.cloudinary.com/...",
    "aadharCard": "https://res.cloudinary.com/...",
    "cancelledCheque": "https://res.cloudinary.com/...",
    "nomineeAadhar": "https://res.cloudinary.com/...",
    "nomineePan": "https://res.cloudinary.com/..."
  }
}

Response:
{
  "success": true,
  "message": "Enrollment successful! Welcome email sent.",
  "data": {
    "partnerId": "DM000001",
    "name": "Swati Mathkar",
    "email": "swati@example.com",
    "status": "pending"
  }
}
```

### 5. Check Status
```
GET /api/partner/DM000001/status

Response:
{
  "success": true,
  "data": {
    "partner_id": "DM000001",
    "name": "Swati Mathkar",
    "mobile": "+919876543210",
    "email": "swati@example.com",
    "nominee_name": "Yogesh Mathkar",
    "status": "pending",
    "created_at": "2026-04-29T16:30:00.000Z",
    "updated_at": "2026-04-29T16:30:00.000Z"
  }
}
```

## 🔒 Security Features

- ✅ Helmet.js for HTTP headers security
- ✅ CORS protection
- ✅ Rate limiting (OTP, Upload, Enrollment)
- ✅ Input validation with express-validator
- ✅ SQL injection protection (parameterized queries)
- ✅ File type validation (images and PDFs only)
- ✅ File size limit (5MB max)
- ✅ OTP expiry (10 minutes)

## 🔄 Scalability Features

### 1. Modular Structure
Each feature is separate - easy to add new endpoints without breaking existing ones.

### 2. Database Design
- Auto-generated Partner IDs (DM000001, DM000002...)
- Indexes for fast queries
- Easy to add columns with ALTER TABLE

### 3. Configuration Management
All settings in .env - change database/email/limits without code changes.

### 4. Response Format
Consistent JSON structure across all endpoints.

### 5. Error Handling
Global error handler catches all issues.

## 📊 Database Migration (Render → Neon)

**Due: End of April 2026** (Render free DB expires)

### Steps:
1. Create Neon.tech account (free forever)
2. Get new DATABASE_URL
3. Update Render environment variable
4. Run schema.sql on Neon database
5. Restart Render service

**No code changes needed!** Just swap the DATABASE_URL.

## 🔮 Future Enhancements (Easy to Add)

### Phase 2 - Admin Panel
```javascript
// Add to routes/admin.js
GET  /api/admin/partners         # List all partners
PATCH /api/admin/partners/:id/approve
PATCH /api/admin/partners/:id/reject
```

### Phase 3 - Client Dashboard (Kubera-style)
```javascript
// Add to routes/clients.js
POST /api/clients                # Add client
GET  /api/clients/:id/portfolio  # View holdings
```

### WhatsApp OTP Integration
```javascript
// Update controllers/otpController.js
// Replace sendOTPEmail with MSG91/Gupshup API
```

### Bank Details Collection
```sql
-- Add to schema.sql
ALTER TABLE partners ADD COLUMN bank_name VARCHAR(100);
ALTER TABLE partners ADD COLUMN account_number VARCHAR(20);
ALTER TABLE partners ADD COLUMN ifsc_code VARCHAR(11);
```

## 🐛 Troubleshooting

### "Route not found" for HTML
**Fix:** Already handled with `app.use(express.static(__dirname))` in server.js

### Database connection error
**Check:** Using EXTERNAL Database URL (not Internal)

### OTP emails not sending
**Check:** 
1. EMAIL_PASS is the App Password (not Gmail password)
2. 2FA is enabled on noreply@awaasset.com
3. Check Render logs: `View Logs` in dashboard

### Cloudinary upload fails
**Check:**
1. CLOUDINARY_CLOUD_NAME = dhfzjdhjl
2. API credentials are correct
3. File size < 5MB

### Rate limit errors
**Increase limits in .env:**
```
OTP_RATE_LIMIT=10
UPLOAD_RATE_LIMIT=20
```

## 📞 Support

- **Render Logs:** Dashboard > Logs tab
- **Database Console:** Use `psql` with External URL
- **API Testing:** Use Postman or curl

## 📝 License

Proprietary - AWA Asset Management
