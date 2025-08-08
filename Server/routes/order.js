// routes/order.js
const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders, // ✅ name now matches controller
  updateOrderStatus,
} = require("../controllers/orderController");

const { auth, adminAuth } = require("../middleware/auth");

// 🛒 User routes
router.post("/", auth, createOrder); // Place a new order
router.get("/my-orders", auth, getUserOrders); // Get user's order list
router.get("/:id", auth, getOrderById); // Get order detail
router.put("/:id/cancel", auth, cancelOrder); // Cancel order

// 🛠 Admin routes
router.get("/", auth, adminAuth, getAllOrders); // Admin: Get all orders
router.put("/:id/status", auth, adminAuth, updateOrderStatus); // Admin: Update order status

module.exports = router;
