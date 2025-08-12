// const Cart = require("../models/Cart");
// const Product = require("../models/Product");

// // 📌 GET user's cart
// exports.getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
//     res.json(cart ? cart.items : []);
//   } catch (err) {
//     console.error("Error fetching cart:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 📌 ADD to cart
// exports.addToCart = async (req, res) => {
//   try {
//     const { productId, quantity = 1 } = req.body;
//     if (!productId) return res.status(400).json({ message: "Product ID is required" });

//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     let cart = await Cart.findOne({ userId: req.user.id });

//     if (!cart) {
//       cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
//     } else {
//       const existingItem = cart.items.find(
//         (item) => item.productId.toString() === productId
//       );
//       if (existingItem) {
//         existingItem.quantity += quantity;
//       } else {
//         cart.items.push({ productId, quantity });
//       }
//     }

//     await cart.save();
//     const updatedCart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
//     res.json(updatedCart.items);
//   } catch (err) {
//     console.error("Error adding to cart:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 📌 UPDATE quantity
// exports.updateCartItem = async (req, res) => {
//   try {
//     const { productId, quantity } = req.body;
//     if (!productId || quantity < 1) {
//       return res.status(400).json({ message: "Invalid product ID or quantity" });
//     }

//     const cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find((item) => item.productId.toString() === productId);
//     if (!item) return res.status(404).json({ message: "Item not found in cart" });

//     item.quantity = quantity;
//     await cart.save();

//     const updatedCart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
//     res.json(updatedCart.items);
//   } catch (err) {
//     console.error("Error updating cart:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // 📌 REMOVE from cart
// exports.removeFromCart = async (req, res) => {
//   try {
//     const { productId } = req.params;

//     const cart = await Cart.findOne({ userId: req.user.id });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
//     await cart.save();

//     const updatedCart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
//     res.json(updatedCart.items);
//   } catch (err) {
//     console.error("Error removing from cart:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


const Cart = require("../models/Cart")
const Product = require("../models/Product")

// Compute total price based on populated product prices
const computeTotals = (cartDoc) => {
  const items = (cartDoc?.items || []).map((item) => ({
    // Keep productId as the populated product document when available
    productId: item.productId,
    quantity: item.quantity,
  }))

  const total = (cartDoc?.items || []).reduce((sum, item) => {
    const price = item.productId && item.productId.price !== undefined ? item.productId.price : 0
    return sum + price * item.quantity
  }, 0)

  return { items, total }
}

// GET /api/user/cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id

    let cart = await Cart.findOne({ userId }).populate("items.productId")
    if (!cart) {
      cart = await Cart.create({ userId, items: [] })
    }

    const { items, total } = computeTotals(cart)
    return res.json({ items, total })
  } catch (err) {
    console.error("Get cart error:", err)
    return res.status(500).json({ message: "Server error fetching cart" })
  }
}

// POST /api/user/cart/add
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId, quantity = 1 } = req.body

    if (!productId) return res.status(400).json({ message: "productId is required" })
    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    let cart = await Cart.findOne({ userId })
    if (!cart) cart = new Cart({ userId, items: [] })

    const existingIndex = cart.items.findIndex(
      (it) => it.productId.toString() === productId.toString(),
    )

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += Number(quantity) || 1
    } else {
      cart.items.push({ productId, quantity: Number(quantity) || 1 })
    }

    await cart.save()
    await cart.populate("items.productId")

    const { items, total } = computeTotals(cart)
    return res.json({ message: "Product added to cart", items, total })
  } catch (err) {
    console.error("Add to cart error:", err)
    return res.status(500).json({ message: "Server error adding to cart" })
  }
}

// PUT /api/user/cart/update/:productId
const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.params
    const { quantity } = req.body

    if (quantity == null) return res.status(400).json({ message: "quantity is required" })

    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ message: "Cart not found" })

    const idx = cart.items.findIndex((it) => it.productId.toString() === productId)
    if (idx === -1) return res.status(404).json({ message: "Item not found in cart" })

    if (Number(quantity) <= 0) {
      cart.items.splice(idx, 1)
    } else {
      cart.items[idx].quantity = Number(quantity)
    }

    await cart.save()
    await cart.populate("items.productId")

    const { items, total } = computeTotals(cart)
    return res.json({ message: "Cart updated", items, total })
  } catch (err) {
    console.error("Update cart quantity error:", err)
    return res.status(500).json({ message: "Server error updating cart" })
  }
}

// DELETE /api/user/cart/remove/:productId
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id
    const { productId } = req.params

    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json({ message: "Cart not found" })

    cart.items = cart.items.filter((it) => it.productId.toString() !== productId)
    await cart.save()
    await cart.populate("items.productId")

    const { items, total } = computeTotals(cart)
    return res.json({ message: "Product removed from cart", items, total })
  } catch (err) {
    console.error("Remove from cart error:", err)
    return res.status(500).json({ message: "Server error removing from cart" })
  }
}

// DELETE /api/user/cart/clear
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await Cart.findOne({ userId })

    if (!cart) {
      return res.json({ message: "Cart cleared", items: [], total: 0 })
    }

    cart.items = []
    await cart.save()

    return res.json({ message: "Cart cleared", items: [], total: 0 })
  } catch (err) {
    console.error("Clear cart error:", err)
    return res.status(500).json({ message: "Server error clearing cart" })
  }
}

module.exports = { getCart, addToCart, updateQuantity, removeFromCart, clearCart }
