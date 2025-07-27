const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Handle ENV-based Admin (non-database)
    if (decoded.id === "admin") {
      req.user = {
        id: "admin",
        name: "Admin",
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        role: "admin",
      };
      return next();
    }

    // ✅ DB user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Token is not valid - user not found" });
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
    console.error("🔐 Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Token is not valid or expired" });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, async () => {
      if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admins only." });
      }
      next();
    });
  } catch (error) {
    console.error("🔐 Admin Auth Error:", error.message);
    return res.status(401).json({ message: "Authorization failed" });
  }
};

module.exports = { auth, adminAuth };
