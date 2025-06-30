const express = require("express")
const { body, validationResult } = require("express-validator")
const Product = require("../models/Product")
const { auth, adminAuth } = require("../middleware/auth")

const router = express.Router()

// Get all products with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      search,
      minPrice,
      maxPrice,
      sortBy = "createdAt",
      sortOrder = "desc",
      featured,
    } = req.query

    // Build filter object
    const filter = { isActive: true }

    if (category && category !== "all") {
      filter.category = category
    }

    if (search) {
      filter.$text = { $search: search }
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseFloat(minPrice)
      if (maxPrice) filter.price.$lte = Number.parseFloat(maxPrice)
    }

    if (featured === "true") {
      filter.featured = true
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    const products = await Product.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("reviews.user", "name")

    const total = await Product.countDocuments(filter)

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("reviews.user", "name")

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create product (Admin only)
router.post(
  "/",
  adminAuth,
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("category").isIn([
      "roses",
      "tulips",
      "sunflowers",
      "lilies",
      "orchids",
      "carnations",
      "mixed",
      "wedding",
      "birthday",
      "anniversary",
      "sympathy",
    ]),
    body("stock").isInt({ min: 0 }).withMessage("Stock must be a non-negative integer"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const product = new Product(req.body)
      await product.save()

      res.status(201).json({ message: "Product created successfully", product })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Update product (Admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    )

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product updated successfully", product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete product (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Add review
router.post(
  "/:id/reviews",
  auth,
  [
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
    body("comment").trim().isLength({ min: 5 }).withMessage("Comment must be at least 5 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const product = await Product.findById(req.params.id)
      if (!product) {
        return res.status(404).json({ message: "Product not found" })
      }

      // Check if user already reviewed this product
      const existingReview = product.reviews.find((review) => review.user.toString() === req.user._id.toString())

      if (existingReview) {
        return res.status(400).json({ message: "You have already reviewed this product" })
      }

      const review = {
        user: req.user._id,
        rating: req.body.rating,
        comment: req.body.comment,
      }

      product.reviews.push(review)
      product.calculateAverageRating()
      await product.save()

      await product.populate("reviews.user", "name")

      res.status(201).json({ message: "Review added successfully", product })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Get categories
router.get("/categories/list", async (req, res) => {
  try {
    const categories = await Product.distinct("category", { isActive: true })
    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
