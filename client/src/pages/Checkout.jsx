
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart, loading: cartLoading } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderNotes, setOrderNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    landmark: "",
    label: "Home",
    isDefault: false,
  });

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + deliveryFee + tax;

  useEffect(() => {
    if (!user) return navigate("/login");
    fetchAddresses();
    fetchUserProfile();
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("/api/addresses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data);
      const defaultAddr = res.data.find((a) => a.isDefault);
      if (defaultAddr) setSelectedAddress(defaultAddr._id);
    } catch (err) {
      toast.error("Failed to load addresses");
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(res.data.user);
    } catch (err) {
      toast.error("Failed to load user profile");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/addresses", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Address added");
      setShowAddressForm(false);
      setNewAddress({
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
        landmark: "",
        label: "Home",
        isDefault: false,
      });
      fetchAddresses();
    } catch (err) {
      console.error("Add address error:", err);
      toast.error("Failed to add address");
    } finally {
      setLoading(false);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async (payload) => {
    const res = await loadRazorpayScript();

    if (!res) {
      toast.error("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    try {
      const { data: order } = await axios.post(
        "/api/payment/order",
        { amount: total  }, // amount in paise (Razorpay expects smallest currency unit)
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const options = {
        key: "rzp_test_1FrE9xUhkujHMF",
        amount: order.amount,
        currency: order.currency,
        name: "Blooming Basket",
        description: "Online Payment",
        order_id: order.id,
        handler: async function (response) {
          // You can verify payment here with server if you want before placing order
          await placeOrder(payload);
        },
        prefill: {
          name: userProfile?.name || "Customer",
          email: userProfile?.email || "",
          contact: userProfile?.phone || "",
        },
        theme: {
          color: "#ec4899",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Online payment error:", err);
      toast.error("Payment initiation failed");
      setLoading(false);
    }
  };

  const placeOrder = async (payload) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/orders", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (user?.role !== "admin") {
        await clearCart();
      }

      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${res.data.order._id}`);
    } catch (err) {
      console.error("Place order error:", err);
      toast.error(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) return toast.error("Please select a delivery address");
    const addressObj = addresses.find((a) => a._id === selectedAddress);
    if (!addressObj) return toast.error("Selected address not found");

   const orderPayload = {
  items: cartItems.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
    price: item.productId.price,
  })),
  shippingAddress: {
    fullName: userProfile?.name || "Customer",
    phone: userProfile?.phone || "0000000000",
    street: addressObj.street,
    landmark: addressObj.landmark || "",
    city: addressObj.city,
    state: addressObj.state,
    zipCode: addressObj.zipCode,
    country: addressObj.country || "India",
  },
  paymentMethod,
  orderNotes,
  subtotal,
  deliveryFee,
  tax,
  total,
};


    if (paymentMethod === "cod") {
      await placeOrder(orderPayload);
    } else {
      setLoading(true);
      await handleOnlinePayment(orderPayload);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {userProfile && (
          <div className="bg-white p-6 rounded shadow mb-6">
            <h2 className="text-xl font-semibold mb-2">Account Info</h2>
            <p><b>Name:</b> {userProfile.name}</p>
            <p><b>Email:</b> {userProfile.email}</p>
            {userProfile.phone && <p><b>Phone:</b> {userProfile.phone}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side: Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Address Selection */}
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Delivery Address</h2>
                <button className="font-medium" onClick={() => setShowAddressForm(!showAddressForm)}>
                  + Add New
                </button>
              </div>

              {showAddressForm && (
                <form onSubmit={handleAddAddress} className="grid grid-cols-2 gap-4 mb-6">
                  <input required value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} placeholder="Street *" className="input col-span-2" />
                  <input required value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} placeholder="City *" className="input" />
                  <input required value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} placeholder="State *" className="input" />
                  <input required value={newAddress.zipCode} onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })} placeholder="Zip Code *" className="input" />
                  <input value={newAddress.landmark} onChange={(e) => setNewAddress({ ...newAddress, landmark: e.target.value })} placeholder="Landmark (optional)" className="input col-span-2" />
                  <select value={newAddress.label} onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })} className="input button-bg p-2 rounded">
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                  <label className="flex items-center col-span-2 gap-2">
                    <input type="checkbox" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} />
                    <span>Set as default address</span>
                  </label>
                  <div className="col-span-2 flex gap-3 mt-2">
                    <button disabled={loading} type="submit" className="btn button-bg rounded p-2">
                      {loading ? "Adding..." : "Add Address"}
                    </button>
                    <button type="button" onClick={() => setShowAddressForm(false)} className="btn bg-gray-300 text-black rounded p-2">Cancel</button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {addresses.length === 0 ? (
                  <p>No addresses saved.</p>
                ) : (
                  addresses.map((addr) => (
                    <div key={addr._id} className={`p-4 border rounded-lg ${selectedAddress === addr._id ? "border-pink-500 bg-pink-50" : "border-gray-200"}`} onClick={() => setSelectedAddress(addr._id)}>
                      <div className="flex items-start gap-2">
                        <input type="radio" checked={selectedAddress === addr._id} onChange={() => setSelectedAddress(addr._id)} />
                        <div>
                          <p className="font-semibold">{addr.label} {addr.isDefault && <span className="text-green-600 text-xs">(Default)</span>}</p>
                          <p className="text-sm">{addr.street}{addr.landmark && `, ${addr.landmark}`}</p>
                          <p className="text-sm">{addr.city}, {addr.state}, {addr.zipCode}, {addr.country}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              {["cod", "online"].map((mode) => (
                <div key={mode} className={`p-4 border rounded-lg mb-3 cursor-pointer ${paymentMethod === mode ? "border-pink-500 bg-pink-50" : "border-gray-200"}`} onClick={() => setPaymentMethod(mode)}>
                  <label className="flex items-center gap-3">
                    <input type="radio" checked={paymentMethod === mode} onChange={() => setPaymentMethod(mode)} />
                    <span className="font-medium capitalize">{mode === "cod" ? "Cash on Delivery" : "Online Payment"}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="bg-white p-6 rounded shadow sticky top-4 h-fit lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.productId._id} className="flex gap-3 border-b pb-2">
                  <img src={item.productId.images?.[0] || "/placeholder.svg"} alt={item.productId.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <h4 className="text-sm font-medium">{item.productId.name}</h4>
                    <p className="text-xs">Qty: {item.quantity}</p>
                  </div>
                  <span className="ml-auto font-semibold text-sm">₹{(item.productId.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4 space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{deliveryFee ? `₹${deliveryFee}` : "FREE"}</span></div>
              <div className="flex justify-between"><span>Tax (18%)</span><span>₹{tax}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span className="text-pink-600">₹{total.toFixed(2)}</span></div>
            </div>

            <button
              disabled={!selectedAddress || loading || cartLoading}
              onClick={handlePlaceOrder}
              className="w-full mt-6 py-3 button-bg rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Placing Order..." : `Place Order - ₹${total.toFixed(2)}`}
            </button>

            {subtotal < 500 && <p className="text-xs mt-2 text-center">Add ₹{(500 - subtotal).toFixed(2)} more for free delivery</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
