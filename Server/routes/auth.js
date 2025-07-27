const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const { auth } = require("../middleware/auth");
const nodemailer = require("nodemailer");

const router = express.Router();

// ==============================
// 🔹 SEND OTP for Registration
// ==============================
router.post("/send-registration-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const loweredEmail = email.toLowerCase();
  const existingUser = await User.findOne({ email: loweredEmail });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await Otp.findOneAndUpdate(
      { email: loweredEmail },
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
      to: loweredEmail,
      subject: "Registration OTP",
      html: `<p>Your OTP is <strong>${code}</strong>. It will expire in 5 minutes.</p>`,
    });

    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error("OTP Email Error:", err.message);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ==============================
// 🔹 SEND OTP (Forgot Password)
// ==============================
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const loweredEmail = email.toLowerCase();
  const existingUser = await User.findOne({ email: loweredEmail });
  if (!existingUser) return res.status(404).json({ message: "User not found." });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await Otp.findOneAndUpdate(
      { email: loweredEmail },
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
      to: loweredEmail,
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
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  const existingOtp = await Otp.findOne({ email: email.toLowerCase() }).sort({ createdAt: -1 });
  if (!existingOtp) return res.status(400).json({ message: "OTP not found" });
  if (existingOtp.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  await Otp.deleteMany({ email: email.toLowerCase() });
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

  const loweredEmail = email.toLowerCase();
  const user = await User.findOne({ email: loweredEmail });
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  console.log("🔑 [FORGOT PASSWORD] Email:", loweredEmail);
  console.log("🔐 [FORGOT PASSWORD] New password entered:", password);

  const isSame = await bcrypt.compare(password, user.password);
  if (isSame) {
    return res.status(400).json({ message: "New password cannot be the same as the old password." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("🔒 [FORGOT PASSWORD] Hashed new password:", hashedPassword);

  // ✅ FIXED: Ensure DB actually updates
  await User.updateOne(
    { email: loweredEmail },
    { $set: { password: hashedPassword } }
  );

  console.log("✅ [FORGOT PASSWORD] Password updated successfully");

  return res.status(200).json({ message: "Password updated successfully." });
});

// ==============================
// 🔹 REGISTER
// ==============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields." });
    }

    const loweredEmail = email.toLowerCase();
    console.log("🔐 [REGISTER] Password entered:", password);

    const existingUser = await User.findOne({ email: loweredEmail });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔒 [REGISTER] Hashed password saved in DB:", hashedPassword);

    const user = await User.create({
      name,
      email: loweredEmail,
      phone,
      password: hashedPassword,
    });

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
// 🔹 LOGIN
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const loweredEmail = email.toLowerCase();

    console.log("📩 [LOGIN] Attempt for:", loweredEmail);
    console.log("🔑 [LOGIN] Password entered:", password);

    if (
      loweredEmail === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { id: "admin", email: loweredEmail, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      console.log("✅ Admin login successful");
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
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("🔒 [LOGIN] Stored hashed password in DB:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ [LOGIN] Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

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
