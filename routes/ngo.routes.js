import express from "express";
import { logIn, register, verifyEmail } from "../controller/ngo.controller.js";

const router = express.Router();

// NGO Registration
router.post("/register", register);

// Email Verification
router.get("/verify-email/:token", verifyEmail);

// NGO Login
router.post("/login", logIn);

export default router;
