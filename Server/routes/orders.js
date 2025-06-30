const express = require("express")
const { body, validationResult } = require("express-validator")
const Order = require("../models/Order")
const Product = require("../models/Product")
const { auth, adminAuth } = require("../middleware/auth")

const router = express.Router()

// Create order
router.post(
  "/",
  auth,
  [
    body("items").isArray({ min: 1 }).withMessage("Order must contain at least one item"),
    body("shippingAddress.name").trim().isLength({ min: 2 }).withMessage("Name is required"),
    body("shippingAddress.street").trim().isLength({ min: 5 }).withMessage("Street address is required"),
    body("shippingAddress.city").trim().isLength({ min: 2 }).withMessage("City is required"),
    body("shippingAddress.state").trim().isLength({ min: 2 }).withMessage("State is required"),
    body("shippingAddress.zipCode").trim().isLength({ min: 5 }).withMessage("Zip code is required"),
    body("paymentInfo.method").isIn(["credit_card", "debit_card", "paypal", "cash_on_delivery"]),
    body("deliveryDate").isISO8601().withMessage("Valid delivery date is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { items, shippingAddress, paymentInfo, deliveryDate, specialInstructions } = req.body

      // Validate products and calculate total
      let subtotal = 0
      const orderItems = []

      for (const item of items) {
        const product = await Product.findById(item.product)
        if (!product) {
          return res.status(400).json({ message: `Product ${item.product} not found` })
        }

        if (product.stock < item.quantity) {
          return res.status(400).json({ message: `Insufficient stock for ${product.name}` })
        }

        const itemTotal = product.price * item.quantity
        subtotal += itemTotal

        orderItems.push({
          product: product._id,
          quantity: item.quantity,
          price: product.price,
          customization: item.customization || {},
        })

        // Update product stock
        product.stock -= item.quantity
        await product.save()
      }

      // Calculate pricing
      const tax = subtotal * 0.08 // 8% tax
      const shipping = subtotal > 50 ? 0 : 10 // Free shipping over $50
      const total = subtotal + tax + shipping

      const order = new Order({
        user: req.user._id,
        items: orderItems,
        shippingAddress,
        paymentInfo,
        pricing: {
          subtotal,
          tax,
          shipping,
          total,
        },
        deliveryDate,
        specialInstructions,
        statusHistory: [
          {
            status: "pending",
            note: "Order placed",
          },
        ],
      })

      await order.save()
      await order.populate("items.product user")

      res.status(201).json({ message: "Order created successfully", order })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Get user orders
router.get("/my-orders", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const orders = await Order.find({ user: req.user._id })
      .populate("items.product", "name images price")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Order.countDocuments({ user: req.user._id })

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single order
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product user")

    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    res.json(order)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all orders (Admin only)
router.get("/", adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, startDate, endDate } = req.query

    const filter = {}

    if (status) {
      filter.orderStatus = status
    }

    if (startDate || endDate) {
      filter.createdAt = {}
      if (startDate) filter.createdAt.$gte = new Date(startDate)
      if (endDate) filter.createdAt.$lte = new Date(endDate)
    }

    const orders = await Order.find(filter)
      .populate("user", "name email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Order.countDocuments(filter)

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update order status (Admin only)
router.put(
  "/:id/status",
  adminAuth,
  [
    body("status").isIn(["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"]),
    body("note").optional().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { status, note, trackingNumber } = req.body

      const order = await Order.findById(req.params.id)
      if (!order) {
        return res.status(404).json({ message: "Order not found" })
      }

      order.orderStatus = status
      if (trackingNumber) order.trackingNumber = trackingNumber

      order.statusHistory.push({
        status,
        note: note || `Order status updated to ${status}`,
      })

      await order.save()

      res.json({ message: "Order status updated successfully", order })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Cancel order
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      return res.status(404).json({ message: "Order not found" })
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" })
    }

    // Can only cancel pending or confirmed orders
    if (!["pending", "confirmed"].includes(order.orderStatus)) {
      return res.status(400).json({ message: "Cannot cancel this order" })
    }

    order.orderStatus = "cancelled"
    order.statusHistory.push({
      status: "cancelled",
      note: "Order cancelled by customer",
    })

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product)
      if (product) {
        product.stock += item.quantity
        await product.save()
      }
    }

    await order.save()

    res.json({ message: "Order cancelled successfully", order })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
