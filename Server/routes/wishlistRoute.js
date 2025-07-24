const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const { auth: verifyToken } = require("../middleware/auth");


// ✅ Get wishlist items for user
router.get("/", verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.id }).populate("productId");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist", error: err });
  }
});

// ✅ Add item to wishlist
router.post("/", verifyToken, async (req, res) => {
  const { productId } = req.body;

  try {
    const exists = await Wishlist.findOne({ userId: req.user.id, productId });
    if (exists) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    const newItem = new Wishlist({ userId: req.user.id, productId });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to wishlist", error: err });
  }
});

// ✅ Remove item from wishlist
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const removed = await Wishlist.findOneAndDelete({
      userId: req.user.id,
      productId: req.params.id,
    });

    if (!removed) return res.status(404).json({ message: "Item not found" });

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from wishlist", error: err });
  }
});

module.exports = router;
