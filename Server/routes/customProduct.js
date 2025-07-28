const express = require("express")
const { auth } = require("../middleware/auth")
const Product = require("../models/Product")

const router = express.Router()

// Create custom product
router.post("/", auth, async (req, res) => {
  try {
    const { name, description, price, category, images, stock, isCustom, customization } = req.body

    // Validate required fields
    if (!name || !description || !price) {
      return res.status(400).json({
        message: "Name, description, and price are required",
      })
    }

    // Create custom product
    const customProduct = new Product({
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
      // Add user reference for custom products
      createdBy: req.user.id,
    })

    await customProduct.save()

    res.status(201).json({
      message: "Custom product created successfully",
      product: customProduct,
    })
  } catch (error) {
    console.error("Create custom product error:", error)
    res.status(500).json({
      message: "Failed to create custom product",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error",
    })
  }
})

module.exports = router
