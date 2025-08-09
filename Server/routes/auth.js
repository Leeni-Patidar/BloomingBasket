const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Otp = require("../models/Otp");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Utility: send OTP email
const sendOtpEmail = async (email, subject, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Blooming Basket" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: `<p>Your OTP is <strong>${code}</strong>. It expires in 5 minutes.</p>`,
  });
};

// 🔹 Send OTP for Registration
router.post("/send-registration-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const loweredEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: loweredEmail });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.findOneAndUpdate(
      { email: loweredEmail },
      { otp, createdAt: new Date() },
      { upsert: true }
    );

    await sendOtpEmail(loweredEmail, "Registration OTP", otp);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("OTP Send Error:", err.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// 🔹 Send OTP for Forgot Password
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const loweredEmail = email.toLowerCase();
    const user = await User.findOne({ email: loweredEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.findOneAndUpdate(
      { email: loweredEmail },
      { otp, createdAt: new Date() },
      { upsert: true }
    );

    await sendOtpEmail(loweredEmail, "Reset Password OTP", otp);
    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("OTP Send Error:", err.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// 🔹 Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const loweredEmail = email.toLowerCase();
    const otpDoc = await Otp.findOne({ email: loweredEmail }).sort({ createdAt: -1 });
    if (!otpDoc || otpDoc.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await Otp.deleteMany({ email: loweredEmail });
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error("Verify OTP Error:", err.message);
    res.status(500).json({ message: "OTP verification failed" });
  }
});

// 🔹 Reset Password (after OTP verified)
router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const loweredEmail = email.toLowerCase();
    const user = await User.findOne({ email: loweredEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      return res.status(400).json({ message: "New password cannot be same as old password" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.updateOne({ email: loweredEmail }, { $set: { password: hashed } });

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset Password Error:", err.message);
    res.status(500).json({ message: "Failed to reset password" });
  }
});

// 🔹 Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const loweredEmail = email.toLowerCase();
    const userExists = await User.findOne({ email: loweredEmail });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      email: loweredEmail,
      phone,
      password, // ✅ raw password, hashing done in model
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Registration failed" });
  }
});

// 🔹 Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loweredEmail = email.toLowerCase();

    // Admin login from .env
    if (
      loweredEmail === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: "admin", email: loweredEmail, role: "admin" }, // role always included
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: {
          id: "admin",
          name: "Admin",
          email: loweredEmail,
          role: "admin",
        },
      });
    }

    const user = await User.findOne({ email: loweredEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
});

// 🔹 Logout (client-side only)
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out (client token cleared)" });
});

// 🔹 Check Auth
router.get("/is-auth", auth, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});

module.exports = router;
