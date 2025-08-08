const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getRazorpayKey,
  createPaymentOrder,
  verifyPayment,
} = require("../controllers/paymentController");

// ✅ Get Razorpay Key
router.get("/getkey", getRazorpayKey);

// ✅ Create Order
router.post("/order", auth, createPaymentOrder);

// ✅ Verify Payment
router.post("/verify", auth, verifyPayment);

module.exports = router;
