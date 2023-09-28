require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to DB");
};

module.exports = {
  connectDB,
};
