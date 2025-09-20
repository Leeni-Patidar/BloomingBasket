// controllers/cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

/**
 * Compute cart total safely
 */
const computeTotals = (cartDoc) => {
  if (!cartDoc || !Array.isArray(cartDoc.items)) {
    return { total: 0 };
  }

  const total = cartDoc.items.reduce((sum, item) => {
    const price = item.productId?.price ?? 0;
    return sum + (item.quantity || 0) * price;
  }, 0);

  return { total };
};

/**
 * GET /api/user/cart
 */
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    const { total } = computeTotals(cart);
    return res.json({ items: cart.items, total });
  } catch (err) {
    console.error("❌ Get cart error:", err);
    return res.status(500).json({ message: "Failed to fetch cart." });
  }
};

/**
 * POST /api/user/cart
 */
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    if (!productId || quantity === undefined) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const idx = cart.items.findIndex(
      (it) => it.productId.toString() === productId.toString()
    );

    if (idx >= 0) {
      cart.items[idx].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();
    await cart.populate("items.productId");

    const { total } = computeTotals(cart);
    return res.json({ items: cart.items, total });
  } catch (err) {
    console.error("❌ Add to cart error:", err);
    return res.status(500).json({ message: "Failed to add to cart." });
  }
};

/**
 * PUT /api/user/cart/:productId
 */
const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((it) => it.productId.toString() === productId);
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = Number(quantity);
    await cart.save();
    await cart.populate("items.productId");

    const { total } = computeTotals(cart);
    return res.json({ items: cart.items, total });
  } catch (err) {
    console.error("❌ Update quantity error:", err);
    return res.status(500).json({ message: "Failed to update cart." });
  }
};

/**
 * DELETE /api/user/cart/:productId
 */
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (it) => it.productId.toString() !== productId
    );
    await cart.save();
    await cart.populate("items.productId");

    const { total } = computeTotals(cart);
    return res.json({ items: cart.items, total });
  } catch (err) {
    console.error("❌ Remove from cart error:", err);
    return res.status(500).json({ message: "Failed to remove item." });
  }
};

/**
 * DELETE /api/user/cart
 */
const clearCart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      // Cart not found, but still return success
      return res.json({ message: "Cart cleared", items: [], total: 0 });
    }

    // Clear items
    cart.items = [];
    
    // Optional: reset total if stored
    if (cart.total) cart.total = 0;

    await cart.save();

    return res.json({ message: "Cart cleared", items: [], total: 0 });
  } catch (err) {
    console.error("❌ Clear cart error:", err);
    return res.status(500).json({ message: "Failed to clear cart." });
  }
};


module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
