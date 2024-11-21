const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
    equipment: { type: mongoose.Schema.Types.ObjectId,
         ref: 'Equipment', 
         required: true },
    user: { type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true },
    rating: { type: Number, 
        required: true, 
        min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
