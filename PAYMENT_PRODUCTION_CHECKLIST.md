# MEDHELM Supplies - Payment Integration Production Readiness Checklist

## Current Status Assessment

Based on the code review, here's the current status of your PesaPal payment integration:

## ✅ Already Production Ready:

### 1. **PesaPal Base URL Configuration**
- **Current**: `https://pay.pesapal.com/v3/api/` ✅
- **Status**: CORRECT - Using production PesaPal API endpoint

### 2. **Environment-Based Configuration**
- **Current**: Uses `process.env.NODE_ENV === 'production'` checks ✅
- **IPN Configuration**: Properly conditionally adds `notification_id` only in production ✅

### 3. **Security Features**
- **HTTPS URLs**: All callback URLs should use HTTPS in production ✅
- **Token Authentication**: Proper OAuth token implementation ✅
- **Currency**: Correctly set to 'KES' ✅

## ⚠️ **CRITICAL ITEMS TO UPDATE FOR PRODUCTION:**

### 1. **Environment Variables Configuration**

You need to ensure these environment variables are properly set for PRODUCTION:

```env
# Production Environment
NODE_ENV=production

# PesaPal Production Configuration
PESAPAL_BASE_URL=https://pay.pesapal.com/v3/api/
PESAPAL_CONSUMER_KEY=your_production_consumer_key_here
PESAPAL_CONSUMER_SECRET=your_production_consumer_secret_here
PESAPAL_IPN_ID=your_production_ipn_id_here

# CRITICAL: Use HTTPS URLs for production
PESAPAL_CALLBACK_URL=https://yourdomain.com/api/v1/payments/pesapal/callback
PESAPAL_NOTIFICATION_URL=https://yourdomain.com/api/v1/payments/pesapal/ipn
PESAPAL_REDIRECT_URL=https://yourdomain.com/payment-success

# Frontend/Backend URLs (HTTPS)
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

### 2. **Frontend Environment Variables**

Update your frontend `.env` file:

```env
# Production Frontend
VITE_API_URL=https://api.yourdomain.com/api/v1
NODE_ENV=production
```

### 3. **PesaPal Account Configuration**

**ACTION REQUIRED**: Login to your PesaPal merchant account and:

1. **Switch to Live/Production Mode**:
   - Navigate to PesaPal merchant dashboard
   - Switch from Sandbox to Live mode
   - Get production Consumer Key and Consumer Secret

2. **Configure IPN (Instant Payment Notification)**:
   - Set IPN URL: `https://yourdomain.com/api/v1/payments/pesapal/ipn`
   - Get the IPN ID and add it to `PESAPAL_IPN_ID` environment variable

3. **Configure Callback URLs**:
   - Success URL: `https://yourdomain.com/payment-success`
   - Failed URL: `https://yourdomain.com/payment-failed`

### 4. **Callback URL Handlers** ✅

**COMPLETED**: Created production-ready callback handlers:
- File: `src/routes/pesapalCallbackRoutes.js`
- IPN Handler: `/api/v1/payments/pesapal/ipn` 
- Callback Handler: `/api/v1/payments/pesapal/callback`
- Status Check: `/api/v1/payments/pesapal/status/:orderId`

### 5. **Updated Configuration Files** ✅

**COMPLETED**: Created production-ready configuration:
- File: `src/config/pesaPalConfig.production.js`
- Environment detection and validation
- HTTPS URL enforcement for production
- Amount limits and validation
- Comprehensive error checking

## 🚀 **DEPLOYMENT STEPS:**

### Step 1: Update Environment Variables

1. **Backend Production Environment** (`.env`):
```env
NODE_ENV=production
PESAPAL_BASE_URL=https://pay.pesapal.com/v3/api
PESAPAL_CONSUMER_KEY=your_production_key
PESAPAL_CONSUMER_SECRET=your_production_secret
PESAPAL_IPN_ID=your_production_ipn_id
PESAPAL_CALLBACK_URL=https://api.yourdomain.com/api/v1/payments/pesapal/callback
PESAPAL_NOTIFICATION_URL=https://api.yourdomain.com/api/v1/payments/pesapal/ipn
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
```

2. **Frontend Production Environment** (`.env`):
```env
NODE_ENV=production
VITE_API_URL=https://api.yourdomain.com/api/v1
```

### Step 2: PesaPal Account Setup

1. **Login to PesaPal Merchant Dashboard**
2. **Switch to Live Mode** (not Sandbox)
3. **Get Production Credentials:**
   - Consumer Key (different from sandbox)
   - Consumer Secret (different from sandbox)
4. **Register IPN URL:** `https://api.yourdomain.com/api/v1/payments/pesapal/ipn`
5. **Get IPN ID** from dashboard after registration
6. **Configure Success/Failure URLs**

### Step 3: Update Route Configuration

Add the new callback routes to your main server:

```javascript
// In your server.js or main app file
const pesapalCallbackRoutes = require('./src/routes/pesapalCallbackRoutes');
app.use('/api/v1/payments/pesapal', pesapalCallbackRoutes);
```

