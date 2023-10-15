const mongoose = require('mongoose')

const MedicalDataSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
    },
    diabetes: {
        type: Number,
        required: true,
    },
    bloodPressure: {
        type: Number,
        required: true,
    },
    heartRate: {
        type: Number,
        required: true, 
    },

})

module.exports = mongoose.model('MedicalData', MedicalDataSchema)