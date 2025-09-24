const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/emailService');

// POST /api/contact
router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone, organization, subject, message } = req.body;
    try {
        const html = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Organization:</strong> ${organization}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong><br/>${message}</p>
        `;
        await sendEmail('info@medhelmsupplies.co.ke', `Contact Form: ${subject || 'New Message'}`, html);
        res.status(200).json({ success: true, message: 'Message sent to admin.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to send message.', error: err.message });
    }
});

module.exports = router;
