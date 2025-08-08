const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

// ✅ Utility: block admin access safely
const blockAdmin = (req, res) => {
  if (!req.user || req.user.role === "admin") {
    res.status(403).json({ message: "Admins cannot perform cart operations" });
    return true;
  }
  return false;
};

// GET /api/user/cart
router.get("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    res.json({ items: cart?.items || [] });
  } catch (err) {
    console.error("Cart GET error:", err);
    res.status(500).json({ message: "Failed to fetch cart." });
  }
});

// POST /api/user/cart
router.post("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity are required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    const populated = await cart.populate("items.productId");
    res.json({ items: populated.items });
  } catch (err) {
    console.error("Cart POST error:", err);
    res.status(500).json({ message: "Failed to add to cart." });
  }
});

module.exports = router;
