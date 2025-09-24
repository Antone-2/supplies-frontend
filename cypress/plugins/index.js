// cypress/plugins/index.js
// Add custom tasks for fetching verification and reset tokens from the database

const mongoose = require('mongoose');

module.exports = (on, config) => {
    on('task', {
        async getVerificationToken(email) {
            // Connect to the database if not already connected
            if (mongoose.connection.readyState === 0) {
                await mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
            }
            const User = mongoose.model(
                'User',
                new mongoose.Schema({
                    email: String,
                    verificationToken: String,
                }, { strict: false })
            );
            const user = await User.findOne({ email });
            return user && user.verificationToken ? user.verificationToken : null;
        },
        async getResetToken(email) {
            if (mongoose.connection.readyState === 0) {
                await mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });
            }
            const User = mongoose.model(
                'User',
                new mongoose.Schema({
                    email: String,
                    resetPasswordToken: String,
                }, { strict: false })
            );
            const user = await User.findOne({ email });
            return user && user.resetPasswordToken ? user.resetPasswordToken : null;
        },
    });
};
