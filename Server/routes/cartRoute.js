const express = require("express");
const { auth } = require("../middleware/auth");
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart
} = require("../controllers/cartController");

const router = express.Router();

// ✅ Get cart
router.get("/", auth, getCart);

// ✅ Add to cart
router.post("/add", auth, addToCart);

// ✅ Update quantity
router.put("/update/:productId", auth, updateQuantity);

// ✅ Remove from cart
router.delete("/remove/:productId", auth, removeFromCart);

// ✅ Clear cart
router.delete("/clear", auth, clearCart);

module.exports = router;



