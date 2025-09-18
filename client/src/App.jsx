import { Routes, Route, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"
import React, { lazy, Suspense } from "react"

// Layout & Scroll
import Layout from "./components/Layout"
import ScrollToTop from "./components/ScrollToTop"
import Loader from "./components/Loader"

// Pages (Lazy Loaded)
const About = lazy(() => import("./pages/About"))
const CancellationRefund = lazy(() => import("./pages/CancellationRefund"))
const Cart = lazy(() => import("./pages/Cart"))
const ContactUs = lazy(() => import("./pages/ContactUs"))
const Customize = lazy(() => import("./pages/Customize"))
const FAQ = lazy(() => import("./pages/FAQ"))
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const MyOrders = lazy(() => import("./pages/MyOrders"))
const NotFound = lazy(() => import("./pages/NotFound"))
const OrderDetail = lazy(() => import("./pages/OrderDetail"))
const Policy = lazy(() => import("./pages/Policy"))
const ProductDetail = lazy(() => import("./pages/ProductDetail"))
const Profile = lazy(() => import("./pages/Profile"))
const Register = lazy(() => import("./pages/Register"))
const ShippingDelivery = lazy(() => import("./pages/ShippingDelivery"))
const Shop = lazy(() => import("./pages/Shop"))
const Terms = lazy(() => import("./pages/Terms"))
const Wishlist = lazy(() => import("./pages/Wishlist"))
const Checkout = lazy(() => import("./pages/Checkout"))
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"))
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"))

// Admin Pages
const ProductManagement = lazy(() => import("./pages/Admin/ProductManagement"))
const OrderManagement = lazy(() => import("./pages/Admin/OrderManagement"))

import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/cancellation-refund" element={<CancellationRefund />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shippingDelivery" element={<ShippingDelivery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

function App() {
  const location = useLocation()
  const noLayoutPaths = ["/login", "/register", "/forgot-password"]
  const hideLayout = noLayoutPaths.includes(location.pathname)

  return (
    <CartProvider>
      <WishlistProvider>
        <ScrollToTop />
        {hideLayout ? <AppRoutes /> : <Layout><AppRoutes /></Layout>}
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
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
