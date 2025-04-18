import Ngo from "../model/ngo.model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";
export const register = async (req, res) => {
  try {
    const { name, darpanId, password, state, city, email, ngoType } = req.body;

    // Validate required fields
    if (
      !name ||
      !darpanId ||
      !password ||
      !state ||
      !city ||
      !email ||
      !ngoType
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    // Check if NGO already exists
    const ngoExists = await Ngo.findOne({ darpanId });
    if (ngoExists) {
      return res.status(400).json({
        success: false,
        message: "NGO with this Darpan ID already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the NGO
    const ngo = await Ngo.create({
      name,
      darpanId,
      password: hashedPassword,
      state,
      city,
      email,
      ngoType,
    });

    // Generate email verification token
    const verificationToken = crypto.randomBytes(20).toString("hex");
    ngo.verificationToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    ngo.verificationTokenExpiration = Date.now() + 15 * 60 * 1000;

    await ngo.save();

    const verificationLink = `${process.env.BASE_URL}ngo/verify-email/${verificationToken}`;

    // Send verification email
    if (email) {
      await sendEmail(
        email,
        "Verify Your NGO Registration",
        `Click the link to verify your NGO: ${verificationLink}`
      );
    }

    res.status(200).json({
      success: true,
      message:
        "NGO registered successfully. Please verify via email (if provided).",
    });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
console.log(token);

    // Decode the token to compare it with the hash stored in the database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find the NGO by the verification token and ensure the token isn't expired
    const ngo = await Ngo.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiration: { $gt: Date.now() }, // Check if token has expired
    });

    if (!ngo) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Set the NGO as verified
    ngo.isVerified = true;
    ngo.verificationToken = undefined; // Remove verification token
    ngo.verificationTokenExpiration = undefined; // Remove expiration time
    await ngo.save();

    res.status(200).json({
      success: true,
      message: "NGO successfully verified",
    });
  } catch (error) {
    console.error("Error verifying email:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find the NGO by Email
    const ngo = await Ngo.findOne({ email }).select("+password");

    if (!ngo) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Optional: Check if email is verified
    if (!ngo.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
      });
    }

    // Generate JWT token
    const token = generateToken(ngo._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      ngo,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
