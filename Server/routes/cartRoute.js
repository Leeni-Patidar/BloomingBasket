const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

// ✅ Utility: block admin access to cart routes
const blockAdmin = (req, res) => {
  if (req.user.role === "admin") {
    return res.status(403).json({ message: "Admins cannot perform cart operations" });
  }
  return null;
};

// GET /api/user/cart
// router.get("/", auth, async (req, res) => {
//   if (blockAdmin(req, res)) return;

//   try {
//     const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
//     res.json({ items: cart?.items || [] });
//   } catch (err) {
//     console.error("Cart GET error:", err);
//     res.status(500).json({ message: "Failed to fetch cart." });
//   }
// });

router.get("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  try {
    console.log("Fetching cart for user:", req.user.id);

    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

    console.log("Cart document:", cart);

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

// PUT /api/user/cart/:productId
router.put("/:productId", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    const populated = await cart.populate("items.productId");
    res.json({ items: populated.items });
  } catch (err) {
    console.error("Cart PUT error:", err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
});

// DELETE /api/user/cart/:productId
router.delete("/:productId", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();
    const populated = await cart.populate("items.productId");
    res.json({ items: populated.items });
  } catch (err) {
    console.error("Cart DELETE error:", err);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});

// DELETE /api/user/cart (Clear entire cart)
router.delete("/", auth, async (req, res) => {
  if (blockAdmin(req, res)) return;

  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared", items: [] });
  } catch (err) {
    console.error("Cart CLEAR error:", err.message);
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

module.exports = router;
