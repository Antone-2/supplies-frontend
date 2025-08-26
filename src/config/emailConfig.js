// src/config/emailConfig.js
// Email configuration for nodemailer

const emailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT) : 587,
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASS || 'password',
  },
  from: process.env.EMAIL_FROM || 'no-reply@example.com',
};

export default emailConfig;

 