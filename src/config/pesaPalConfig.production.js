// Production-Ready Pesapal Configuration for Backend
const pesaPalConfig = {
    // API Configuration
    api: {
        baseUrl: process.env.PESAPAL_BASE_URL,
        consumerKey: process.env.PESAPAL_CONSUMER_KEY,
        consumerSecret: process.env.PESAPAL_CONSUMER_SECRET
    },

    // Payment Configuration
    payment: {
        currency: 'KES',
        country: 'KE',
        callbackUrl: process.env.PESAPAL_CALLBACK_URL,
        notificationUrl: process.env.PESAPAL_NOTIFICATION_URL,
        redirectUrl: process.env.PESAPAL_REDIRECT_URL,
        ipnId: process.env.PESAPAL_IPN_ID
    },

    // Order Configuration
    order: {
        defaultDescription: 'Medhelm Supplies Order',
        timeout: 3600, // 1 hour in seconds
        retries: 3,
        maxAmount: 1000000, // 1M KES maximum per transaction
        minAmount: 10 // 10 KES minimum per transaction
    },

    // Environment Detection
    environment: process.env.NODE_ENV ? 'live' : 'sandbox',

    // Production/Development specific settings
    isProduction: function () {
        return process.env.NODE_ENV;
    },

    // Get appropriate URLs based on environment
    getCallbackUrl: function () {
        if (this.isProduction()) {
            if (!process.env.BACKEND_URL) {
                throw new Error('BACKEND_URL environment variable is required in production');
            }
            return this.payment.callbackUrl || `${process.env.BACKEND_URL}/api/v1/payments/pesapal/callback`;
        } else {
            return this.payment.callbackUrl || `${process.env.BACKEND_URL}/api/v1/payments/pesapal/callback`;
        }
    },

    getNotificationUrl: function () {
        if (this.isProduction()) {
            if (!process.env.BACKEND_URL) {
                throw new Error('BACKEND_URL environment variable is required in production');
            }
            return this.payment.notificationUrl || `${process.env.BACKEND_URL}/api/v1/payments/pesapal/ipn`;
        } else {
            return this.payment.notificationUrl || `${process.env.BACKEND_URL}/api/v1/payments/pesapal/ipn`;
        }
    },

    getRedirectUrl: function () {
        if (this.isProduction()) {
            if (!process.env.FRONTEND_URL) {
                throw new Error('FRONTEND_URL environment variable is required in production');
            }
            return this.payment.redirectUrl || `${process.env.FRONTEND_URL}/payment-success`;
        } else {
            return this.payment.redirectUrl || `${process.env.FRONTEND_URL}/payment-success`;
        }
    },

    // Validation helper
    validateConfig: function () {
        const errors = [];

        // Required environment variables
        if (!this.api.consumerKey) {
            errors.push('PESAPAL_CONSUMER_KEY environment variable is required');
        }
        if (!this.api.consumerSecret) {
            errors.push('PESAPAL_CONSUMER_SECRET environment variable is required');
        }
        if (!this.api.baseUrl) {
            errors.push('PESAPAL_BASE_URL environment variable is required');
        }

        // Production-specific validation
        if (this.isProduction()) {
            if (!this.payment.ipnId) {
                errors.push('PESAPAL_IPN_ID is required for production environment');
            }

            // Validate HTTPS URLs in production
            const callbackUrl = this.getCallbackUrl();
            const notificationUrl = this.getNotificationUrl();
            const redirectUrl = this.getRedirectUrl();

            if (callbackUrl && !callbackUrl.startsWith('https://')) {
                errors.push('PESAPAL_CALLBACK_URL must use HTTPS in production');
            }
            if (notificationUrl && !notificationUrl.startsWith('https://')) {
                errors.push('PESAPAL_NOTIFICATION_URL must use HTTPS in production');
            }
            if (redirectUrl && !redirectUrl.startsWith('https://')) {
                errors.push('PESAPAL_REDIRECT_URL must use HTTPS in production');
            }

            // Validate production base URL
            if (!this.api.baseUrl.includes('pay.pesapal.com')) {
                errors.push('PESAPAL_BASE_URL should use production endpoint: https://pay.pesapal.com/v3/api');
            }
        }

        if (errors.length > 0) {
            console.error('❌ Pesapal Configuration Errors:');
            errors.forEach(error => console.error(`   - ${error}`));

            if (this.isProduction()) {
                // In production, throw error to prevent startup with invalid config
                throw new Error('Invalid PesaPal configuration for production environment');
            }
            return false;
        }

        // Success message
        console.log('✅ PesaPal Configuration Valid');
        console.log(`   Environment: ${this.environment}`);
        console.log(`   Base URL: ${this.api.baseUrl}`);
        console.log(`   Callback URL: ${this.getCallbackUrl()}`);
        console.log(`   IPN URL: ${this.getNotificationUrl()}`);

        return true;
    },

    // Amount validation
    validateAmount: function (amount) {
        const numAmount = Number(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return { valid: false, error: 'Amount must be a positive number' };
        }
        if (numAmount < this.order.minAmount) {
            return { valid: false, error: `Amount must be at least KES ${this.order.minAmount}` };
        }
        if (numAmount > this.order.maxAmount) {
            return { valid: false, error: `Amount cannot exceed KES ${this.order.maxAmount.toLocaleString()}` };
        }
        return { valid: true };
    },

    // Build PesaPal order object
    buildOrderRequest: function (orderData) {
        const { orderId, amount, description, email, phone, firstName, lastName } = orderData;

        // Validate amount
        const amountValidation = this.validateAmount(amount);
        if (!amountValidation.valid) {
            throw new Error(amountValidation.error);
        }

        const orderRequest = {
            id: orderId,
            currency: this.payment.currency,
            amount: Number(amount),
            description: description || this.order.defaultDescription,
            callback_url: this.getCallbackUrl(),
            billing_address: {
                email_address: email,
                phone_number: phone,
                country_code: this.payment.country,
                first_name: firstName || 'Customer',
                last_name: lastName || ''
            }
        };

        // Add notification_id only in production and if IPN ID is configured
        if (this.isProduction() && this.payment.ipnId) {
            orderRequest.notification_id = this.payment.ipnId;
        }

        return orderRequest;
    }
};

// Validate configuration on load
try {
    pesaPalConfig.validateConfig();
} catch (error) {
    console.error('Failed to initialize PesaPal configuration:', error.message);
    if (pesaPalConfig.isProduction()) {
        process.exit(1); // Exit in production if config is invalid
    }
}

module.exports = pesaPalConfig;