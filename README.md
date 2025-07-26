# 💐 Blooming Basket

**Blooming Basket** is a modern MERN stack e-commerce platform for customizable and handcrafted bouquets. Users can browse, customize, and order various types of bouquet gifts including flowers, chocolates, soft toys, origami, and more.

---

## 🚀 Features

### 🛍️ User Features
- 🔐 Secure User Authentication (Register, Login, Forgot Password with OTP)
- 🛒 Shop from 10+ Bouquet Categories
- 💖 Add products to Wishlist or Cart
- 📝 Customize Your Own Bouquet in 4 Steps:
  1. Select Bouquet Type
  2. Choose Size
  3. Add Personal Message, Budget & Instructions
  4. Review & Confirm
- 📅 Schedule Delivery with a Custom Date
- 📷 Upload Image for Special Orders
- 🧾 View Order Summary

### 🧑‍💻 Admin & Backend Features
- 🧩 Modular API for Products, Users, and Orders
- ☁️ Image Upload with Cloudinary
- 🔐 JWT-based Authentication Middleware
- 📧 Email OTP System for Password Reset
- 📦 MongoDB for Database Storage

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Context API (Auth, Cart, Wishlist)
- Axios

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary for Image Hosting
- Nodemailer (for OTP via Email)

---

## 🧪 Setup Instructions

### 🔧 Backend Setup
```bash
cd server
npm install
# Create a .env file with the following:
# MONGO_URI=your_mongodb_uri
# JWT_SECRET=your_jwt_secret
# CLOUDINARY_CLOUD_NAME=your_name
# CLOUDINARY_API_KEY=your_key
# CLOUDINARY_API_SECRET=your_secret
# EMAIL_USER=your_email
# EMAIL_PASS=your_email_password
npm start
