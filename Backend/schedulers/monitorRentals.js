const Rental = require('../models/Rental');

const monitorRentals = async () => {
    try {
      const overdueRentals = await Rental.find({
        endDate: { $lt: new Date() },
        status: 'active', 
      });
  
      for (const rental of overdueRentals) {
        rental.status = 'completed';
        await rental.save();
  
        console.log(`Marked rental ${rental._id} as completed.`);
      }
    } catch (error) {
      console.error('Error in monitoring rentals:', error.message);
    }
  };
  
  module.exports = monitorRentals;