const express = require("express")
const router = express.Router()
const User = require("../models/User.js")
const Cart = require("../models/Cart.js")
const Wishlist = require("../models/Wishlist.js")
const { auth: verifyToken } = require("../middleware/auth.js")
const {
  updateUserProfile,
  changePassword,
  isAuth, // ✅ import user profile handler
} = require("../controllers/userAdminController.js")

// ✅ Get full profile (used by /api/user/profile)
router.get("/profile", verifyToken, isAuth)

// ✅ Get user data with cart and wishlist (for frontend contexts)
router.get("/", verifyToken, async (req, res) => {
  try {
    if (req.query.all === "true") {
      const users = await User.find().select("-password");
      return res.status(200).json(users);
    }

    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId")
      .lean(); // lean for performance

    const wishlistItems = await Wishlist.find({ userId: req.user.id })
      .populate("productId")
      .lean();

    const wishlistProducts = wishlistItems
      .map((item) => item.productId)
      .filter(Boolean);

    res.json({
      user: req.user,
      items: Array.isArray(cart?.items) ? cart.items : [],
      wishlist: wishlistProducts,
    });
  } catch (err) {
    console.error("User GET error:", err);
    res.status(500).json({ message: "Failed to fetch user data.", error: err });
  }
});


// ✅ Update authenticated user's own profile
router.put("/profile", verifyToken, updateUserProfile)

// ✅ Change authenticated user's password
router.put("/change-password", verifyToken, changePassword)

// ✅ Get single user by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err })
  }
})

// ✅ Update user profile by ID (admin use)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).select(
      "-password"
    )
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err })
  }
})

// ✅ Delete user
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "User deleted" })
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err })
  }
})

module.exports = router
