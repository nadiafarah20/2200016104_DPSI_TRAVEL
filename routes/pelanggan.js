const express = require('express');
const router = express.Router();
const pelangganController = require('../controllers/pelangganController');
const authorize = require('../middleware/authorize');

// Get all Pelanggan (Admin only)
router.get('/', authorize.verifyToken, authorize.isAdmin, pelangganController.getAllPelanggan);

// Get Pelanggan by auto-increment ID (User and Admin)
router.get('/:id', authorize.verifyToken, pelangganController.getPelangganByAutoIncrementId);

// Create new Pelanggan (User and Admin)
router.post('/', authorize.verifyToken, authorize.isUser, pelangganController.createPelanggan);

// Update Pelanggan by auto-increment ID (Admin only)
router.put('/:id', authorize.verifyToken, authorize.isAdmin, pelangganController.updatePelanggan);

// Delete Pelanggan by auto-increment ID (Admin only)
router.delete('/:id', authorize.verifyToken, authorize.isAdmin, pelangganController.deletePelanggan);

module.exports = router;
