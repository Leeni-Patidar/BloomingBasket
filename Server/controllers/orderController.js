// ✅ Enhanced Order Controller (orderController.js)

import Product from "../models/Product.js";
import Order from "../models/Order.js";

// ✅ Place Order (COD) : POST /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    if (!userId || !address || items.length === 0) {
      return res.json({ success: false, message: "Invalid order details" });
    }

    let amount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.json({ success: false, message: `Product ${item.product} not found` });
      }

      if (product.stock < item.quantity) {
        return res.json({ success: false, message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.offerPrice * item.quantity;
      amount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.offerPrice,
        customization: item.customization || {},
      });

      product.stock -= item.quantity;
      await product.save();
    }

    amount += Math.floor(amount * 0.02); // Add 2% tax

    const order = await Order.create({
      userId,
      items: orderItems,
      amount,
      address,
      paymentType: "COD",
      status: "Pending",
      statusHistory: [
        {
          status: "pending",
          note: "Order placed",
        },
      ],
    });

    return res.json({ success: true, message: "Order placed successfully", order });
  } catch (error) {
    console.log("Place Order Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Get User Orders : POST /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    console.log("User Orders Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Get All Orders (Admin View) : GET /api/order/all
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.json({ success: true, orders });
  } catch (error) {
    console.log("Get All Orders Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Cancel Order : PUT /api/order/cancel/:id
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!["pending", "confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    order.orderStatus = "cancelled";
    order.statusHistory.push({
      status: "cancelled",
      note: "Order cancelled by customer",
    });

    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    await order.save();

    return res.json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    console.log("Cancel Order Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};
