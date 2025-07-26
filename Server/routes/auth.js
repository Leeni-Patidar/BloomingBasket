const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const { auth } = require("../middleware/auth");
const nodemailer = require("nodemailer");

const router = express.Router();

// ========================
//     USER ROUTES
// ========================

// ✅ Send OTP to email
router.post("/send-otp", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "User already exists." });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.findOneAndUpdate(
    { email },
    { code, createdAt: new Date() },
    { upsert: true }
  );

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Blooming Basket" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Hi ${name},</p><p>Your OTP is <strong>${code}</strong>. It will expire in 5 minutes.</p>`,
    });

    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("OTP Email Error:", err.message);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ✅ Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const record = await Otp.findOne({ email });

  if (!record) {
    return res.status(400).json({ message: "OTP expired or not found." });
  }

  if (record.code !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await Otp.deleteOne({ email }); // Clean up
  return res.status(200).json({ message: "OTP verified" });
});

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;
    const email = typeof rawEmail === "string" ? rawEmail : rawEmail?.email;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Admin login
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: "admin", email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: { id: "admin", name: "Admin", email, role: "admin" },
      });
    }

    // User login
    const user = await User.findOne({ email });
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
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Logout
router.post("/logout", (req, res) => {
  // For token-based auth, frontend just deletes token.
  res.status(200).json({ message: "Logged out (token removed client-side)" });
});

// ✅ Check auth
router.get("/is-auth", auth, (req, res) => {
  res.status(200).json({ message: "Authenticated", user: req.user });
});

module.exports = router;

