import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
  } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    if (!user) {
      toast.warn("Please login to update cart");
      navigate("/login");
      return;
    }
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex items-center min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full md:w-1/2 text-center">
              <i className="fas fa-shopping-cart fa-5x mb-4"></i>
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-4">
                Looks like you haven’t added anything to your cart yet.
              </p>
              <Link
                to="/shop"
                className="inline-block bg-gradient-to-br from-[#ba54a9] to-[#fecfef] px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 button-bg:hover hover:shadow-lg"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">My Cart</h1>
          <p className="text-lg">You have {cartItems.length} items in your cart</p>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-pink-100">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId?._id || item._id} className="text-center border-t">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productId?.image}
                        alt={item.productId?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span>{item.productId?.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">₹{item.productId?.price}</td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.productId._id, parseInt(e.target.value))
                      }
                      className="w-16 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="px-4 py-2">₹{item.productId?.price * item.quantity}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-600 text-xl hover:text-red-700"
                      onClick={() => {
                        if (!user) {
                          toast.warn("Please login to update cart");
                          navigate("/login");
                          return;
                        }
                        removeFromCart(item.productId._id);
                        toast.info(`${item.productId?.name} removed from cart`);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-right mt-8">
          <h2 className="text-2xl font-bold">Total: ₹{getCartTotal()}</h2>
          <Link
            to="/checkout"
            className="mt-4 inline-block bg-gradient-to-br from-[#ba54a9] to-[#fecfef] px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 button-bg:hover hover:shadow-lg"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
