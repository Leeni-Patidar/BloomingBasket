const express = require("express")
const User = require("../models/User")
const Product = require("../models/Product")
const { auth } = require("../middleware/auth")

const router = express.Router()

// Add to wishlist
router.post("/wishlist/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId

    // Check if product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    const user = await User.findById(req.user._id)

    // Check if product is already in wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" })
    }

    user.wishlist.push(productId)
    await user.save()

    res.json({ message: "Product added to wishlist" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Remove from wishlist
router.delete("/wishlist/:productId", auth, async (req, res) => {
  try {
    const productId = req.params.productId

    const user = await User.findById(req.user._id)
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId)
    await user.save()

    res.json({ message: "Product removed from wishlist" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get wishlist
router.get("/wishlist", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wishlist")
    res.json(user.wishlist)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
