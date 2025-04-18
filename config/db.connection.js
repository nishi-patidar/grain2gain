import mongoose from "mongoose";

// Optional: disable strict mode globally (not recommended in most cases)
mongoose.set("strictQuery", false); // more appropriate setting

// Connect to MongoDB
const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);

    console.log(`✅ Connected to MongoDB: ${connection.host}`);
  } catch (error) {
    console.error(`❌ Database connection failed: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectToDB;
