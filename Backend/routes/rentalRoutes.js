const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');

// Rental endpoints
router.post('/rentals', rentalController.createRental);
router.get('/rentals', rentalController.getRentals);
router.put('/rentals/:rentalId', rentalController.updateRental);
router.delete('/rentals/:rentalId', rentalController.deleteRental);

module.exports = router;