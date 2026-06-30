const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //  family: 4 option add panni irukkom
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    });

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;