import mongoose from "mongoose";
const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [2, "Name must be at least 2 characters"],
    maxLength: [500, "Name should be less than 500 characters"],
    trim: true,
  },
  darpanId: {
    type: String,
    required: [true],
    lowercase: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters long"],
    select: false, // Exclude password in queries by default
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,

    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },

  ngoType: {
    type: String,
    enum: ["Animal", "Human"],
  },
  verificationToken: {
    type: String,
    select: false,
  },
  verificationTokenExpiration: {
    type: Date,
    select: false,
  },
});

export default mongoose.model("Ngo", ngoSchema);