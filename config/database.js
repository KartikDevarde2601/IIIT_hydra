const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected Successfully ✅");
  } catch (error) {
    console.error("An error occurred while connecting to the database:", error);
    process.exit(1);
  }
};
