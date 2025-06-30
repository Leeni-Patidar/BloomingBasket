"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"

// Components
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Loader from "./components/Loader/Loader"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"

// Pages
import Home from "./pages/Home/Home"
import Shop from "./pages/Shop/Shop"
import About from "./pages/About/About"
import Customize from "./pages/Customize/Customize"
import ProductDetail from "./pages/ProductDetail/ProductDetail"
import Cart from "./pages/Cart/Cart"
import Wishlist from "./pages/Wishlist/Wishlist"
import MyOrders from "./pages/MyOrders/MyOrders"
import OrderDetail from "./pages/OrderDetail/OrderDetail"
import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"
import Policy from "./pages/Policy/Policy"
import Terms from "./pages/Terms/Terms"
import ContactUs from "./pages/ContactUs/ContactUs"
import FAQ from "./pages/FAQ/FAQ"
import Help from "./pages/Help/Help"
import NotFound from "./pages/NotFound/NotFound"

// Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin"
import ProductManagement from "./pages/Admin/ProductManagement/ProductManagement"
import OrderManagement from "./pages/Admin/OrderManagement/OrderManagement"

import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="App">
              <Navbar />
              <main className="main-content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contactUs" element={<ContactUs />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/policy" element={<Policy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/help" element={<Help />} />

                  {/* Protected Routes */}
                  <Route
                    path="/customize"
                    element={
                      <ProtectedRoute>
                        <Customize />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <ProtectedRoute>
                        <Wishlist />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/my-orders"
                    element={
                      <ProtectedRoute>
                        <MyOrders />
                      </ProtectedRoute>
                    }
                  />
                 <Route
                    path="/order/:id"
                    element={
                      <ProtectedRoute>
                        <OrderDetail />
                      </ProtectedRoute>
                    }
                  /> 
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <ProductManagement />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <OrderManagement />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Route */}
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
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
