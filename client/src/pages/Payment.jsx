// ✅ Payment.jsx - Standalone Razorpay Payment Page
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Payment = ({ amount = 500, user }) => {
  const token = localStorage.getItem("token")

  const loadRazorpay = () => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onerror = () => toast.error("Razorpay SDK failed to load")
    script.onload = startPayment
    document.body.appendChild(script)
  }

  const startPayment = async () => {
    try {
      const { data: order } = await axios.post(
        "/api/payment/order",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Blooming Basket",
        description: "Online Payment",
        order_id: order.id,
        handler: function (response) {
          toast.success("Payment successful!")
        },
        prefill: {
          name: user?.name || "Customer",
          email: user?.email || "",
          contact: user?.phone || "",
        },
        theme: {
          color: "#ec4899",
        },
      }

      const razor = new window.Razorpay(options)
      razor.open()
    } catch (err) {
      console.error("Payment error:", err)
      toast.error("Payment initiation failed")
    }
  }

  useEffect(() => {
    loadRazorpay()
  }, [])

  return <div className="text-center py-10 text-xl font-semibold">Loading payment...</div>
}

export default Payment
