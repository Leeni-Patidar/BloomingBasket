import User from "../models/User.js";
import Product from "../models/Product.js";

const formatCartItems = (cart) => {
  return cart.map((item) => ({
    productId: item.product._id,
    product: item.product,
    quantity: item.quantity,
    subtotal: item.quantity * item.product.price
  }));
};

export const getCart = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admin does not have a cart" });
    }

    const user = await User.findById(req.user._id).populate("cart.product");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const items = formatCartItems(user.cart);
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ items, total });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Server error fetching cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user._id).populate("cart.product");

    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingItem = user.cart.find(
      (item) => item.product._id.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    await user.populate("cart.product");

    const items = formatCartItems(user.cart);
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ message: "Product added to cart", items, total });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: "Server error adding to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id).populate("cart.product");

    user.cart = user.cart.filter(
      (item) => item.product._id.toString() !== productId
    );

    await user.save();
    await user.populate("cart.product");

    const items = formatCartItems(user.cart);
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ message: "Product removed from cart", items, total });
  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ message: "Server error removing from cart" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.json({ message: "Cart cleared", items: [], total: 0 });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ message: "Server error clearing cart" });
  }
};
