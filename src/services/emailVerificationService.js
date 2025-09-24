const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const EMAIL_SECRET = process.env.EMAIL_SECRET;
const BASE_URL = process.env.PROD_BASE_URL || process.env.BASE_URL;

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // e.g., smtp.sendgrid.net or your production SMTP host
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendVerificationEmail(user) {
    const token = jwt.sign({ userId: user._id }, EMAIL_SECRET, { expiresIn: '1d' });
    const url = `${BASE_URL}/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Verify your email',
        html: `<p>Please verify your email by clicking <a href="${url}">here</a>.</p>`
    };

    await transporter.sendMail(mailOptions);
}

async function verifyEmailToken(token) {
    try {
        const decoded = jwt.verify(token, EMAIL_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) throw new Error('User not found');
        user.isVerified = true;
        await user.save();
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    sendVerificationEmail,
    verifyEmailToken,
};
