const express = require('express');
const router = express.Router();
const metodePembayaranController = require('../controllers/metodePembayaranController');
const authorize = require('../middleware/authorize');

// Get all MetodePembayaran (User and Admin)
router.get('/', authorize.verifyToken, metodePembayaranController.getAllMetodePembayaran);

// Get MetodePembayaran by auto-increment ID (User and Admin)
router.get('/:id', authorize.verifyToken, metodePembayaranController.getMetodePembayaranByAutoIncrementId);

// Create new MetodePembayaran (User)
router.post('/', authorize.verifyToken, authorize.isUser, metodePembayaranController.createMetodePembayaran);

// Update MetodePembayaran (Admin only)
router.put('/:id', authorize.verifyToken, authorize.isAdmin, metodePembayaranController.updateMetodePembayaran);

// Delete MetodePembayaran (Admin only)
router.delete('/:id', authorize.verifyToken, authorize.isAdmin, metodePembayaranController.deleteMetodePembayaran);

module.exports = router;
