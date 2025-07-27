const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const User = require("../models/User");
const Product = require("../models/Product");

// 🔹 GET cart items
router.get("/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.productId");
    res.json({ items: user.cart });
  } catch (err) {
    console.error("Cart GET error:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// 🔹 ADD to cart
router.post("/cart", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: "Product ID required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(req.user._id);
    const itemIndex = user.cart.findIndex((item) => item.productId.equals(productId));

    if (itemIndex >= 0) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.json({ items: user.cart });
  } catch (err) {
    console.error("Cart POST error:", err);
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// 🔹 UPDATE quantity
router.put("/cart", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined)
      return res.status(400).json({ message: "Product ID and quantity required" });

    const user = await User.findById(req.user._id);
    const item = user.cart.find((item) => item.productId.equals(productId));
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    await user.save();
    res.json({ items: user.cart });
  } catch (err) {
    console.error("Cart PUT error:", err);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

// 🔹 DELETE from cart
router.delete("/cart/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => !item.productId.equals(productId));
    await user.save();
    res.json({ items: user.cart });
  } catch (err) {
    console.error("Cart DELETE error:", err);
    res.status(500).json({ message: "Failed to remove from cart" });
  }
});

// 🔹 CLEAR cart
router.delete("/cart/clear", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Cart CLEAR error:", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
});

module.exports = router;
