const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");

// 🔹 GET wishlist
router.get("/wishlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist.productId");
    res.json(user.wishlist);
  } catch (err) {
    console.error("Wishlist GET error:", err);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
});

// 🔹 ADD to wishlist
router.post("/wishlist", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: "Product ID required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(req.user._id);
    const alreadyExists = user.wishlist.some((item) =>
      item.productId.equals(productId)
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    user.wishlist.push({ productId });
    await user.save();
    res.json({ productId });
  } catch (err) {
    console.error("Wishlist POST error:", err);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
});

// 🔹 REMOVE from wishlist
router.delete("/wishlist/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);
    user.wishlist = user.wishlist.filter(
      (item) => !item.productId.equals(productId)
    );
    await user.save();
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Wishlist DELETE error:", err);
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
});

module.exports = router;
