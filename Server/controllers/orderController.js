const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

// ✅ Create Order
const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      total,
      subtotal,
      deliveryFee,
      tax,
      orderNotes,
      isCustomOrder,
      deliveryPreferences,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items to place order." });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      deliveryFee,
      tax,
      total,
      orderNotes,
      isCustomOrder,
      deliveryPreferences,
      status: "pending",
      statusHistory: [
        { status: "pending", timestamp: new Date(), note: "Order placed" },
      ],
    });

    // ✅ Clear user's cart (but NOT if admin)
    if (req.user.role !== "admin") {
      const cart = await Cart.findOne({ userId: req.user.id });
      if (cart) {
        cart.items = [];
        await cart.save();
      }
    }

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Create order error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

// ✅ Get logged-in user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get user orders error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch user orders" });
  }
};

// ✅ Get order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Get order by ID error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to get order" });
  }
};

// ✅ Cancel order
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (order.status === "delivered") {
      return res
        .status(400)
        .json({ message: "Cannot cancel delivered order" });
    }

    order.status = "cancelled";
    order.statusHistory.push({
      status: "cancelled",
      timestamp: new Date(),
      note: "Cancelled by user",
    });

    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled" });
  } catch (error) {
    console.error("Cancel order error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to cancel order" });
  }
};

// ✅ Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Get all orders error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all orders" });
  }
};

// ✅ Admin: Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "returned",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status value: ${status}`,
      });
    }

    order.status = status;
    order.statusHistory = order.statusHistory || [];
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note: "Status updated by admin",
    });

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};
