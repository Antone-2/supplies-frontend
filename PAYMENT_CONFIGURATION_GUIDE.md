# Payment Configuration Guide - Real Bank Details

## 🏦 Current Payment Setup Analysis

Based on your payment interface, here's where your payment details are configured:

### 📱 M-PESA Details Shown:
- **Paybill Number**: 220222
- **Account Number**: 92279474 
- **Business Name**: "Medhelm Supplies"
- **Amount**: KES 1,500.00

## 🔧 How to Update to Your Real Payment Details:

### 1. **PesaPal Merchant Dashboard** (Primary Configuration)
The M-PESA paybill details are configured in your PesaPal merchant account:

**Steps to Update:**
1. Login to [PesaPal Merchant Portal](https://www.pesapal.com/)
2. Go to **Account Settings** or **Business Profile**
3. Update **M-PESA Business Details**:
   - Business Name: "Your Real Business Name"
   - Paybill Number: Your real paybill number
   - Account Number: Your real account number
4. Verify your M-PESA integration settings
5. Save changes and test

### 2. **Environment Variables** (API Configuration)
Your `.env` file contains PesaPal API credentials:

```env
# Current Configuration (Backend)
PESAPAL_CONSUMER_KEY=your_consumer_key
PESAPAL_CONSUMER_SECRET=your_consumer_secret
PESAPAL_CALLBACK_URL=your_callback_url
PESAPAL_REDIRECT_URL=your_redirect_url
PESAPAL_CANCEL_URL=your_cancel_url
PESAPAL_TEST_MODE=true_or_false

# Frontend Configuration
VITE_PESAPAL_CONSUMER_KEY=your_public_key
VITE_PESAPAL_CONSUMER_SECRET=your_public_secret
```

### 3. **Test vs Production Mode**
Currently: `PESAPAL_TEST_MODE=***HIDDEN***`

**For Real Payments:**
- Set `PESAPAL_TEST_MODE=false` for production
- Set `PESAPAL_TEST_MODE=true` for testing

## 🔄 **Steps to Switch to Real Payment Details:**

### Step 1: Update PesaPal Account
1. **Login to PesaPal Dashboard**
2. **Verify Business Registration**:
   - Business License
   - M-PESA Till/Paybill registration
   - Bank account verification
3. **Update Payment Methods**:
   - Add your real M-PESA paybill
   - Configure bank account details
   - Set up card payment processing

### Step 2: Update Environment Configuration
```bash
# Switch to Production Mode
PESAPAL_TEST_MODE=false

# Update URLs for production
PESAPAL_CALLBACK_URL=https://yourdomain.com/api/payment/callback
PESAPAL_REDIRECT_URL=https://yourdomain.com/payment-success
PESAPAL_CANCEL_URL=https://yourdomain.com/payment-cancelled
```

### Step 3: Business Information Update
Update business details in your system:

**Frontend Display Name:**
- Update business name in payment components
- Modify receipt templates
- Update terms of service

**Backend Configuration:**
- Update order confirmation emails
- Modify payment receipts
- Configure business information

## 💳 **Payment Methods Configuration:**

### Real M-PESA Integration
```javascript
// Your real M-PESA details should be configured in PesaPal
const realMpesaConfig = {
    businessName: "Your Real Business Name",
    paybillNumber: "YOUR_REAL_PAYBILL", // Replace 220222
    accountNumber: "YOUR_REAL_ACCOUNT", // Replace 92279474
    currency: "KES"
};
```

### Bank Transfer Details
```javascript
const bankDetails = {
    bankName: "Your Bank Name",
    accountName: "Your Business Account Name",
    accountNumber: "Your Account Number",
    branchCode: "Your Branch Code",
    swiftCode: "SWIFT Code (for international)"
};
```

## ⚠️ **Important Security Notes:**

1. **Never hardcode payment credentials in source code**
2. **Use environment variables for all sensitive data**
3. **Keep production and test credentials separate**
4. **Regularly rotate API keys and secrets**
5. **Use HTTPS for all payment callbacks**

## 🧪 **Testing New Configuration:**

### Test Payment Flow:
1. **Test Mode**: Verify with test credentials
2. **Small Amount**: Test with minimal amount (KES 1)
3. **End-to-End**: Complete full payment cycle
4. **Callback Verification**: Ensure callbacks work correctly
5. **Production Switch**: Move to production when ready

## 📞 **Support Resources:**

- **PesaPal Support**: https://support.pesapal.com/
- **M-PESA Business**: https://www.safaricom.co.ke/business
- **Integration Docs**: https://developer.pesapal.com/

## 🚀 **Next Steps:**

1. Access your PesaPal merchant dashboard
2. Update business profile with real details
3. Configure M-PESA integration properly
4. Test with small amounts first
5. Switch to production mode
6. Monitor payment success rates