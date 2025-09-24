const Address = require('../../Database/models/address.model'); // Adjust path as needed

// Create address
exports.createAddress = async (req, res) => {
    try {
        const address = new Address({ ...req.body, user: req.user._id });
        await address.save();
        res.status(201).json({ success: true, data: address });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to create address', error: err.message });
    }
};

// Get all addresses for user
exports.getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user._id });
        res.json({ success: true, data: addresses });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch addresses', error: err.message });
    }
};

// Get single address by ID
exports.getAddressById = async (req, res) => {
    try {
        const address = await Address.findOne({ _id: req.params.id, user: req.user._id });
        if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
        res.json({ success: true, data: address });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch address', error: err.message });
    }
};

// Update address
exports.updateAddress = async (req, res) => {
    try {
        const address = await Address.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
        res.json({ success: true, data: address });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to update address', error: err.message });
    }
};

// Delete address
exports.deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
        res.json({ success: true, message: 'Address deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete address', error: err.message });
    }
};
