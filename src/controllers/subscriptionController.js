const Subscriber = require('../models/Subscriber');
const sendEmail = require('../utils/emailService');

async function subscribeUser(req, res) {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    try {
        // Save to DB if not already subscribed
        let subscriber = await Subscriber.findOne({ email });
        if (!subscriber) {
            subscriber = await Subscriber.create({ email });
        }
        // Send confirmation email
        await sendEmail(
            email,
            'Subscription Successful',
            `<p>Thank you for subscribing to Medhelm Supplies updates!</p>`
        );
        res.json({ message: 'Subscription successful. Please check your email for confirmation.' });
    } catch (err) {
        res.status(500).json({ error: 'Subscription failed', details: err.message });
    }
}

module.exports = { subscribeUser };