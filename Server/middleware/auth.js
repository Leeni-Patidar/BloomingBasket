const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔐 Handle ENV-based Admin (non-database)
    if (decoded.id === "admin") {
      req.user = {
        id: "admin",
        name: "Admin",
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        role: "admin",
      };
      return next();
    }

    // 🔐 Fetch DB User
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      role: user.role || "user",
    };

    next();
  } catch (error) {
    console.error("🔐 Auth Error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// 🔒 Admin-only middleware
const adminAuth = async (req, res, next) => {
  await auth(req, res, () => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  });
};

module.exports = { auth, adminAuth };
