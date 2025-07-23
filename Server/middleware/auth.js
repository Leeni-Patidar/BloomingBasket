const jwt = require("jsonwebtoken")
const User = require("../models/User")

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    const token = authHeader.replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Handle special ENV-based admin user
    if (decoded.userId === "admin") {
      req.user = {
        id: "admin",
        name: "Admin",
        email: process.env.SELLER_EMAIL || "admin@example.com",
        role: "admin",
      }
      return next()
    }

    // Regular DB user
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(401).json({ message: "Token is not valid" })
    }

    // Clean and flatten Mongoose user doc
    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }

    next()
  } catch (error) {
    console.error("Auth error:", error.message)
    return res.status(401).json({ message: "Token is not valid" })
  }
}

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, async () => {
      if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." })
      }
      next()
    })
  } catch (error) {
    console.error("Admin auth error:", error.message)
    return res.status(401).json({ message: "Authorization failed" })
  }
}

module.exports = { auth, adminAuth }
