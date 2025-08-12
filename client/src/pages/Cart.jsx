// "use client";

// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Cart = () => {
//   const {
//     cartItems,
//     updateQuantity,
//     removeFromCart,
//     clearCart,
//     getCartTotal,
//     getCartItemsCount,
//     loading,
//   } = useContext(CartContext);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleQuantityChange = async (productId, newQuantity) => {
//     if (!user) {
//       toast.warn("Please login to update cart");
//       navigate("/login");
//       return;
//     }
//     if (newQuantity < 1) return;
//     await updateQuantity(productId, newQuantity);
//   };

//   const handleRemoveItem = async (item) => {
//     if (!user) {
//       toast.warn("Please login to update cart");
//       navigate("/login");
//       return;
//     }
//     await removeFromCart(item.productId._id);
//     toast.success(`${item.productId?.name} removed from cart`);
//   };

//   const handleClearCart = async () => {
//     if (!user) {
//       toast.warn("Please login to clear cart");
//       navigate("/login");
//       return;
//     }

//     if (user.role === "admin") {
//       toast.warn("Admin is not allowed to clear the cart.");
//       return;
//     }

//     const confirmed = window.confirm("Are you sure you want to clear your entire cart?");
//     if (!confirmed) return;

//     try {
//       await clearCart();
//       toast.success("Cart cleared successfully");
//     } catch (err) {
//       toast.error("Failed to clear cart");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
//       </div>
//     );
//   }

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
//           <h2 className="text-3xl font-bold mb-2">Your cart is empty</h2>
//           <p className="mb-6">Looks like you haven't added anything to your cart yet.</p>
//           <div className="space-x-4">
//             <Link to="/shop" className="inline-flex items-center px-6 py-3 button-bg rounded-full">
//               <i className="fas fa-shopping-bag mr-2"></i>
//               Shop Products
//             </Link>
//             <Link to="/customize" className="inline-flex items-center px-6 py-3 button-bg rounded-full">
//               <i className="fas fa-palette mr-2"></i>
//               Customize Bouquet
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const totalItems = getCartItemsCount();
//   const totalAmount = getCartTotal();

//   return (
//     <div className="min-h-screen py-8">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
//           <p className="text-lg">
//             You have {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left - Product List */}
//           <div className="lg:w-2/3">
//             <div className="bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="hidden md:block bg-white px-6 py-4">
//                 <div className="grid grid-cols-12 gap-4 font-semibold">
//                   <div className="col-span-6">Product</div>
//                   <div className="col-span-2 text-center">Price</div>
//                   <div className="col-span-2 text-center">Quantity</div>
//                   <div className="col-span-2 text-center">Total</div>
//                 </div>
//               </div>

//               <div className="divide-y divide-gray-200">
//                 {cartItems.map((item) => (
//                   <div key={`cart-item-${item.productId?._id || item._id}`} className="p-6">
//                     {/* Mobile Layout */}
//                     <div className="md:hidden">
//                       <div className="flex items-start space-x-4">
//                         <img
//                           src={item.productId?.image || "/placeholder.svg"}
//                           alt={item.productId?.name || "Product"}
//                           className="w-20 h-20 object-cover rounded-lg"
//                         />
//                         <div className="flex-1">
//                           <h3 className="font-semibold mb-1">{item.productId?.name}</h3>
//                           <p className="font-bold text-lg mb-2">₹{item.productId?.price}</p>

//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <button
//                                 onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
//                                 className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
//                                 disabled={item.quantity <= 1 || loading}
//                               >
//                                 <i className="fas fa-minus text-xs"></i>
//                               </button>
//                               <span className="w-12 text-center font-semibold">{item.quantity}</span>
//                               <button
//                                 onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
//                                 className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
//                                 disabled={loading}
//                               >
//                                 <i className="fas fa-plus text-xs"></i>
//                               </button>
//                             </div>

//                             <div className="text-right">
//                               <p className="font-bold text-lg">₹{(item.productId?.price || 0) * item.quantity}</p>
//                               <button
//                                 onClick={() => handleRemoveItem(item)}
//                                 className="text-red-500 hover:text-red-700 transition mt-1"
//                                 disabled={loading}
//                               >
//                                 <i className="fas fa-trash"></i>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Desktop Layout */}
//                     <div className="hidden md:block">
//                       <div className="grid grid-cols-12 gap-4 items-center">
//                         <div className="col-span-6 flex items-center space-x-4">
//                           <img
//                             src={item.productId?.image || "/placeholder.svg"}
//                             alt={item.productId?.name || "Product"}
//                             className="w-16 h-16 object-cover rounded-lg"
//                           />
//                           <div>
//                             <h3 className="font-semibold">{item.productId?.name}</h3>
//                             <button
//                               onClick={() => handleRemoveItem(item)}
//                               className="text-red-500 hover:text-red-700 text-sm mt-1"
//                               disabled={loading}
//                             >
//                               <i className="fas fa-trash mr-1"></i>Remove
//                             </button>
//                           </div>
//                         </div>

