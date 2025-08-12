import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    loading,
    fetchCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal
  } = useContext(CartContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  if (!user) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Please login to view your cart</h2>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 button-bg rounded-lg"
        >
          Login
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="p-8 text-center">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-3 button-bg rounded-lg"
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button
          onClick={clearCart}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-6">
        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.images?.[0] || "/placeholder.svg"}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">₹{item.product.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product._id, parseInt(e.target.value))
                }
                className="w-16 border rounded px-2 py-1 text-center"
              />
              <button
                onClick={() => removeFromCart(item.product._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h3 className="text-xl font-bold">Total: ₹{getCartTotal()}</h3>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 px-6 py-3 button-bg rounded-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
