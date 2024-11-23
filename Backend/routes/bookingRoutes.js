const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.route('/')
    .get(bookingController.getAllBookings)
    .post(bookingController.createBooking);

router.route('/:id')
    .get(bookingController.getBookingById)
    .put(bookingController.updateBooking)
    .delete(bookingController.deleteBooking);

module.exports = router;