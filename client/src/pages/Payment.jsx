import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const { state } = useLocation(); // contains orderData
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect if missing order details
  useEffect(() => {
    if (!state) {
      toast.error("Missing payment details. Redirecting...");
      navigate("/checkout");
    }
  }, [state, navigate]);

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => toast.error("Failed to load Razorpay SDK");
    script.onload = startPayment;
    document.body.appendChild(script);
  };

  const startPayment = async () => {
    try {
      // 1️⃣ Get Razorpay key from backend
      const { data: keyData } = await axios.get("/api/payment/getkey");

      // 2️⃣ Create Razorpay order in backend
      const { data: order } = await axios.post(
        "/api/payment/order",
        { amount: state.total }, // ✅ send amount in rupees, backend will convert to paise
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 3️⃣ Razorpay options
      const options = {
        key: keyData.key, // ✅ secure key from backend
        amount: order.amount,
        currency: order.currency,
        name: "Blooming Basket",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          toast.success("Payment successful!");

          // 4️⃣ Save payment in DB
          try {
            await axios.post(
              "/api/payment/verify",
              {
                orderId: order.id,
                paymentId: response.razorpay_payment_id,
                status: "paid",
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            // 5️⃣ Place order after payment
            await axios.post(
              "/api/order",
              {
                ...state,
                paymentResult: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            navigate("/order-confirmation");
          } catch (err) {
            console.error("Order save error:", err);
            toast.error("Payment done but order failed. Please contact support.");
          }
        },
        prefill: {
          name: state?.user?.name || "Customer",
          email: state?.user?.email || "",
          contact: state?.user?.phone || "",
        },
        theme: {
          color: "#ec4899",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment setup failed:", err);
      toast.error("Could not initiate payment.");
    }
  };

  useEffect(() => {
    if (state) loadRazorpay();
  }, [state]);

  return (
    <div className="text-center py-10 text-xl font-semibold">
      Loading payment...
    </div>
  );
};

export default Payment;
