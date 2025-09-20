import Order from "../models/Order.js";
import Product from "../models/Product.js"; // for stock deduction
import Cart from "../models/Cart.js";       // to clear cart after order
import { v4 as uuidv4 } from "uuid";       // for unique order numbers

// 🛒 Create Order
export const createOrder = async (req, res) => {
  try {
    // Admin cannot place orders
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot place orders" });
    }

    const { orderItems, shippingAddress, paymentMethod, total, paymentResult } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // ✅ generate unique orderNumber using UUID
    const orderNumber = uuidv4();

    const order = new Order({
      orderNumber,
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      total,
      paymentResult,
      status: paymentMethod === "cod" ? "pending" : "confirmed",
    });

    const createdOrder = await order.save();

    // Deduct stock for purchased products
    for (const item of orderItems) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    // Clear user's cart
    const cart = await Cart.findOne({ userId: req.user.id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json({ order: createdOrder });
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🛒 Get logged-in user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error("Get User Orders Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🛒 Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Only owner or admin can access
    if (order.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json({ order });
  } catch (err) {
    console.error("Get Order by ID Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🛒 Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to cancel this order" });
    }

    order.status = "cancelled";
    await order.save();

    res.json({ message: "Order cancelled", order });
  } catch (err) {
    console.error("Cancel Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🛠 Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error("Get All Orders Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🛠 Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending","confirmed","processing","shipped","delivered","cancelled","returned"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status value: ${status}` });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Update Order Status Error:", err);
    res.status(500).json({ message: err.message });
  }
};
