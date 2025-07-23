"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
// import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"

// Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// Pages
import About from "./pages/About"
import Cart from "./pages/Cart"
import ContactUs from "./pages/ContactUs"
import Customize from "./pages/Customize"
import FAQ from "./pages/FAQ"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MyOrders from "./pages/MyOrders"
import NotFound from "./pages/NotFound"
import OrderDetail from "./pages/OrderDetail"
import Policy from "./pages/Policy"
import ProductDetail from "./pages/ProductDetail"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Shop from "./pages/Shop"
import Terms from "./pages/Terms"
import Wishlist from "./pages/Wishlist"


// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin"
import ProductManagement from "./pages/Admin/ProductManagement"
import OrderManagement from "./pages/Admin/OrderManagement"

// Styles

import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/product/id" element={<ProductDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/register" element={<Register />} />

              {/* User Authenticated Routes */}
              <Route path="/customize" element={<Customize />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/order/id" element={<OrderDetail />} />
              <Route path="/profile" element={<Profile />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
