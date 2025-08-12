import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const Checkout = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(true);

  const deliveryCharge = 50;
  const taxRate = 0.18;

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/api/user/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Cart fetch error:", err.response?.data || err.message);
      toast.error("Failed to load cart");
    }
  };

  // Fetch Addresses
  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get("/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(data);
      if (data.length > 0) {
        const defaultAddr = data.find((addr) => addr.isDefault) || data[0];
        setSelectedAddress(defaultAddr._id);
      }
    } catch (err) {
      console.error("Address fetch error:", err.response?.data || err.message);
      toast.error("Failed to fetch addresses");
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      Promise.allSettled([fetchCart(), fetchAddresses()]).finally(() =>
        setLoading(false)
      );
    }
  }, [token]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address before placing order");
      return;
    }

    const addressObj = addresses.find((addr) => addr._id === selectedAddress);
    if (!addressObj) {
      toast.error("Invalid address");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.productId._id || item.productId,
      name: item.productId.name,
      image: item.productId.image,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    const subtotal = calculateSubtotal();
    const taxAmount = subtotal * taxRate;
    const total = subtotal + deliveryCharge + taxAmount;

    try {
      await axios.post(
        "/api/orders",
        {
          orderItems,
          shippingAddress: {
            fullName: addressObj.name,
            street: addressObj.street,
            city: addressObj.city,
            state: addressObj.state,
            zipCode: addressObj.zip,
            country: addressObj.country,
            phone: addressObj.phone || "",
            landmark: addressObj.landmark || "",
            label: addressObj.label || "Home",
          },
          total,
          paymentResult: {
            status: paymentMethod === "cod" ? "pending" : "created",
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Order placed successfully");
      setCartItems([]);
      navigate("/orders");
    } catch (err) {
      console.error("Order placement error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading checkout...</div>;
  }

  const subtotal = calculateSubtotal();
  const taxAmount = subtotal * taxRate;
  const total = subtotal + deliveryCharge + taxAmount;

  return (
    <div className="bg-pink-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">

          {/* Delivery Address */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Delivery Address</h2>
              <button
                onClick={() => navigate("/profile/addresses")}
                className="text-sm text-pink-600 hover:underline"
              >
                + Add New
              </button>
            </div>
            {addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`block p-3 border rounded-lg cursor-pointer ${
                      selectedAddress === addr._id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={addr._id}
                      checked={selectedAddress === addr._id}
                      onChange={() => setSelectedAddress(addr._id)}
                      className="mr-3"
                    />
                    <span>
                      <strong>{addr.name}</strong> {addr.street}, {addr.city} -{" "}
                      {addr.zip}, {addr.state}, {addr.country}
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No addresses saved.</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="block border rounded-lg p-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mr-3"
                />
                Cash On Delivery
              </label>
              <label className="block border rounded-lg p-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="mr-3"
                />
                Online Payment
              </label>
            </div>
          </div>

        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax (18%)</span>
            <span>₹{taxAmount.toFixed(2)}</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between font-bold text-pink-600 text-lg">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0}
            className={`mt-4 w-full py-2 rounded ${
              cartItems.length === 0
                ? "bg-pink-200 cursor-not-allowed"
                : "bg-pink-500 hover:bg-pink-600 text-white"
            }`}
          >
            Place Order - ₹{total.toFixed(2)}
          </button>
          {subtotal < 500 && (
            <p className="text-sm text-gray-500 mt-2">
              Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
