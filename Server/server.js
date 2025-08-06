const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")

const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const customProductRoute = require("./routes/customProduct")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cartRoute")
const uploadRoute = require("./routes/uploadRoute")
const addressRoute = require("./routes/addressRoute")
const userRoute = require("./routes/user")
const wishlistRoute = require("./routes/wishlistRoute")
const contactRoute = require("./routes/contactRoute")

dotenv.config()

const app = express()

// ✅ CORS setup
const allowedOrigins = [
  "https://bloomingbasket-client.onrender.com",
  "http://localhost:5173",
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// ✅ Static File Serving
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const dbName = mongoose.connection.db.databaseName
    console.log("✅ MongoDB connected successfully")
    console.log(`🗃️ Using database: \x1b[36m${dbName}\x1b[0m`)
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err)
    process.exit(1)
  })

// ✅ API Routes
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

// ✅ Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  })
})

// ✅ Error Handling
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// ✅ 404 Fallback
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// ✅ Start Server
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`🚀 Server running on port \x1b[32m${PORT}\x1b[0m`)
  console.log(`🌱 Environment: \x1b[33m${process.env.NODE_ENV}\x1b[0m`)
})
