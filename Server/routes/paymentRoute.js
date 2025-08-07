// backend/routes/paymentRoute.js
const express = require("express")
const router = express.Router()
const { createPaymentOrder } = require("../controllers/paymentController")

// POST /api/payment/order
router.post("/order", createPaymentOrder)

module.exports = router
