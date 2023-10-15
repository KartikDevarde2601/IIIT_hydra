const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required:true,
    },
    bloodGroup: {
        type: String,
        required:true,
    },
    diabetes: {
        type: Boolean,
        required:true,
    },
    bloodPressure: {
        type: Boolean,
        required:true,
    },
    address: {
        type: String,
        required:true,
    },
    phoneNumber: {
        type: Number,
        required:true,
    },
    MedicalData:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MedicalData',
        }
    ]
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;
