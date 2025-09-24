const express = require('express');
const { subscribeUser } = require('../controllers/subscriptionController');

const router = express.Router();

router.post('/subscribe', subscribeUser);

module.exports = router;