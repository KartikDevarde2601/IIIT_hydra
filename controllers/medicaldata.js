require('dotenv').config();
const mongoose = require('mongoose');
const { connect } = require('../config/database');
const UserInfo = require('../models/userInfo');
const MedicalData = require('../models/MedicalData');

exports.addMedicalData = async (req, res) => {
    try {
        await connect();
       
        const { deviceId, diabetes, bloodPressure, heartRate } = req.body;

        // Create a new MedicalData document
        const medicalData = new MedicalData({
            deviceId,
            diabetes, 
            bloodPressure,
            heartRate,
        });
  
        const savedMedicalData = await medicalData.save(); 

        const medicalDataId = savedMedicalData._id;

        const UserId = req.body.userId;
         console.log(UserId);
        
    const userExists = await UserInfo.exists({ _id: UserId });
    console.log(userExists);

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      });
    }

        // Push the ID of the medical data to the user's MedicalData array
        await UserInfo.findByIdAndUpdate(UserId, {
            $push: { MedicalData:{ medicalDataId} },
        });

        return res.status(200).json({
            success: true,
            message: "MedicalData created and associated with UserInfo successfully ✅",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message,
        });
    }
}
