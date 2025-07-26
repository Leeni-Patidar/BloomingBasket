const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const { auth } = require("../middleware/auth");
const nodemailer = require("nodemailer");

const router = express.Router();

// ==============================
// 🔹 SEND OTP (for Forgot Password)
// ==============================
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(404).json({ message: "User not found." });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await Otp.findOneAndUpdate(
      { email },
      { otp: code, createdAt: new Date() },
      { upsert: true }
    );

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
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${code}</strong>. It will expire in 5 minutes.</p>`,
    });

    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("OTP Email Error:", err.message);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ==============================
// 🔹 VERIFY OTP
// ==============================
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const existingOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
  if (!existingOtp) {
    return res.status(400).json({ message: "OTP not found" });
  }

  if (existingOtp.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await Otp.deleteMany({ email }); // Optional: clean up OTP
  return res.status(200).json({ message: "OTP verified successfully" });
});

// ==============================
// 🔹 RESET PASSWORD
// ==============================
router.post("/reset-password", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and new password required." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Check if new password is same as old
  const isSame = await bcrypt.compare(password, user.password);
  if (isSame) {
    return res.status(400).json({ message: "New password cannot be the same as the old password." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  return res.status(200).json({ message: "Password updated successfully." });
});

// ==============================
// 🔹 REGISTER
// ==============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// ==============================
// 🔹 LOGIN (User + Admin)
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔐 Admin login
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: "admin", email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: {
          id: "admin",
          name: "Admin",
          email,
          role: "admin",
        },
      });
    }

    // 👤 Normal user login
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// ==============================
// 🔹 LOGOUT
// ==============================
router.post("/logout", (req, res) => {
  return res.status(200).json({ message: "Logged out (token removed client-side)" });
});

// ==============================
// 🔹 AUTH CHECK
// ==============================
router.get("/is-auth", auth, (req, res) => {
  return res.status(200).json({ message: "Authenticated", user: req.user });
});

module.exports = router;
