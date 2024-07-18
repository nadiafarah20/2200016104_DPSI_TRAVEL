const express = require('express');
const router = express.Router();
const reservasiController = require('../controllers/reservasiController');
const authorize = require('../middleware/authorize');

// Get all Reservasi (User and Admin)
router.get('/', reservasiController.getAllReservasi);

// Get Reservasi by auto-increment ID (User and Admin)
router.get('/:id', authorize.verifyToken, reservasiController.getReservasiByAutoIncrementId);

// Create new Reservasi (User)
router.post('/', authorize.verifyToken, authorize.isUser, reservasiController.createReservasi);

// Update Reservasi (Admin only)
router.put('/:id', authorize.verifyToken, authorize.isAdmin, reservasiController.updateReservasi);

// Delete Reservasi (Admin only)
router.delete('/:id', authorize.verifyToken, authorize.isAdmin, reservasiController.deleteReservasi);

module.exports = router;
