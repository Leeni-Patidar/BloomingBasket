// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const Cart = require("../models/Cart");
// const Product = require("../models/Product");
// const { auth } = require("../middleware/auth");

// const blockAdmin = (req, res) => {
//   if (!req.user || req.user.role?.toLowerCase() === "admin" || req.user.id === "admin") {
//     console.warn(`🚫 Cart access blocked for admin: ${req.user?.email || "unknown"}`);
//     res.status(403).json({ message: "Admins cannot perform cart operations" });
//     return true;
//   }
//   return false;
// };

// // ✅ Get cart
// router.get("/", auth, async (req, res) => {
//   // Prevent admin from accessing cart route
//   if (req.user?.id === "admin") {
//     return res.json({ items: [] });
//   }

//   if (blockAdmin(req, res)) return;
//   console.log("🧑‍🏫 GET /api/user/cart - req.user:", req.user);
//   try {
//     if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
//       return res.json({ items: [] });
//     }

//     console.log(`📦 Attempting to find cart for userId: ${req.user.id}`);
//     const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
//     res.json({ items: cart ? cart.items : [] });
//   } catch (err) {
//     console.error("❌ Cart GET error:", err);
//     res.status(500).json({ message: "Failed to fetch cart", error: err.message });
//   }
// });

// // ✅ Add to cart
// router.post("/", auth, async (req, res) => {
//   if (blockAdmin(req, res)) return;
//   const { productId, quantity } = req.body;
//   if (!productId || !quantity || quantity < 1) {
//     return res.status(400).json({ message: "Valid product ID and quantity are required" });
//   }
//   try {
//     if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
//     if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     let cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

//     const existingIndex = cart.items.findIndex(item => item.productId.toString() === productId);
//     if (existingIndex > -1) {
//       cart.items[existingIndex].quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }
//     await cart.save();
//     await cart.populate("items.productId");
//     res.json({ items: cart.items });
//   } catch (err) {
//     console.error("❌ Cart POST error:", err);
//     res.status(500).json({ message: "Failed to add to cart", error: err.message });
//   }
// });

// // ✅ Update quantity
// router.put("/:productId", auth, async (req, res) => {
//   if (blockAdmin(req, res)) return;
//   const { quantity } = req.body;
//   if (!quantity || quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });
//   try {
//     if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
//     if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     const cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) return res.json({ items: [] });

//     const item = cart.items.find(i => i.productId.toString() === req.params.productId);
//     if (!item) return res.json({ items: cart.items });

//     item.quantity = quantity;
//     await cart.save();
//     await cart.populate("items.productId");
//     res.json({ items: cart.items });
//   } catch (err) {
//     console.error("❌ Cart PUT error:", err);
//     res.status(500).json({ message: "Failed to update quantity", error: err.message });
//   }
// });

// // ✅ Remove from cart
// router.delete("/:productId", auth, async (req, res) => {
//   if (blockAdmin(req, res)) return;
//   try {
//     if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
//     if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     const cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) return res.json({ items: [] });

//     cart.items = cart.items.filter(i => i.productId.toString() !== req.params.productId);
//     await cart.save();
//     await cart.populate("items.productId");
//     res.json({ items: cart.items });
//   } catch (err) {
//     console.error("❌ Cart DELETE error:", err);
//     res.status(500).json({ message: "Failed to remove item", error: err.message });
//   }
// });

// // ✅ Clear cart
// router.delete("/", auth, async (req, res) => {
//   if (blockAdmin(req, res)) return;
//   try {
//     if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });
//     if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     const cart = await Cart.findOne({ userId: req.user.id });
//     if (cart) {
//       cart.items = [];
//       await cart.save();
//     }
//     res.json({ items: [] });
//   } catch (err) {
//     console.error("❌ Cart CLEAR error:", err);
//     res.status(500).json({ message: "Failed to clear cart", error: err.message });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { auth } = require("../middleware/auth");

// ==========================
// ✅ Get User Cart
// ==========================
router.get("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.json({ items: cart.items });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// ==========================
// ✅ Add to Cart
// ==========================
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    await cart.populate("items.productId");

    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// ==========================
// ✅ Update Quantity
// ==========================
router.put("/:productId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.productId");

    res.json({ items: cart.items });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Error updating cart" });
  }
});

// ==========================
// ✅ Remove Item from Cart
// ==========================
router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== productId
    );

    await cart.save();
    await cart.populate("items.productId");

    res.json({ items: cart.items });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Error removing item from cart" });
  }
});

// ==========================
// ✅ Clear Cart
// ==========================
router.delete("/", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    cart.items = [];
    await cart.save();

    res.json({ items: [] });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart" });
  }
});

module.exports = router;
