// backend/controllers/paymentController.js
const Razorpay = require("razorpay")
require("dotenv").config()

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// @desc Create Razorpay order
// @route POST /api/payment/order
exports.createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body

    const options = {
      amount: amount * 100, // Razorpay accepts paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    }

    const order = await instance.orders.create(options)
    res.status(200).json(order)
  } catch (error) {
    console.error("Razorpay Order Error:", error)
    res.status(500).json({ message: "Payment order creation failed" })
  }
}
