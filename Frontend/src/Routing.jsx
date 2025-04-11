import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home"
import Shop from "./components/Shop"
import BouquetCustomizer from "./components/BouquetCustomizer"
import Cart from "./components/Cart"
import Wishlist from "./components/Wishlist"
import About from "./components/About"
import Contact from "./components/Contact"
import Profile from "./components/Profile"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/customizer" element={<BouquetCustomizer />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
