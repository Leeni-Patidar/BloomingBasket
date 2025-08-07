// ✅ Updated Checkout.jsx with Razorpay integration
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
        addressLine1: addressObj.street,
        addressLine2: addressObj.landmark || "",
        city: addressObj.city,
        state: addressObj.state,
        pincode: addressObj.zipCode,
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
      await handleOnlinePayment(orderPayload);
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

  const handleOnlinePayment = async (payload) => {
    try {
      setLoading(true);

      const { data: order } = await axios.post("/api/payment/order", { amount: total }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Blooming Basket",
        description: "Online Payment",
        order_id: order.id,
        handler: async function (response) {
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

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        {/* ... (rest of the UI remains unchanged) */}
      </div>
    </div>
  );
};

export default Checkout;