const app = require("./src/app");
require("dotenv").config();
// const connectDB = require("./src/db/db.connect");

const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});   