### Step 4: Replace Configuration File

Replace your existing `pesaPalConfig.js` with the production-ready version:

```bash
# Backup existing config
mv src/config/pesaPalConfig.js src/config/pesaPalConfig.backup.js

# Use the new production config
mv src/config/pesaPalConfig.production.js src/config/pesaPalConfig.js
```

### Step 5: Testing Checklist

Before going live, test these scenarios:

#### ✅ **Pre-Production Testing:**

1. **Environment Variables Test:**
```bash
# Check if all required variables are set
node -e "
const config = require('./src/config/pesaPalConfig');
console.log('Config validation:', config.validateConfig());
"
```

2. **API Endpoint Test:**
```bash
# Test API connectivity
curl -X POST https://pay.pesapal.com/v3/api/Auth/RequestToken \
  -H 'Content-Type: application/json' \
  -d '{"consumer_key":"your_key","consumer_secret":"your_secret"}'
```

3. **Callback URLs Test:**
```bash
# Test callback endpoint accessibility
curl https://api.yourdomain.com/api/v1/payments/pesapal/ipn
curl https://api.yourdomain.com/api/v1/payments/pesapal/callback
```

#### 🧪 **Production Testing:**

1. **Small Test Transaction** (KES 10-50)
2. **Payment Flow End-to-End**
3. **IPN Notification Verification**
4. **Order Status Updates**
5. **Customer Notifications**

## ⚠️ **CRITICAL SECURITY CHECKLIST:**

### ✅ **Must-Have Security Measures:**

1. **HTTPS Everywhere:**
   - ✅ All PesaPal URLs use HTTPS
   - ✅ Frontend uses HTTPS
   - ✅ API uses HTTPS
   - ✅ Callback URLs use HTTPS

2. **Environment Variable Security:**
   - ✅ Production secrets in environment variables
   - ✅ No hardcoded credentials in code
   - ✅ Different keys for production vs sandbox

3. **Input Validation:**
   - ✅ Amount validation (min/max limits)
   - ✅ Phone number validation
   - ✅ Email validation
   - ✅ Order ID sanitization

4. **Error Handling:**
   - ✅ No sensitive data in error messages
   - ✅ Proper logging for debugging
   - ✅ Graceful failure handling

5. **Authentication:**
   - ✅ JWT token verification
   - ✅ User session validation
   - ✅ Order ownership verification

## 🔍 **MONITORING & ALERTS:**

### Recommended Monitoring:

1. **Payment Success Rate** - Monitor for sudden drops
2. **API Response Times** - PesaPal integration performance
3. **Error Rates** - Failed transactions
4. **IPN Delivery** - Ensure notifications are received
5. **Order Status Updates** - Verify orders are being updated

### Set up alerts for:
- Payment failures > 5%
- IPN delivery failures
- API timeouts
- Configuration errors

## 📱 **CUSTOMER EXPERIENCE:**

### Payment Flow Verification:

1. **Mobile Responsive** - Test on actual mobile devices
2. **Payment Methods** - Verify M-Pesa, Airtel Money, Cards work
3. **Loading States** - Proper feedback during processing
4. **Error Messages** - Clear, actionable error messages
5. **Success Confirmation** - Order confirmation and receipt

## 🚨 **ROLLBACK PLAN:**

If issues arise after deployment:

1. **Immediate Rollback:**
   ```bash
   # Restore backup config
   mv src/config/pesaPalConfig.backup.js src/config/pesaPalConfig.js
   # Restart server
   pm2 restart medhelm-backend
   ```

2. **Switch to Sandbox:**
   ```env
   # Temporary fallback
   NODE_ENV=development
   PESAPAL_BASE_URL=https://cybqa.pesapal.com/pesapalv3/api
   ```

3. **Disable Payments:**
   ```javascript
   // Emergency payment disable
   const PAYMENTS_ENABLED = false;
   ```

## ✅ **FINAL CHECKLIST:**

Before going live, ensure ALL of these are ✅:

- [ ] Production PesaPal account activated
- [ ] Production Consumer Key & Secret obtained
- [ ] IPN URL registered with PesaPal
- [ ] IPN ID added to environment variables
- [ ] All URLs use HTTPS
- [ ] SSL certificates valid
- [ ] Test transaction completed successfully
- [ ] Order status updates working
- [ ] Customer notifications working
- [ ] Error monitoring enabled
- [ ] Rollback plan ready
- [ ] Team trained on monitoring
- [ ] Documentation updated

## 🎉 **POST-DEPLOYMENT:**

After successful deployment:

1. **Monitor for 24 hours** - Check all metrics
2. **Test with small orders** - Verify everything works
3. **Customer support ready** - Brief team on payment issues
4. **Backup verification** - Ensure database backups working
5. **Performance baseline** - Record normal performance metrics

---

**🔥 CRITICAL NOTE:** Never test production payments with real customer orders. Always use small test amounts first!