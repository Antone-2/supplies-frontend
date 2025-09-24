const express = require('express');
const router = express.Router();
const addressController = require('./address.controller');
const authenticate = require('../../middlewares/auth'); // Adjust path as needed

// Create address
router.post('/', authenticate, addressController.createAddress);

// Get all addresses for user
router.get('/', authenticate, addressController.getAddresses);

// Get single address by ID
router.get('/:id', authenticate, addressController.getAddressById);

// Update address
router.put('/:id', authenticate, addressController.updateAddress);

// Delete address
router.delete('/:id', authenticate, addressController.deleteAddress);

module.exports = router;