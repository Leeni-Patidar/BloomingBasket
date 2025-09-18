const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// 🔹 GET: Fetch cart items for logged-in user
// router.get("/", auth, async (req, res) => {
//   try {
//     let cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

//     if (!cart) {
//       cart = await Cart.create({ userId: req.user.id, items: [] });
//     }

//     // Filter out items with deleted products
//     const items = cart.items.filter(item => item.productId);
//     const total = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.productId.price || 0), 0);

//     res.json({ items, total });
//   } catch (err) {
//     console.error("❌ Cart GET error:", err);
//     res.status(500).json({ message: "Failed to fetch cart", error: err.message });
//   }
// });

router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    // Remove invalid items
    cart.items = cart.items.filter(item => mongoose.Types.ObjectId.isValid(item.productId));

    await cart.populate("items.productId");

    const items = cart.items.filter(item => item.productId);
    const total = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.productId.price || 0), 0);

    res.json({ items, total });
  } catch (err) {
    console.error("❌ Cart GET error:", err);
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
});


// 🔹 POST: Add item to cart
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: "Product ID is required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = await Cart.create({ userId: req.user.id, items: [] });

    const idx = cart.items.findIndex(it => it.productId && it.productId.toString() === productId);
    if (idx >= 0) {
      cart.items[idx].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();
    await cart.populate("items.productId");

    const items = cart.items.filter(item => item.productId);
    const total = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.productId.price || 0), 0);

    res.json({ items, total });
  } catch (err) {
    console.error("❌ Cart POST error:", err);
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
});

// 🔹 PUT: Update item quantity
router.put("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    if (!quantity || quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(it => it.productId && it.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = Number(quantity);
    await cart.save();
    await cart.populate("items.productId");

    const items = cart.items.filter(item => item.productId);
    const total = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.productId.price || 0), 0);

    res.json({ items, total });
  } catch (err) {
    console.error("❌ Cart PUT error:", err);
    res.status(500).json({ message: "Failed to update cart", error: err.message });
  }
});

// 🔹 DELETE: Remove single item from cart
router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(it => !(it.productId && it.productId.toString() === productId));
    await cart.save();
    await cart.populate("items.productId");

    const items = cart.items.filter(item => item.productId);
    const total = items.reduce((sum, item) => sum + (item.quantity || 0) * (item.productId.price || 0), 0);

    res.json({ items, total });
  } catch (err) {
    console.error("❌ Cart DELETE error:", err);
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
});

// 🔹 DELETE: Clear entire cart
router.delete("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.json({ items: [], total: 0 });

    cart.items = [];
    await cart.save();

    res.json({ items: [], total: 0 });
  } catch (err) {
    console.error("❌ Cart CLEAR error:", err);
    res.status(500).json({ message: "Failed to clear cart", error: err.message });
  }
});

module.exports = router;
