# Medhelm Backend

A robust e-commerce backend API built with Node.js, Express, and MongoDB, featuring user authentication, product management, shopping cart, orders, and payment integration.

## Table of Contents

- [Features](#features)
- [Environment Configuration](#environment-configuration)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Troubleshooting](#troubleshooting)

## Features

- User authentication with JWT and OAuth (Google)
- Product and category management
- Shopping cart and wishlist functionality
- Unified checkout: All payments (M-Pesa, Airtel Money, PayPal, bank transfer, card) are processed via PesaPal. Users are redirected to PesaPal to complete payment securely.
- Email verification and password reset
- Rate limiting and security middleware
- Health check endpoints
- Comprehensive logging with Pino

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

#### Database
```env
MONGO_URI=mongodb://localhost:27017/medhelm
# Alternative: MONGODB_URI (legacy support)
```

#### Server Configuration
```env
PORT=5000
NODE_ENV=development
LOG_LEVEL=info
```

#### Authentication & Security
```env
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
SESSION_SECRET=your_session_secret_here
```

#### CORS Configuration
```env
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com
```

#### Rate Limiting
```env
RATE_LIMIT_WINDOW=900000  # 15 minutes in milliseconds
RATE_LIMIT_MAX=300        # Maximum requests per window
```

#### Frontend/Backend URLs
```env
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
```

#### Google OAuth (Optional)
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Email Service
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM="Medhelm Supplies <noreply@medhelmsupplies.co.ke>"
CONTACT_EMAIL_PASS=your_contact_email_password
```

#### PesaPal Payment Integration
```env
PESAPAL_BASE_URL=https://pay.pesapal.com/v3/api/
PESAPAL_CONSUMER_KEY=your_pesapal_consumer_key
PESAPAL_CONSUMER_SECRET=your_pesapal_consumer_secret
PESAPAL_CALLBACK_URL=http://localhost:5000/api/v1/payments/pesapal/callback
PESAPAL_NOTIFICATION_URL=http://localhost:5000/api/v1/payments/pesapal/ipn
PESAPAL_REDIRECT_URL=http://localhost:3000/payment-success
PESAPAL_IPN_ID=your_ipn_id
```

**Unified Payment Flow:**
- All payment methods (M-Pesa, Airtel Money, PayPal, bank transfer, card) are handled by PesaPal.
- Users are redirected to PesaPal to complete payment, then returned to your site with payment status notifications.

#### Production Checklist
- Ensure `.env` files are not committed to public repos (see `.gitignore`)
- Enforce HTTPS and secure cookies in production
- Set strong secrets for JWT and session
- Monitor errors with Sentry
- Use health check endpoints for uptime and memory monitoring

#### Redis Cache (Optional)
```env
REDIS_URL=redis://localhost:6379
```

#### SMS Service (Optional)
```env
BREVO_SMS_API_KEY=your_brevo_sms_api_key
```

#### Error Monitoring (Optional)
```env
SENTRY_DSN=your_sentry_dsn_here
```

### Environment Variable Usage Notes

- **FRONTEND_URL**: Used for OAuth redirects, email verification links, and password reset links
- **BACKEND_URL**: Used for OAuth callback URLs and API references
- **MONGO_URI**: Primary database connection string (MONGODB_URI is supported for legacy compatibility)
- **JWT_SECRET**: Must be a strong, unique secret for production deployments
- **CORS_ORIGINS**: Comma-separated list of allowed origins for CORS

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Antone-2/medhelm-backend.git
   cd medhelm-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env  # If example exists, or create new .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or install MongoDB locally
   ```

## Development

### Starting the Development Server

```bash
npm run dev
# or
npm start
```

The server will start on the port specified in your `PORT` environment variable (default: 5000).

### Health Checks

The application provides multiple health check endpoints:

- `GET /api/health` - Primary health check endpoint
- `GET /healthz` - Kubernetes-style health check alias

Example response:
```json
{
  "status": "ok",
  "message": "Backend is running!",
  "time": "2024-01-15T10:30:00.000Z"
}
```

### Running Tests

```bash
npm test
```

## Deployment

### Docker Deployment

1. **Build the Docker image:**
   ```bash
   docker build -t medhelm-backend .
   ```

2. **Run the container:**
   ```bash
   docker run -p 5000:5000 --env-file .env medhelm-backend
   ```

### Production Environment

1. **Set NODE_ENV to production:**
   ```env
   NODE_ENV=production
   ```

2. **Use strong secrets:**
   - Generate a strong JWT_SECRET
   - Use secure SESSION_SECRET
   - Configure proper CORS_ORIGINS

3. **Database:**
   - Use MongoDB Atlas or properly configured MongoDB instance
   - Enable authentication and SSL

4. **Monitoring:**
   - Configure Sentry for error tracking
   - Set up proper logging aggregation

## API Endpoints

### Payment
- `POST /api/v1/payments/pesapal` - Initiate PesaPal payment (redirects user to PesaPal)
- `POST /api/v1/payments/callback` - PesaPal callback for payment status

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/refresh-token` - Refresh JWT token
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `GET /api/v1/auth/verify-email` - Verify email address

### OAuth
- `GET /api/v1/auth/google` - Initiate Google OAuth
- `GET /api/v1/auth/google/callback` - Google OAuth callback

### Products
- `GET /api/v1/products` - List products
- `GET /api/v1/products/:id` - Get product details
- `POST /api/v1/products` - Create product (admin)
- `PUT /api/v1/products/:id` - Update product (admin)
- `DELETE /api/v1/products/:id` - Delete product (admin)

### Categories
- `GET /api/v1/categories` - List categories
- `GET /api/v1/categories/:id` - Get category details
- `POST /api/v1/categories` - Create category (admin)
- `PUT /api/v1/categories/:id` - Update category (admin)
- `DELETE /api/v1/categories/:id` - Delete category (admin)

### Cart
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/add` - Add item to cart
- `PUT /api/v1/cart/update` - Update cart item
- `DELETE /api/v1/cart/remove` - Remove item from cart

### Wishlist
- `GET /api/v1/wishlist` - Get user wishlist
- `POST /api/v1/wishlist/add` - Add item to wishlist
- `POST /api/v1/wishlist/remove` - Remove item from wishlist

### Orders
- `GET /api/v1/orders` - List user orders
- `GET /api/v1/orders/:id` - Get order details
- `POST /api/v1/orders` - Create new order
- `PUT /api/v1/orders/:id` - Update order status (admin)

### Users
- `GET /api/v1/users` - List users (admin)
- `GET /api/v1/users/:id` - Get user details
- `PUT /api/v1/users/:id` - Update user profile
- `DELETE /api/v1/users/:id` - Delete user (admin)

## Troubleshooting

### Common 404 Issues

#### 1. Routes Not Found
**Problem**: API endpoints returning 404 errors

**Solutions:**
- Verify the route order in `server.js` - health checks should be first, API routes second, 404 handler last
- Check that all route files are properly required and registered
- Ensure the correct API prefix (`/api/v1/`) is used

#### 2. Health Check Endpoints Not Working
**Problem**: `/api/health` or `/healthz` returning 404

**Solutions:**
- Health check endpoints are registered first in the route order
- Check that no middleware is blocking these routes
- Verify no conflicting route registrations

#### 3. OAuth Callback 404 Errors
**Problem**: Google OAuth callback not working

**Solutions:**
- Verify `BACKEND_URL` environment variable is set correctly
- Check Google OAuth configuration matches the callback URL
- Ensure `FRONTEND_URL` is configured for proper redirects

#### 4. Static File 404 Errors
**Problem**: Static assets not being served

**Solutions:**
- Add static file middleware if needed: `app.use(express.static('public'))`
- Check file paths and ensure files exist
- Verify proper CORS configuration for asset requests

### Environment Variable Issues

#### Missing Environment Variables
**Error**: Application fails to start due to missing variables

**Solutions:**
1. Check the `.env` file exists and is in the correct location
2. Verify all required variables are set (see [Environment Configuration](#environment-configuration))
3. Check for typos in variable names
4. Ensure the `.env` file is being loaded correctly

#### Database Connection Issues
**Error**: MongoDB connection failures

**Solutions:**
1. Verify `MONGO_URI` is correctly formatted
2. Check MongoDB server is running and accessible
3. Ensure database credentials are correct
4. For MongoDB Atlas, verify network access settings

### Performance Issues

#### High Response Times
**Solutions:**
1. Check database query optimization
2. Verify rate limiting settings aren't too restrictive
3. Monitor memory usage and database connections
4. Check for unhandled promise rejections in logs

#### Memory Leaks
**Solutions:**
1. Monitor application memory usage
2. Check for unclosed database connections
3. Verify proper error handling in async operations
4. Use the health check endpoint to monitor memory stats

### Error Monitoring

#### Setting Up Sentry
1. Create a Sentry account and project
2. Add your `SENTRY_DSN` to the environment variables
3. Uncomment Sentry initialization in `server.js`
4. Monitor errors in the Sentry dashboard

#### Log Analysis
- Use structured logging with the Pino logger
- Set appropriate `LOG_LEVEL` (debug, info, warn, error)
- Monitor logs for patterns and recurring issues

### Contact and Support

For questions about PesaPal integration or payment issues, see the [PesaPal documentation](https://developer.pesapal.com/) or contact support.

For additional support or questions:
- Create an issue in the GitHub repository
- Check existing issues for similar problems
- Review the application logs for detailed error information

## License

This project is licensed under the MIT License.#   m e d h e l m - b a c k e n d 2  
 #   m e d h e l m - b a c k e n d 2  
 #   s u p p l i e s - f r o n t e n d  
 #   s u p p l i e s - f r o n t e n d  
 #   s u p p l i e s - f r o n t e n d  
 