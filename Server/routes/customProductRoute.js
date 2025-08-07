const express = require("express")
const { auth } = require("../middleware/auth")
const mongoose = require("mongoose")

const router = express.Router()

// Create custom product (TEMPORARY - not saved in DB)
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, price, category, images, stock, isCustom, customization } = req.body

    // Validate required fields
    if (!name || !description || !price) {
      return res.status(400).json({
        message: "Name, description, and price are required",
      })
    }

    // Generate a temporary ID for the product
    const tempId = new mongoose.Types.ObjectId()

    // Build a custom product object (not saved in DB)
    const customProduct = {
      _id: tempId,
      name,
      description,
      price,
      category: category || "custom",
      images: images || ["/placeholder.svg?height=300&width=300"],
      stock: stock || 1,
      isActive: true,
      featured: false,
      isCustom: isCustom || true,
      customization: customization || {},
      createdBy: req.user.id,
      createdAt: new Date(),
    }

    res.status(201).json({
      message: "Custom product created (not stored in DB)",
      product: customProduct,
    })
  } catch (error) {
    console.error("Custom product creation error:", error)
    res.status(500).json({
      message: "Failed to create custom product",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

module.exports = router
