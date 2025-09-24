// src/modules/address/address.validation.js
const Joi = require('joi');
const { validateAddress } = require('./address.validation');
router.post('/', authenticate, validateAddress, addressController.createAddress);
router.put('/:id', authenticate, validateAddress, addressController.updateAddress);
const addressSchema = Joi.object({
    street: Joi.string().min(2).max(100).required(),
    city: Joi.string().min(2).max(50).required(),
    state: Joi.string().min(2).max(50).required(),
    postalCode: Joi.string().min(2).max(20).required(),
    country: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(7).max(20).optional(),
});

function validateAddress(req, res, next) {
    const { error } = addressSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }
    next();
}

module.exports = { validateAddress };