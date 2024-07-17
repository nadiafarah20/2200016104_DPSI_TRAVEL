const express = require('express');
const router = express.Router();
const pembayaranController = require('../controllers/pembayaranController');
const authorize = require('../middleware/authorize');

// Get all Pembayaran (Admin only)
router.get('/', authorize.verifyToken, authorize.isAdmin, pembayaranController.getAllPembayaran);

// Get Pembayaran by auto-increment ID (User and Admin)
router.get('/:id', authorize.verifyToken, pembayaranController.getPembayaranByAutoIncrementId);

// Create new Pembayaran (User)
router.post('/', authorize.verifyToken, authorize.isUser, pembayaranController.createPembayaran);

// Update Pembayaran (Admin only)
router.put('/:id', authorize.verifyToken, authorize.isAdmin, pembayaranController.updatePembayaran);

// Delete Pembayaran (Admin only)
router.delete('/:id', authorize.verifyToken, authorize.isAdmin, pembayaranController.deletePembayaran);

module.exports = router;
