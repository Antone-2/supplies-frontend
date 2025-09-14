// src/config/emailConfig.js
// Email configuration for nodemailer

const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'info@medhelmsupplies.co.ke',
    pass: process.env.EMAIL_PASS || 'Texas99$',
  },
  from: process.env.EMAIL_FROM || '"Medhelm Supplies" <info@medhelmsupplies.co.ke>',
};

export default emailConfig;

