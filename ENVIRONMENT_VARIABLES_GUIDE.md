# Environment Variables Configuration Guide

## Overview
This document outlines all environment variables used in the Medhelm Supplies application to ensure no hardcoded URLs or sensitive information is embedded in the codebase.

## Frontend Environment Variables (.env)

### API Configuration
```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Company Information
```env
VITE_COMPANY_NAME=Medhelm Supplies
VITE_COMPANY_EMAIL=info@medhelmsupplies.co.ke
VITE_COMPANY_PHONE=+254 XXX XXX XXX
VITE_LOGO_URL=https://medhelmsupplies.co.ke/medhelm-logo.png
```

### Social Media Links
```env
VITE_SOCIAL_FACEBOOK=https://facebook.com/medhelmsupplies
VITE_SOCIAL_TWITTER=https://twitter.com/medhelmsupplies
VITE_SOCIAL_INSTAGRAM=https://instagram.com/medhelmsupplies
VITE_SOCIAL_LINKEDIN=https://linkedin.com/company/medhelmsupplies
```

### Payment Configuration
```env
VITE_PESAPAL_CONSUMER_KEY=your_pesapal_consumer_key
VITE_PESAPAL_CONSUMER_SECRET=your_pesapal_consumer_secret
```

### Error Monitoring
```env
VITE_SENTRY_DSN=your_sentry_dsn_for_frontend
```

## Backend Environment Variables (eCommerce-Backend/.env)

### Server Configuration
```env
NODE_ENV=development
PORT=5000
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
API_BASE_URL=http://localhost:5000/api/v1
```

### CORS Configuration
```env
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:3000
```

### Database Configuration
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

### Authentication & Security
```env
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret
SESSION_SECRET=your_session_secret
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
```

### Google OAuth
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/v1/auth/google/callback
```

### Email Configuration
```env
BREVO_API_KEY=your_brevo_api_key
EMAIL_HOST=smtp-relay.brevo.com
EMAIL_PORT=587
EMAIL_USER=your_smtp_user
EMAIL_FROM=info@medhelmsupplies.co.ke
```

### Company & Branding
```env
COMPANY_NAME=Medhelm Supplies
COMPANY_EMAIL=info@medhelmsupplies.co.ke
COMPANY_PHONE=+254 XXX XXX XXX
LOGO_URL=https://medhelmsupplies.co.ke/medhelm-logo.png
```

### Social Media (Backend)
```env
SOCIAL_FACEBOOK=https://facebook.com/medhelmsupplies
SOCIAL_TWITTER=https://twitter.com/medhelmsupplies
SOCIAL_INSTAGRAM=https://instagram.com/medhelmsupplies
SOCIAL_LINKEDIN=https://linkedin.com/company/medhelmsupplies
```

### Payment Configuration
```env
PESAPAL_CONSUMER_KEY=your_pesapal_consumer_key
PESAPAL_CONSUMER_SECRET=your_pesapal_consumer_secret
PESAPAL_CALLBACK_URL=https://medhelmsupplies.co.ke/api/payments/callback
PESAPAL_REDIRECT_URL=https://medhelmsupplies.co.ke/payment-success
PESAPAL_CANCEL_URL=https://medhelmsupplies.co.ke/payment-cancelled
PESAPAL_TEST_MODE=false
```

### File Upload & Storage
```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
MAX_FILE_SIZE=5242880
UPLOAD_PATH=uploads/
```

### Contact Form Configuration
```env
CONTACT_EMAIL_USER=info@medhelmsupplies.co.ke
CONTACT_EMAIL_PASS=your_contact_email_password
CONTACT_EMAIL_RECEIVER=info@medhelmsupplies.co.ke
```

## Usage in Code

### Frontend Components
Replace hardcoded values with:
```tsx
// Instead of: "info@medhelmsupplies.co.ke"
{import.meta.env.VITE_COMPANY_EMAIL || "info@medhelmsupplies.co.ke"}

// Instead of: "https://facebook.com/medhelmsupplies"
{import.meta.env.VITE_SOCIAL_FACEBOOK || "https://facebook.com/medhelmsupplies"}

// Instead of: "http://localhost:5000/api/v1"
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
```

### Backend Controllers
Replace hardcoded values with:
```javascript
// Instead of: 'https://medhelmsupplies.co.ke/medhelm-logo.png'
const logoUrl = process.env.LOGO_URL || 'https://medhelmsupplies.co.ke/medhelm-logo.png';

// Instead of: 'info@medhelmsupplies.co.ke'
const companyEmail = process.env.COMPANY_EMAIL || 'info@medhelmsupplies.co.ke';

// Instead of: 'Medhelm Supplies'
const companyName = process.env.COMPANY_NAME || 'Medhelm Supplies';
```

## Production vs Development

### Development (.env.local or .env)
- Use localhost URLs
- Use test API keys
- Enable debug modes
- Use local database connections

### Production (.env.production)
- Use production domain URLs
- Use production API keys
- Disable debug modes
- Use production database connections

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use `.env.example`** files to document required variables
3. **Rotate secrets regularly** in production
4. **Use different credentials** for development and production
5. **Validate environment variables** at application startup
6. **Use strong, unique secrets** for JWT and sessions

## Environment Variable Validation

Add validation in your application startup:
```javascript
// Backend validation
const requiredEnvVars = [
    'MONGO_URI',
    'JWT_SECRET',
    'EMAIL_FROM',
    'BREVO_API_KEY'
];

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.error(`Missing required environment variable: ${envVar}`);
        process.exit(1);
    }
});
```

## Updated Files

### Frontend Files Modified:
- `src/components/Footer.tsx` - Social media links and company email
- `src/components/Header.tsx` - Company email
- `src/pages/Contact.tsx` - Company contact information
- `src/components/NewsletterSubscription.tsx` - API URL

### Backend Files Modified:
- `src/controllers/newsletter.controller.js` - Logo URL, company info
- `src/services/emailService.js` - Company information in emails
- `eCommerce-Backend/passport.js` - Logo URL
- `test-newsletter-*.js` - API URLs

### Environment Files Updated:
- `.env` (Frontend)
- `eCommerce-Backend/.env` (Backend)

All hardcoded URLs and company information have been moved to environment variables for better security and configuration management.