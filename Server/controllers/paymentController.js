const Razorpay = require("razorpay");
require("dotenv").config();
const Payment = require("../models/Payment");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ GET /api/payment/getkey
exports.getRazorpayKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

// ✅ POST /api/payment/order
exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const options = {
      amount: amount * 100, // Razorpay accepts paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    // Store in DB
    await Payment.create({
      userId: req.user.id,
      orderId: order.id,
      amount,
      status: order.status,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ message: "Payment order creation failed" });
  }
};

// ✅ POST /api/payment/verify
exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ message: "Order ID and status required" });
    }

    const payment = await Payment.findOneAndUpdate(
      { orderId },
      { paymentId, status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Payment Verify Error:", error);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
