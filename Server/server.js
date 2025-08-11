const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");

// Load env variables
dotenv.config();

const app = express();

// ==========================
// ✅ CORS Setup — Local + Production
// ==========================
const allowedOrigins = [
  process.env.CLIENT_URL,        // Production frontend (Render)
  "http://localhost:5173"        // Local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`❌ CORS blocked request from: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ==========================
// ✅ Rate Limiting (Global)
// ==========================
// const rateLimiter = rateLimit({
//   windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // default 15 mins
//   max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100, // limit each IP
//   message: {
//     status: 429,
//     message: "Too many requests from this IP, please try again later."
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// app.use(rateLimiter);

// ==========================
// ✅ Middleware
// ==========================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==========================
// ✅ MongoDB Connection
// ==========================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log(`🗃️ Using database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ==========================
// ✅ Bcrypt Config (Global Salt Rounds)
// ==========================
const bcryptSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;
app.set("bcryptSaltRounds", bcryptSaltRounds);

// ==========================
// ✅ Import Routes
// ==========================
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cartRoute = require("./routes/cartRoute");
const wishlistRoute = require("./routes/wishlistRoute");
const productRoute = require("./routes/product");
const customProductRoute = require("./routes/customProductRoute");
const orderRoute = require("./routes/order");
const uploadRoute = require("./routes/uploadRoute");
const addressRoute = require("./routes/addressRoute");
const contactRoute = require("./routes/contactRoute");
const paymentRoute = require("./routes/paymentRoute");

// ==========================
// ✅ Use Routes
// ==========================
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/user/cart", cartRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/user/wishlist", wishlistRoute);
app.use("/api/products", productRoute);
app.use("/api/products/custom", customProductRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/contact", contactRoute);
app.use("/api/payment", paymentRoute);

// ==========================
// ✅ Health Check
// ==========================
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    bcryptSaltRounds: app.get("bcryptSaltRounds"),
  });
});

// ==========================
// ✅ Error Handler
// ==========================
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// ==========================
// ✅ 404 Fallback
// ==========================
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ==========================
// ✅ Start Server
// ==========================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌱 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔐 Bcrypt Salt Rounds: ${bcryptSaltRounds}`);
});