//                         <div className="col-span-2 text-center font-semibold">
//                           ₹{item.productId?.price}
//                         </div>

//                         <div className="col-span-2 text-center">
//                           <div className="flex items-center justify-center space-x-2">
//                             <button
//                               onClick={() => handleQuantityChange(item.productId._id, item.quantity - 1)}
//                               className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
//                               disabled={item.quantity <= 1 || loading}
//                             >
//                               <i className="fas fa-minus text-xs"></i>
//                             </button>
//                             <span className="w-12 text-center font-semibold">{item.quantity}</span>
//                             <button
//                               onClick={() => handleQuantityChange(item.productId._id, item.quantity + 1)}
//                               className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
//                               disabled={loading}
//                             >
//                               <i className="fas fa-plus text-xs"></i>
//                             </button>
//                           </div>
//                         </div>

//                         <div className="col-span-2 text-center font-bold text-lg">
//                           ₹{(item.productId?.price || 0) * item.quantity}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Clear Cart Button */}
//             <div className="mt-4">
//               <button
//                 onClick={handleClearCart}
//                 className="px-6 py-2 button-bg rounded-full transition"
//                 disabled={loading}
//               >
//                 <i className="fas fa-trash mr-2"></i>Clear Cart
//               </button>
//             </div>
//           </div>

//           {/* Right - Order Summary */}
//           <div className="lg:w-1/3">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
//               <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between">
//                   <span>Items ({totalItems})</span>
//                   <span className="font-semibold">₹{totalAmount}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span className="font-semibold text-green-600">Free</span>
//                 </div>
//                 <div className="border-t pt-4">
//                   <div className="flex justify-between text-xl font-bold">
//                     <span>Total</span>
//                     <span className="text-pink-600">₹{totalAmount}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <Link
//                   to="/checkout"
//                   className="w-full block text-center py-3 button-bg rounded-full"
//                 >
//                   <i className="fas fa-credit-card mr-2"></i>Proceed to Checkout
//                 </Link>
//                 <Link
//                   to="/shop"
//                   className="w-full block text-center py-3 border border-gray-300 rounded-full font-semibold hover:bg-gray-50"
//                 >
//                   <i className="fas fa-arrow-left mr-2"></i>Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Cart = () => {
//   const { user, token } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

  


//   const API_URL =
//     import.meta.env.VITE_API_URL ||
//     "https://bloomingbasket-server.onrender.com";

//   console.log("Fetching cart with token:", token);
//   console.log("Request URL:", `${API_URL}/api/user/cart`);

//   // Fetch cart
//   const fetchCart = async () => {
//     if (!user) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/user/cart`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(res.data.cartItems || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove from cart
//   const removeFromCart = async (productId) => {
//     if (!window.confirm("Are you sure you want to remove this item?")) return;
//     try {
//       await axios.delete(`${API_URL}/api/user/cart/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       toast.success("Item removed from cart");
//       setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//       toast.error("Failed to remove item");
//     }
//   };

//   // Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     if (quantity < 1) return;
//     try {
//       await axios.put(
//         `${API_URL}/api/user/cart/${productId}`,
//         { quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCartItems((prev) =>
//         prev.map((item) =>
//           item.product._id === productId ? { ...item, quantity } : item
//         )
//       );
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//       toast.error("Failed to update quantity");
//     }
//   };

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0
//   );

//   useEffect(() => {
//     fetchCart();
//   }, [user]);

