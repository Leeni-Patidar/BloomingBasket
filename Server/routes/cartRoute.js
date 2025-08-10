const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

// ✅ Utility to block admin safely
const blockAdmin = (req, res) => {
  if (!req.user || req.user.role?.toLowerCase() === "admin" || req.user.id === "admin") {
    console.warn(`🚫 Cart access blocked for admin: ${req.user?.email || "unknown"}`);
    res.status(403).json({ message: "Admins cannot perform cart operations" });
    return true;
  }
  return false;
};

// ✅ GET /api/user/cart — Fetch user's cart
router.get("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    res.json({ items: cart ? cart.items : [] });
  } catch (err) {
    console.error("❌ Cart GET error:", err);
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
});

// ✅ POST /api/user/cart — Add item
router.post("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  const { productId, quantity } = req.body;
  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "Valid product ID and quantity are required" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      console.warn(`⚠️ Product not found: ${productId}`);
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("items.productId");
    res.json({ items: cart.items });
  } catch (err) {
    console.error("❌ Cart POST error:", err);
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
});

// ✅ PUT /api/user/cart/:productId — Update quantity
router.put("/:productId", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.json({ items: [] });

    const item = cart.items.find((i) => i.productId.toString() === req.params.productId);
    if (!item) return res.json({ items: cart.items });

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.productId");
    res.json({ items: cart.items });
  } catch (err) {
    console.error("❌ Cart PUT error:", err);
    res.status(500).json({ message: "Failed to update quantity", error: err.message });
  }
});

// ✅ DELETE /api/user/cart/:productId — Remove item
router.delete("/:productId", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter((i) => i.productId.toString() !== req.params.productId);
    await cart.save();
    await cart.populate("items.productId");
    res.json({ items: cart.items });
  } catch (err) {
    console.error("❌ Cart DELETE error:", err);
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});

// ✅ DELETE /api/user/cart — Clear cart
router.delete("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ items: [] });
  } catch (err) {
    console.error("❌ Cart CLEAR error:", err);
    res.status(500).json({ message: "Failed to clear cart", error: err.message });
  }
});

module.exports = router;
