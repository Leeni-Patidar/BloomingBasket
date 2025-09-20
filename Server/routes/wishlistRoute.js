const express = require("express");
const { auth } = require("../middleware/auth");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

// All wishlist routes are user-only (admins don’t have wishlists)
router.get("/", auth, getWishlist);
router.post("/add", auth, addToWishlist);
router.delete("/remove/:productId", auth, removeFromWishlist);

module.exports = router;
