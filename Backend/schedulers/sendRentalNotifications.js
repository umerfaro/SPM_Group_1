const Rental = require('../models/Rental');

const sendRentalReminder = async () => {
    try {
        const endingRentals = await Rental.find({
            endDate: {
              $gte: new Date(),
              $lt: new Date(Date.now() + 24 * 60 * 60 * 1000), 
            },
            status: 'active',
        });
        if (endingRentals.length === 0) {
            console.log('No rentals ending in the next 24 hours.');
            return { message: 'No rentals ending in the next 24 hours.' };
        }

        endingRentals.forEach((rental) => {
            console.log(
              `Rental ID: ${rental.rentalId}, Equipment ID: ${rental.equipment}, ` +
              `Renter: ${rental.renter}, End Date: ${rental.endDate}`
            );
        });
        return {
            message: 'Found rentals ending in the next 24 hours.',
            rentals: endingRentals,
        };
    } catch (error) {
        console.error('Error in sending rental reminders:', error.message);
    }
};

module.exports = sendRentalReminder;