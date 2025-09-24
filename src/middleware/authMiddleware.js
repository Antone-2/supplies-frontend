// Bridge module to use the implemented JWT auth in auth.js
// Ensures routes expecting CommonJS require('authMiddleware') get a working middleware
const authenticateToken = require('./auth');
module.exports = authenticateToken;