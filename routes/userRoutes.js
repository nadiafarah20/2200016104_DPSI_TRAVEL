const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeUser, authorizeAdmin } = require('../middleware/auth');

// Route to register a new user
router.post('/register', userController.register);

// Route to login
router.post('/login', userController.login);

// Route to get all users, only accessible by admin
router.get('/users', authenticateToken, authorizeAdmin, userController.getAllUsers);

// Example of a protected route
router.get('/protected', authenticateToken, userController.protectedRoute);

module.exports = router;
