import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = () => {
  const { state } = useLocation(); // contains orderData
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fallback if no order data
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
      const { data: order } = await axios.post(
        "/api/payment/order",
        { amount: state.total * 100 }, // amount in paisa
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Blooming Basket",
        description: "Order Payment",
        order_id: order.id,
        handler: async function (response) {
          // ✅ Payment successful
          toast.success("Payment successful!");

          try {
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
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            navigate("/order-confirmation");
          } catch (orderErr) {
            console.error("Order failed after payment:", orderErr);
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
