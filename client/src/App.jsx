import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Layout
import Layout from "./components/Layout";

// Public Pages
import About from "./pages/About";
import Cart from "./pages/Cart";
import ContactUs from "./pages/ContactUs";
import Customize from "./pages/Customize";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import NotFound from "./pages/NotFound";
import OrderDetail from "./pages/OrderDetail";
import Policy from "./pages/Policy";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Shop from "./pages/Shop";
import Terms from "./pages/Terms";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import ForgotPassword from "./pages/ForgotPassword";

// Admin Pages
// import AdminLogin from "./pages/Admin/AdminLogin";
import ProductManagement from "./pages/Admin/ProductManagement";
import OrderManagement from "./pages/Admin/OrderManagement";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="App">
          <Routes>
            {/* ✅ Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/shop" element={<Layout><Shop /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contactUs" element={<Layout><ContactUs /></Layout>} />
            <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/policy" element={<Layout><Policy /></Layout>} />
            <Route path="/terms" element={<Layout><Terms /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/customize" element={<Layout><Customize /></Layout>} />
            <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        {/* <Route path="/my-orders" element={<MyOrders />} /> */}

            {/* ✅ Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ✅ User Routes */}
            <Route path="/my-orders" element={<Layout><MyOrders /></Layout>} />
            <Route path="/order/:id" element={<Layout><OrderDetail /></Layout>} /> 
            <Route path="/profile" element={<Layout><Profile /></Layout>} />

            {/* ✅ Admin Routes (open) */}
            {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
            <Route path="/admin/products" element={<Layout><ProductManagement /></Layout>} />
            <Route path="/admin/orders" element={<Layout><OrderManagement /></Layout>} />

            {/* 404 Fallback */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>

          {/* ✅ Toast */}
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
  );
}

export default App;
