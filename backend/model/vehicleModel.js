const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['petrol', 'diesel', 'electric']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const vehicleModel = mongoose.model('Vehicle', vehicleSchema);
module.exports = vehicleModel;