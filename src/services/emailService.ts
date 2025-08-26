import nodemailer from 'nodemailer';
import emailConfig from '../config/emailConfig';
import { logger } from '../lib/logger';

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: {
    user: emailConfig.auth.user,
    pass: emailConfig.auth.pass,
  },
});

export async function sendOrderConfirmation(toEmail: string, order: any) {
  const mailOptions = {
    from: emailConfig.fromEmail,
    to: toEmail,
    subject: emailConfig.templates.orderConfirmation.subject,
  text: `Thank you for your order! Order ID: ${order._id}`,
    // In production, use HTML templates for nicer emails
  };

  try {
    await transporter.sendMail(mailOptions);
  logger.info(`Order confirmation email sent to ${toEmail}`);
  } catch (error) {
    logger.error('Error sending order confirmation email:', error);
    throw error;
  }
}