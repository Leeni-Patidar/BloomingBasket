# BloomingBasket

An online bouquet & flower shop built with the MERN stack.
BloomingBasket allows users to browse bouquets, customize bouquets, and place orders online, while admins can manage products, orders, and inventory.

🚀 Live Demo: [BloomingBasket ](https://bloomingbasket-client.onrender.com)

 # Features
👥 User Features

- User Authentication (Register, Login, OTP verification)
- Browse ready-made flower bouquets & single flowers
- Customize your own bouquet (choose flowers, quantity, wrapping styles)
- Add to Cart / Wishlist
- Place & track orders
- Manage profile (personal info, addresses, password change, order history)

🛠 Admin Features

- Secure Admin Login (credentials from .env)
- Product Management (Add / Edit / Delete flowers & bouquet options)
- Order Management (View orders, Update status: Confirmed → Shipped → Delivered)
- Dashboard with quick access to key actions

💳 Payments
- Integrated Razorpay for secure online payments

# Tech Stack

 Frontend
- React + Vite
- Tailwind CSS
- Context API for state management
- Axios for API calls 

 Backend
 - Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer (OTP emails)
- Cloudinary (image uploads)
- Razorpay (payment gateway) 

# Deployment

- Frontend: Render
- Backend: Render 
- Database: MongoDB Atlas

# Installation & Setup

1️⃣ Clone the repository
- git clone   https://github.com/Leeni-Patidar/BloomingBasket.git
- cd BloomingBasket

2️⃣ Install dependencies

Install frontend:
- cd client
- npm install
- npm run dev

 Install backend:
- cd server
- npm install
- node server.js
