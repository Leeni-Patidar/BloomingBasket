import User from "../models/User.js";

// ✅ Update User Cart : POST /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId || !cartItems) {
      return res.json({ success: false, message: "Missing userId or cartItems" });
    }

    await User.findByIdAndUpdate(userId, { cartItems });

    return res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log("Update Cart Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Get User Cart : POST /api/cart/get
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    const user = await User.findById(userId).select("cartItems").populate("cartItems.product");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, cartItems: user.cartItems });
  } catch (error) {
    console.log("Get Cart Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Clear Cart : POST /api/cart/clear
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    await User.findByIdAndUpdate(userId, { cartItems: [] });

    return res.json({ success: true, message: "Cart cleared successfully" });
  } catch (error) {
    console.log("Clear Cart Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

// ✅ Remove Specific Item : POST /api/cart/remove-item
export const removeItemFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.json({ success: false, message: "Missing userId or productId" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const updatedCart = user.cartItems.filter(
      (item) => item.product.toString() !== productId
    );

    user.cartItems = updatedCart;
    await user.save();

    return res.json({ success: true, message: "Item removed from cart", cartItems: updatedCart });
  } catch (error) {
    console.log("Remove Item Error:", error.message);
    return res.json({ success: false, message: error.message });
  }
};
