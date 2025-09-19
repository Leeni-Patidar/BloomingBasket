const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

// Routes
const authRoute = require("./routes/authRoute")
const productRoute = require("./routes/productRoute")
const customProductRoute = require("./routes/customProductRoute")
const orderRoute = require("./routes/orderRoute")
const cartRoute = require("./routes/cartRoute")
const uploadRoute = require("./routes/uploadRoute")
const addressRoute = require("./routes/addressRoute")
const userRoute = require("./routes/userRoute")
const wishlistRoute = require("./routes/wishlistRoute")
const contactRoute = require("./routes/contactRoute")
const paymentRoute = require("./routes/paymentRoute")

// Load env
dotenv.config()

const app = express()

/* -------------------- CORS -------------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://bloomingbasket-client.onrender.com",
]

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Postman, curl, mobile apps (no origin)
      if (!origin) return callback(null, true)

      if (!allowedOrigins.includes(origin)) {
        return callback(
          new Error(`❌ CORS policy blocked request from origin: ${origin}`),
          false
        )
      }
      return callback(null, true)
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

/* -------------------- Middleware -------------------- */
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

/* -------------------- Database -------------------- */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully")
    console.log(
      `🗃️ Using database: \x1b[36m${mongoose.connection.db.databaseName}\x1b[0m`
    )
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message)
    process.exit(1)
  })

/* -------------------- Routes -------------------- */
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/user/cart", cartRoute)
app.use("/api/user/wishlist", wishlistRoute)
app.use("/api/products", productRoute)
app.use("/api/products/custom", customProductRoute)
app.use("/api/orders", orderRoute)
app.use("/api/upload", uploadRoute)
app.use("/api/addresses", addressRoute)
app.use("/api/contact", contactRoute)
app.use("/api/payment", paymentRoute)

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  })
})

/* -------------------- Error Handling -------------------- */
// Centralized error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// 404 fallback
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

/* -------------------- Server -------------------- */
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`🚀 Server running on port \x1b[32m${PORT}\x1b[0m`)
  console.log(
    `🌱 Environment: \x1b[33m${process.env.NODE_ENV || "development"}\x1b[0m`
  )
})
