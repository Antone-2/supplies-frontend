const Subscriber = require('../models/Subscriber');
const sendEmail = require('../utils/emailService');

// Send a notification to all subscribers
async function notifySubscribers(subject, html) {
    const subscribers = await Subscriber.find({});
    for (const sub of subscribers) {
        try {
            await sendEmail(sub.email, subject, html);
        } catch (err) {
            console.error(`Failed to send to ${sub.email}:`, err.message);
        }
    }
}

module.exports = { notifySubscribers };