const Rental = require('../models/Rental');
const responseUtils = require('../utils/responseUtils');

// create a new rental
const createRental = async (req, res, next) => {
    try {
        const { supplier, renter, equipment, startDate, endDate, amount } = req.body;
        // input validation
        if (!supplier || !renter || !equipment || !startDate || !endDate || !amount) {
            return responseUtils.handleBadRequest(res, 'Missing required fields');
        }
        const rental = new Rental({
            supplier,
            renter,
            equipment,
            startDate,
            endDate,
            amount,
        });
        const savedRental = await rental.save();
        // success response
        responseUtils.handleSuccess(res, savedRental, 'Rental created successfully');
    } catch (error) {
        next(error);
    }
};

// get all rentals
const getRentals = async (req, res, next) => {
    try {
        const rentals = await Rental.find()
            .populate('supplier', 'username personalDetails.contactInfo')
            .populate('renter', 'username personalDetails.contactInfo')
            .populate('equipment', 'name category'); // Adjust as per Equipment schema

        responseUtils.handleSuccess(res, rentals, 'Rentals fetched successfully');
    } catch (error) {
        next(error);
    }
};

// Update rental
const updateRental = async (req, res, next) => {
    try {
        const { rentalId } = req.params;
        const updates = req.body;

        const rental = await Rental.findByIdAndUpdate(rentalId, updates, { new: true });

        if (!rental) {
            return responseUtils.handleNotFound(res, 'Rental not found');
        }

        responseUtils.handleSuccess(res, rental, 'Rental updated successfully');
    } catch (error) {
        next(error);
    }
};

// Delete rental
const deleteRental = async (req, res, next) => {
    try {
        const { rentalId } = req.params;

        const rental = await Rental.findByIdAndDelete(rentalId);

        if (!rental) {
            return responseUtils.handleNotFound(res, 'Rental not found');
        }

        responseUtils.handleSuccess(res, rental, 'Rental deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRental,
    getRentals,
    updateRental,
    deleteRental,
};
