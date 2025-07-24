const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, adminAuth } = require("../middleware/auth.js");
const {
  placeOrderCOD,
  getUserOrders,
  getAllOrders,
  cancelOrder
} = require("../controllers/orderController.js");
const Order = require("../models/Order.js");

const router = express.Router();

// ✅ Admin: Get all orders (with optional filters)
router.get("/", adminAuth, getAllOrders);

// ✅ User: Place COD order
router.post("/cod", auth, placeOrderCOD);

// ✅ User: Get their own orders
router.get("/my-orders", auth, async (req, res) => {
  req.body.userId = req.user._id;
  return getUserOrders(req, res);
});

// ✅ User/Admin: Get single order by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product user");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get Order Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin: Update order status
router.put(
  "/:id/status",
  adminAuth,
  [
    body("status")
      .isIn(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"])
      .withMessage("Invalid status"),
    body("note").optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { status, note, trackingNumber } = req.body;

      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      order.orderStatus = status;
      if (trackingNumber) order.trackingNumber = trackingNumber;

      order.statusHistory.push({
        status,
        note: note || `Order updated to ${status}`,
      });

      await order.save();

      res.json({ message: "Order status updated", order });
    } catch (error) {
      console.error("Update Status Error:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// ✅ User: Cancel order
router.put("/cancel/:id", auth, (req, res) => cancelOrder(req, res));

module.exports = router;
