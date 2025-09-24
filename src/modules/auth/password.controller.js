const User = require('../../Database/models/user.model'); // Adjust path as needed
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Request password reset (send email with token)
exports.requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Generate reset token (expires in 1 hour)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // TODO: Send token via email to user.email
        // e.g., sendEmail(user.email, `Reset link: ${process.env.FRONTEND_URL}/reset-password?token=${token}`);

        res.json({ success: true, message: 'Password reset link sent to email.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to request password reset', error: err.message });
    }
};

// Reset password (using token)
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ success: true, message: 'Password reset successful.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to reset password', error: err.message });
    }
};

// Change password (authenticated user)
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) return res.status(400).json({ message: 'Current password is incorrect' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ success: true, message: 'Password changed successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to change password', error: err.message });
    }
};