//   if (!user) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-lg">Please login to view your cart.</p>
//         <Link
//           to="/login"
//           className="text-pink-600 font-semibold hover:underline"
//         >
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   if (loading) {
//     return <div className="p-6 text-center text-lg">Loading cart...</div>;
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-lg mb-4">Your cart is empty.</p>
//         <Link
//           to="/shop"
//           className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
//         >
//           Shop Now
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Cart Items */}
//         <div className="md:col-span-2 space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.product._id}
//               className="flex items-center justify-between bg-white shadow rounded p-4"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={item.product.image}
//                   alt={item.product.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h2 className="font-semibold">{item.product.name}</h2>
//                   <p className="text-gray-600">
//                     ₹{item.product.price.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <input
//                   type="number"
//                   min="1"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     updateQuantity(item.product._id, parseInt(e.target.value))
//                   }
//                   className="border rounded px-2 py-1 w-16 text-center"
//                 />
//                 <button
//                   onClick={() => removeFromCart(item.product._id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Summary */}
//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between font-semibold text-lg">
//             <span>Total</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>
//           <button
//             onClick={() => navigate("/checkout")}
//             className="w-full bg-pink-600 text-white py-2 mt-4 rounded hover:bg-pink-700"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Cart = () => {
//   const { user, token } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API = "https://bloomingbasket-server.onrender.com";
//   // axios.defaults.baseURL = API;
//   // axios.defaults.withCredentials = true;
  
//   // Fetch cart
//   const fetchCart = async () => {
//     if (!user || !token) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/api/user/cart`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(res.data.items || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Remove from cart
//   const removeFromCart = async (productId) => {
//     if (!window.confirm("Are you sure you want to remove this item?")) return;
//     try {
//       const res = await axios.delete(`${API}/api/user/cart/${productId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(res.data.items || []);
//       toast.success("Item removed from cart");
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//       toast.error("Failed to remove item");
//     }
//   };

//   // Update quantity
//   const updateQuantity = async (productId, quantity) => {
//     if (quantity < 1) return;
//     try {
//       const res = await axios.put(
//         `${API}/api/user/cart/${productId}`,
//         { quantity },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setCartItems(res.data.items || []);
//     } catch (err) {
//       console.error("Error updating quantity:", err);
//       toast.error("Failed to update quantity");
//     }
//   };

//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
//     0
//   );

//   useEffect(() => {
//     fetchCart();
//   }, [user, token]);

//   if (!user) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-lg">Please login to view your cart.</p>
//         <Link to="/login" className="text-pink-600 font-semibold hover:underline">
//           Go to Login
//         </Link>
//       </div>
//     );
//   }

//   if (loading) {
//     return <div className="p-6 text-center text-lg">Loading cart...</div>;
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <p className="text-lg mb-4">Your cart is empty.</p>
//         <Link
//           to="/shop"
//           className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
//         >
//           Shop Now
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {/* Cart Items */}
//         <div className="md:col-span-2 space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.productId._id}
//               className="flex items-center justify-between bg-white shadow rounded p-4"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={item.productId.image}
//                   alt={item.productId.name}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <div>
//                   <h2 className="font-semibold">{item.productId.name}</h2>
//                   <p className="text-gray-600">
//                     ₹{item.productId.price.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <input
//                   type="number"
//                   min="1"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     updateQuantity(item.productId._id, parseInt(e.target.value))
//                   }
//                   className="border rounded px-2 py-1 w-16 text-center"
//                 />
//                 <button
//                   onClick={() => removeFromCart(item.productId._id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Summary */}
//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//           <div className="flex justify-between mb-2">
//             <span>Subtotal</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between font-semibold text-lg">
//             <span>Total</span>
//             <span>₹{subtotal.toFixed(2)}</span>
//           </div>
//           <button
//             onClick={() => navigate("/checkout")}
//             className="w-full bg-pink-600 text-white py-2 mt-4 rounded hover:bg-pink-700"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



// src/pages/Cart.jsx
import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, loading, fetchCart, removeFromCart, updateQuantity, getCartTotal } =
    useContext(CartContext);
  const { user, token, loading: authLoading } = useContext(AuthContext);

  // ✅ Fetch cart only when user is logged in and not loading auth
  useEffect(() => {
    if (token && user && !authLoading) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, user, authLoading]);

  if (!token) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-2">Please <Link to="/login" className="text-pink-600">log in</Link> to view your cart.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <Link
          to="/shop"
          className="mt-4 inline-block px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId?._id || item.productId}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.productId?.image || "/placeholder.png"}
                alt={item.productId?.name || "Product"}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.productId?.name}</h2>
                <p className="text-gray-500">
                  ₹{item.productId?.price || 0} x {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  updateQuantity(item.productId?._id || item.productId, item.quantity - 1)
                }
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.productId?._id || item.productId, item.quantity + 1)
                }
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.productId?._id || item.productId)}
                className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <h2 className="text-lg font-semibold">Total: ₹{getCartTotal()}</h2>
        <Link
          to="/checkout"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
