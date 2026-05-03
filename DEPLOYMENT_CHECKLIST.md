# AWA Backend v2 - Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables (Render Dashboard)
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`
- [ ] `DATABASE_URL` (Render PostgreSQL External URL)
- [ ] `CLOUDINARY_CLOUD_NAME=dhfzjdhjl`
- [ ] `CLOUDINARY_API_KEY` (from Cloudinary dashboard)
- [ ] `CLOUDINARY_API_SECRET` (from Cloudinary dashboard)
- [ ] `EMAIL_USER=noreply@awaasset.com`
- [ ] `EMAIL_PASS` (App Password from Google Workspace)
- [ ] `EMAIL_FROM=noreply@awaasset.com`
- [ ] `EMAIL_FROM_NAME=AWA Asset Management`
- [ ] `OTP_EXPIRY_MINUTES=10`
- [ ] `OTP_LENGTH=6`
- [ ] `OTP_RATE_LIMIT=3`
- [ ] `UPLOAD_RATE_LIMIT=10`
- [ ] `ENROLL_RATE_LIMIT=5`
- [ ] `FRONTEND_URL=https://awaasset.com`

### 2. Database Setup (Local Machine)
```bash
# Get EXTERNAL Database URL from Render
# Format: postgresql://user:password@host.com:5432/database

# Navigate to project folder
cd awa-backend-v2

# Run schema migration
psql postgresql://[EXTERNAL_URL] -f db/schema.sql

# Should see: "Schema created successfully!"
```

### 3. Code Deployment

#### Option A: GitHub (Recommended)
```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "AWA Backend v2 - Complete API"

# Push to GitHub (awaasset-tech org)
git remote add origin https://github.com/awaasset-tech/awa-backend-v2.git
git push -u origin main
```

Then in Render:
- [ ] Connect to GitHub repository
- [ ] Auto-deploy on git push enabled

#### Option B: Manual Upload
- [ ] Zip entire `awa-backend-v2` folder
- [ ] Upload to Render dashboard
- [ ] Click "Deploy"

### 4. Post-Deployment Verification

#### Test 1: Health Check
```bash
curl https://awaasset.com/health
```
Expected:
```json
{
  "success": true,
  "message": "AWA Asset Management API is running",
  "timestamp": "2026-04-29T..."
}
```

#### Test 2: API Info
```bash
curl https://awaasset.com/api
```
Expected: JSON with all endpoint documentation

#### Test 3: Send OTP (will fail if mobile exists - that's good)
```bash
curl -X POST https://awaasset.com/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"mobile":"+919999999999"}'
```

#### Test 4: Check Frontend
- [ ] Visit https://awaasset.com
- [ ] Landing page loads
- [ ] Enrollment form visible
- [ ] No console errors

### 5. Integration Testing

#### Frontend Integration
- [ ] Add `<script src="/api-integration.js"></script>` to your HTML
- [ ] Update HTML element IDs to match script
- [ ] Test full enrollment flow:
  1. Enter mobile → Send OTP
  2. Enter OTP → Verify
  3. Fill form + upload docs
  4. Submit enrollment
  5. Check welcome email received

### 6. Monitor Logs (Render Dashboard)
- [ ] Click "Logs" tab
- [ ] Should see:
  ```
  ✅ Database connected successfully
  ✅ Cloudinary connected successfully
  ✅ Email server ready
  🚀 AWA Asset Management - Partner Enrollment API
  Server running on port 3000
  ```

### 7. Security Check
- [ ] HTTPS enabled (Render does this automatically)
- [ ] CORS configured for awaasset.com
- [ ] Rate limiting active
- [ ] Environment variables hidden (not in code)

## Known Issues & Fixes

### Issue: "Route not found" for index.html
**Status:** ✅ FIXED
- Already handled in `server.js` with `app.use(express.static())`

### Issue: Database "relation does not exist"
**Fix:** Use EXTERNAL database URL (not Internal) when running schema.sql

### Issue: OTP email not received
**Check:**
1. EMAIL_PASS is App Password (16-char, no spaces)
2. 2FA enabled on noreply@awaasset.com
3. Check spam folder
4. Check Render logs for email errors

### Issue: Cloudinary upload fails
**Check:**
1. CLOUDINARY_CLOUD_NAME = dhfzjdhjl (exactly)
2. API credentials correct
3. File size < 5MB
4. File type is image or PDF

### Issue: Rate limit too strict
**Fix:** Increase in environment variables:
```
OTP_RATE_LIMIT=10
UPLOAD_RATE_LIMIT=20
ENROLL_RATE_LIMIT=10
```

## Production Readiness

### ✅ Completed
- [x] Scalable folder structure (MVC pattern)
- [x] Database auto-increments Partner IDs (DM000001++)
- [x] Email OTP system working
- [x] Cloudinary document storage
- [x] Input validation
- [x] Rate limiting
- [x] Error handling
- [x] Security headers (Helmet)
- [x] CORS protection

### 🔄 Pending (Phase 2)
- [ ] WhatsApp OTP (MSG91/Gupshup) - waiting for paid credits
- [ ] Admin panel (approve/reject partners)
- [ ] Partner portal (check status)
- [ ] Database migration to Neon (before April 30, 2026)

### 🔮 Future (Phase 3)
- [ ] Client dashboard (Kubera-style)
- [ ] Bank details collection
- [ ] Product selection (FMS/Mutual Fund/PMS)
- [ ] Nominee relationship field
- [ ] Document verification status

## Emergency Contacts

**Render Support:** https://render.com/docs
**Cloudinary Dashboard:** https://cloudinary.com/console
**Database Console:** Use `psql` with External URL
**Google Workspace:** admin.google.com

## Rollback Plan

If deployment fails:
1. Check Render logs for errors
2. Verify all environment variables
3. Test database connection with `psql`
4. Check Cloudinary credentials
5. If needed, redeploy previous version from GitHub

## Success Criteria

✅ API is live at awaasset.com
✅ All 5 endpoints responding
✅ OTP emails being sent
✅ Documents uploading to Cloudinary
✅ Welcome emails being sent
✅ Partner IDs auto-generating (DM000001++)
✅ Database storing enrollments
✅ Frontend can call API successfully

---

**Deployment Date:** _____________
**Deployed By:** Nish (CTO)
**Status:** [ ] Pending  [ ] In Progress  [ ] Complete
