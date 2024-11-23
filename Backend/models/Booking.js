const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookingSchema = new Schema({
    equipment: { type: Schema.Types.ObjectId,
         ref: 'Equipment', 
         required: true, 
         index: true },
    renter: { type: Schema.Types.ObjectId, 
        ref: 'User',
         required: true, 
         index: true },
    owner: { type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
         index: true },
    rentalPeriod: {
        startDate: { type: Date, 
            required: true },
        endDate: { type: Date, 
            required: true },
    },
    pickupTime: { type: Date, 
        required: true }, // New field for scheduling pickup
    totalPrice: { type: Number,
         required: true,
          min: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
