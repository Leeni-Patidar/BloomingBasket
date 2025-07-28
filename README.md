# 💐 Blooming Basket

**Blooming Basket** is a modern MERN stack e-commerce platform for customizable and handcrafted bouquets. Users can browse, customize, and order various types of bouquet gifts including flowers, chocolates, soft toys, origami, and more.

---

# E-commerce Backend

A complete Node.js/Express backend for an e-commerce application with cart and wishlist functionality.

## Features

- 🔐 **Authentication**: JWT-based auth with OTP verification
- 🛒 **Cart Management**: Add, update, remove items from cart
- ❤️ **Wishlist**: Save favorite products
- 📦 **Product Management**: CRUD operations for products
- 🛍️ **Order Management**: Create and track orders
- 📍 **Address Management**: Save multiple shipping addresses
- 📤 **File Upload**: Image upload for products
- 👨‍💼 **Admin Panel**: Admin-only routes for management

## Setup

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure environment**:
   - Update `.env` file with your MongoDB URI and other settings

3. **Start server**:
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/send-otp` - Send OTP for password reset
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password` - Reset password

### User & Cart
- `GET /api/user` - Get user data with cart and wishlist
- `GET /api/user/cart` - Get cart items
- `POST /api/user/cart` - Add item to cart
- `PUT /api/user/cart/:id` - Update cart item quantity
- `DELETE /api/user/cart/:id` - Remove item from cart

### Wishlist
- `GET /api/user/wishlist` - Get wishlist items
- `POST /api/user/wishlist` - Add item to wishlist
- `DELETE /api/user/wishlist/:id` - Remove item from wishlist

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/all` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

## Default Admin Credentials

Configure in your `.env` file:
- **Admin Email**: Set `ADMIN_EMAIL` in environment
- **Admin Password**: Set `ADMIN_PASSWORD` in environment

## Environment Variables

\`\`\`env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5001
JWT_SECRET=your-jwt-secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
