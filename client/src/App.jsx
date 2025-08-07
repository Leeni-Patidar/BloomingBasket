import { Routes, Route, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { CartProvider } from "./context/CartContext"
import { WishlistProvider } from "./context/WishlistContext"

// Layout & Scroll
import Layout from "./components/Layout"
import ScrollToTop from "./components/ScrollToTop"

// Pages
import About from "./pages/About"
import CancellationRefund from "./pages/CancellationRefund";
import Cart from "./pages/Cart"
import ContactUs from "./pages/ContactUs"
import Customize from "./pages/Customize"
import FAQ from "./pages/FAQ"
import Home from "./pages/Home"
import Login from "./pages/Login"
import MyOrders from "./pages/MyOrders"
import NotFound from "./pages/NotFound"
import OrderDetail from "./pages/OrderDetail"
import Payment from "./pages/Payment";
import Policy from "./pages/Policy"
import ProductDetail from "./pages/ProductDetail"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import ShippingDelivery from "./pages/ShippingDelivery";
import Shop from "./pages/Shop"
import Terms from "./pages/Terms"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"
import OrderConfirmation from "./pages/OrderConfirmation"
import ForgotPassword from "./pages/ForgotPassword"

// Admin Pages
import ProductManagement from "./pages/Admin/ProductManagement"
import OrderManagement from "./pages/Admin/OrderManagement"

import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/about" element={<About />} />
      <Route path="/cancellation-refund" element={<CancellationRefund />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/terms" element={<Terms />} />\
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
      <Route path="/payment" element={<Payment />} />
      <Route path="/order/:id" element={<OrderDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/products" element={<ProductManagement />} />
      <Route path="/admin/orders" element={<OrderManagement />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
