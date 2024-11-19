const express = require('express');
const equipmentRoutes = require('./equipmentRoutes');
const bookingRoutes = require('./bookingRoutes');
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');

const router = express.Router();

router.use('/equipment', equipmentRoutes);
router.use('/bookings', bookingRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
