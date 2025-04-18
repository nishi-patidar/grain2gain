import Farmer from "../model/farmer.model.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";

export const registerFarmer = async (req, res) => {
  try {
    const { name, password, state, city, phoneNo, email } = req.body;

    const existingEmail = await Farmer.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingPhone = await Farmer.findOne({ phoneNo });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    // ✅ Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create farmer object
    const newFarmer = new Farmer({
      name,
      password: hashedPassword,
      state,
      city,
      phoneNo,
      email,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000, // 10 mins expiry
    });

    // ✅ Save to DB
    await newFarmer.save();

    // ✅ Send OTP via email
    const subject = "Your Farmer OTP Verification Code";
    const message = `Hello ${name}, your OTP is <b>${otp}</b>. It will expire in 10 minutes.`;

    await sendEmail(email, subject, message);

    res.status(201).json({ message: "Farmer registered. OTP sent to email." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
