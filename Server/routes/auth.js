const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User") // Ensure this path is correct

// Register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields." })
    }

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "User already exists." })
    }

    user = new User({
      name,
      email,
      password,
    })

    await user.save()

    // Generate JWT for immediate login after registration
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(201).json({
      message: "Registration successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body
    const email = typeof rawEmail === "string" ? rawEmail : rawEmail?.email
    console.log("LOGIN ATTEMPT:", { email, password })

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." })
    }

    // Check for admin login using .env credentials
    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {
      // Issue JWT for admin
      const token = jwt.sign(
        { id: "admin", email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      )
      return res.status(200).json({
        message: "Admin login successful",
        token,
        user: { id: "admin", name: "Admin", email, role: "admin" },
      })
    }

    // Regular user login
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }
    // Create JWT
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
