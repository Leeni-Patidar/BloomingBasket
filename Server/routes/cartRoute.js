const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

// ✅ Utility: block admin access
const blockAdmin = (req, res) => {
  if (!req.user || req.user.role === "admin") {
    res.status(403).json({ message: "Admins cannot perform cart operations" });
    return true;
  }
  return false;
};

// ✅ GET /api/user/cart — Fetch user's cart
router.get("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    // Always send items array for frontend safety
    res.json({ items: cart?.items || [] });
  } catch (err) {
    console.error("Cart GET error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// ✅ POST /api/user/cart — Add item to cart
router.post("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  const { productId, quantity } = req.body;
  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: "Valid product ID and quantity are required" });
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

    const existingIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

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
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// ✅ PUT /api/user/cart/:productId — Update item quantity
router.put("/:productId", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  const { quantity } = req.body;
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === req.params.productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    const populated = await cart.populate("items.productId");
    res.json({ items: populated.items });
  } catch (err) {
    console.error("Cart PUT error:", err);
    res.status(500).json({ message: "Failed to update cart item" });
  }
});

// ✅ DELETE /api/user/cart/:productId — Remove item from cart
router.delete("/:productId", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );

    await cart.save();
    const populated = await cart.populate("items.productId");
    res.json({ items: populated.items });
  } catch (err) {
    console.error("Cart DELETE error:", err);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});

// ✅ DELETE /api/user/cart — Clear entire cart
router.delete("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  try {
    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { items: [] } },
      { new: true }
    );
    res.json({ items: [] });
  } catch (err) {
    console.error("Cart CLEAR error:", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

module.exports = router;
