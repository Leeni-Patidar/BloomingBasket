const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { auth: verifyToken } = require("../middleware/auth");
const {
  updateUserProfile,
  changePassword,
} = require("../controllers/userAdminController.js");

// ✅ Update authenticated user's own profile
router.put("/profile", verifyToken, updateUserProfile);

// ✅ Change authenticated user's password
router.put("/change-password", verifyToken, changePassword);

// ✅ Get all users
router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
});

// ✅ Get single user by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err });
  }
});

// ✅ Update user profile by ID (admin use)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err });
  }
});

// ✅ Delete user
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err });
  }
});

module.exports = router;
