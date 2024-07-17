const express = require('express');
const router = express.Router();
const paketWisataController = require('../controllers/paketWisataController');
const authorize = require('../middleware/authorize');

// Get all PaketWisata
router.get('/', authorize.verifyToken, paketWisataController.getAllPaketWisata);

// Get PaketWisata by auto-increment ID
router.get('/:id', authorize.verifyToken, paketWisataController.getPaketWisataByAutoIncrementId);

// Create new PaketWisata
router.post('/', authorize.verifyToken, authorize.isUser, paketWisataController.createPaketWisata);

// Update PaketWisata
router.put('/:id', authorize.verifyToken, authorize.isAdmin, paketWisataController.updatePaketWisata);

// Delete PaketWisata
router.delete('/:id', authorize.verifyToken, authorize.isAdmin, paketWisataController.deletePaketWisata);

module.exports = router;
