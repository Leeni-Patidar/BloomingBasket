// server/routes/wishlistRoute.js
const express = require("express")
const router = express.Router()
const { auth } = require("../middleware/auth")
const Wishlist = require("../models/Wishlist")
const Product = require("../models/Product")

// 🔹 GET: Fetch wishlist items for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    console.log("✅ Wishlist Route Hit for:", req.user.id)

    const wishlistItems = await Wishlist.find({ userId: req.user.id }).populate("productId")

    const products = wishlistItems.map((item) => item.productId).filter(Boolean) // remove nulls if product is deleted

    res.json(products)
  } catch (err) {
    console.error("❌ Wishlist GET error:", err.message)
    res.status(500).json({ message: "Failed to fetch wishlist", error: err.message })
  }
})

// 🔹 POST: Add item to wishlist
router.post("/", auth, async (req, res) => {
  try {
    const { productId } = req.body
    if (!productId) return res.status(400).json({ message: "Product ID is required" })

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    const exists = await Wishlist.findOne({ userId: req.user.id, productId })
    if (exists) return res.status(400).json({ message: "Already in wishlist" })

    const newItem = new Wishlist({ userId: req.user.id, productId })
    await newItem.save()

    res.json({ productId })
  } catch (err) {
    console.error("❌ Wishlist POST error:", err.message)
    res.status(500).json({ message: "Failed to add to wishlist" })
  }
})

// 🔹 DELETE: Remove item from wishlist
router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params
    await Wishlist.findOneAndDelete({ userId: req.user.id, productId })
    res.json({ message: "Removed from wishlist" })
  } catch (err) {
    console.error("❌ Wishlist DELETE error:", err.message)
    res.status(500).json({ message: "Failed to remove from wishlist" })
  }
})

module.exports = router
