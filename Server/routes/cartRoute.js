const express = require("express");
const { auth } = require("../middleware/auth");
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.delete("/remove/:productId", auth, removeFromCart);
router.delete("/clear", auth, clearCart);

module.exports = router;