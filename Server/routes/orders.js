const express = require("express")
const Order = require("../models/Order")
const Product = require("../models/Product")
const auth = require("../middleware/auth")

const router = express.Router()

// Create order
router.post("/", auth, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, notes } = req.body

    // Calculate total amount
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const product = await Product.findById(item.productId)
      if (!product || !product.isActive) {
        return res.status(400).json({ message: `Product ${item.productId} not found` })
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` })
      }

      const itemTotal = product.price * item.quantity
      totalAmount += itemTotal

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      })

      // Update product stock
      product.stock -= item.quantity
      await product.save()
    }

    const order = new Order({
      userId: req.userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      notes,
    })

    await order.save()

    res.status(201).json({
      message: "Order created successfully",
      order,
    })
  } catch (error) {
    console.error("Create order error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get user orders
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate("items.productId", "name images price")
      .sort({ createdAt: -1 })

    res.json(orders)
  } catch (error) {
    console.error("Get orders error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single order
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).populate("items.productId", "name images price")

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    console.error("Get order error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update order status (admin only)
router.put("/:id/status", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate(
      "items.productId",
      "name images price",
    )

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    res.json({
      message: "Order status updated successfully",
      order,
    })
  } catch (error) {
    console.error("Update order status error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Cancel order
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      userId: req.userId,
    })

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    if (order.status !== "pending") {
      return res.status(400).json({ message: "Order cannot be cancelled" })
    }

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.productId)
      if (product) {
        product.stock += item.quantity
        await product.save()
      }
    }

    order.status = "cancelled"
    await order.save()

    res.json({
      message: "Order cancelled successfully",
      order,
    })
  } catch (error) {
    console.error("Cancel order error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
