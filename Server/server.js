const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }))

// Serve uploaded files (for local files if needed)
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Connect to MongoDB (Atlas or Compass based on .env)
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" MongoDB connected successfully")
    console.log(` Using database: ${mongoose.connection.db.databaseName}`)
    console.log(` Connected to: ${process.env.MONGODB_URI.includes("127.0.0.1") ? "MongoDB Compass (Local)" : "MongoDB Atlas (Cloud)"}`)
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err)
    process.exit(1)
  })

// Routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/products", require("./routes/products"))
app.use("/api/orders", require("./routes/orders"))
app.use("/api/upload", require("./routes/upload"))
app.use("/api/users", require("./routes/users"))
// app.use("/api/dashboard", require("./routes/dashboard"))

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`)
  console.log(` Environment: ${process.env.NODE_ENV}`)
})
