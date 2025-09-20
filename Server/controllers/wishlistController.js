const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// 📌 Get wishlist
const getWishlist = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins do not have wishlists" });
    }

    // Find all wishlist items for the user and populate product details
    const wishlistItems = await Wishlist.find({ userId: req.user.id }).populate("productId");

    // Map to products array
    const products = wishlistItems.map(item => item.productId);

    res.json({ wishlist: products });
  } catch (err) {
    console.error("❌ Wishlist fetch error:", err.message);
    res.status(500).json({ message: "Server error while fetching wishlist" });
  }
};

// 📌 Add product to wishlist
const addToWishlist = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot add to wishlist" });
    }

    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if already in wishlist
    const exists = await Wishlist.findOne({ userId: req.user.id, productId });
    if (exists) {
      return res.status(400).json({ message: "Already in wishlist" });
    }

    const newItem = await Wishlist.create({ userId: req.user.id, productId });
    
    // Return updated wishlist
    const wishlistItems = await Wishlist.find({ userId: req.user.id }).populate("productId");
    const products = wishlistItems.map(item => item.productId);

    res.json({ message: "Product added to wishlist", wishlist: products });
  } catch (err) {
    console.error("❌ Add to wishlist error:", err.message);
    res.status(500).json({ message: "Server error while adding to wishlist" });
  }
};

// 📌 Remove product from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot remove from wishlist" });
    }

    const { productId } = req.params;

    await Wishlist.findOneAndDelete({ userId: req.user.id, productId });

    // Return updated wishlist
    const wishlistItems = await Wishlist.find({ userId: req.user.id }).populate("productId");
    const products = wishlistItems.map(item => item.productId);

    res.json({ message: "Product removed from wishlist", wishlist: products });
  } catch (err) {
    console.error("❌ Remove wishlist error:", err.message);
    res.status(500).json({ message: "Server error while removing from wishlist" });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
