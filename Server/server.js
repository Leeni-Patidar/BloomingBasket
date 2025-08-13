const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Routes
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const customProductRoute = require("./routes/customProduct");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cartRoute");
const uploadRoute = require("./routes/uploadRoute");
const addressRoute = require("./routes/addressRoute");
const userRoute = require("./routes/user");
const wishlistRoute = require("./routes/wishlistRoute");
const contactRoute = require("./routes/contactRoute");
const paymentRoute = require("./routes/paymentRoute");

// Load env
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://bloomingbasket-client.onrender.com",
];

// CORS setup with dynamic origin checking
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to set extra headers for CORS (optional but recommended)
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error(`CORS policy does not allow origin ${origin}`), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const dbName = mongoose.connection.db.databaseName;
    console.log("✅ MongoDB connected successfully");
    console.log(`🗃️ Using database: \x1b[36m${dbName}\x1b[0m`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/user/cart", cartRoute);
app.use("/api/user/wishlist", wishlistRoute);
app.use("/api/products", productRoute);
app.use("/api/products/custom", customProductRoute);
app.use("/api/orders", orderRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/contact", contactRoute);
app.use("/api/payment", paymentRoute);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// 404 Fallback
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port \x1b[32m${PORT}\x1b[0m`);
  console.log(`🌱 Environment: \x1b[33m${process.env.NODE_ENV || "development"}\x1b[0m`);
});
