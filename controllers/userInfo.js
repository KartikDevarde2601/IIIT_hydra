require('dotenv').config();
const mongoose = require('mongoose'); // Import mongoose
const { connect } = require('../config/database');
const UserInfo = require('../models/userInfo');
const User = require('../models/user');
const checkUserRole = require('../middlewares/authMiddle');

exports.addUserInfo = async (req, res) => {
  try {
    await connect();

    const { name, age ,bloodGroup,diabetes , UserId, address, phoneNumber } = req.body;
    

    const userExists = await User.exists({ _id: UserId });

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User does not exist"
      });
    }
    

    // Create user info
    const userInfo = await UserInfo.create({
      UserId,
      name,
      age,
      bloodGroup,
      diabetes,
      bloodPressure,
      address,
      phoneNumber,
    });

    return res.status(200).json({
      success: true,
      userInfo,
      message: "UserInfo created successfully ✅"
    });
  } catch (error) {
    // Handle errors here, you can log the error for debugging
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding UserInfo"
    });
  }
};


exports.getUserInfoById = async (req, res) => {
  try {
    await connect();
    const userId = req.params.userId;
    const userInfo = await UserInfo.findOne({ UserId: userId }).populate('MedicalData'); 

    if (!userInfo) {
      return res.status(404).json({ message: 'User information not found' });
    }
    
    res.status(200).json(userInfo);
    console.error(error);
    res.status(500).json({ message: 'Server error' });

  } catch (error) {
    
  }
};




exports.getUserInfo = async (req, res) => {
  try {
    await connect();

    const userId = req.body.userId; 

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'Admin') {
      return res.status(401).json({ message: 'User is not an admin' });
    }

 
    try {
      const userInfo = await UserInfo.find().populate('MedicalData');

      if (!userInfo) {
        return res.status(404).json({ message: 'No user information found' });
      }

      res.status(200).json(userInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
