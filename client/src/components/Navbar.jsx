import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { CartContext } from "../context/CartContext.jsx";
import { WishlistContext } from "../context/WishlistContext.jsx";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const { getCartItemsCount, fetchCart } = useContext(CartContext);
  const { wishlistItems: wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  useEffect(() => {
    const registered = localStorage.getItem("isRegistered") === "true";
    setIsUserRegistered(registered);
  }, []);

  // ✅ Fetch cart immediately after login so badge updates
  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-pink-700 font-['Playfair_Display']">
          <img src="logo.jpg" alt="Blooming Basket" className="w-11 h-11 rounded-full shadow" />
          Blooming Basket
        </Link>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
        </button>

        <div className="hidden md:flex items-center space-x-8">
          {user?.role === "admin" ? (
            <>
              <Link to="/" className="hover:text-pink-600 font-medium">Home</Link>
              <Link to="/about" className="hover:text-pink-600 font-medium">About</Link>
              <Link to="/shop" className="hover:text-pink-600 font-medium">Shop</Link>
              <Link to="/admin/orders" className="hover:text-pink-600 font-medium">Order Management</Link>
              <Link to="/admin/products" className="hover:text-pink-600 font-medium">Product Management</Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-pink-600 font-medium">Home</Link>
              <Link to="/about" className="hover:text-pink-600 font-medium">About</Link>
              <Link to="/shop" className="hover:text-pink-600 font-medium">Shop</Link>
              <Link to="/customize" className="hover:text-pink-600 font-medium">Customize</Link>
              <Link to="/wishlist" className="relative hover:text-pink-600 transition">
                <i className="fas fa-heart"></i>
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs px-1 text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative hover:text-pink-600 transition">
                <i className="fas fa-shopping-cart"></i>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-xs px-1 text-white">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            </>
          )}

          {user ? (
            <div className="relative group">
              <button className="hover:text-pink-600 flex items-center gap-1">
                <i className="fas fa-user"></i> {user.name}
              </button>
              <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 shadow-lg rounded-md transform scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-40">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                {user.role !== "admin" && (
                  <Link to="/my-orders" className="block px-4 py-2 hover:bg-gray-100">My Order</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 bg-transparent">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to={isUserRegistered ? "/login" : "/register"} className="hover:text-pink-600 transition">
              <i className="fas fa-sign-in-alt mr-1"></i>{isUserRegistered ? "Login" : "Register"}
            </Link>
          )}
        </div>
      </div>

      <div className="h-1 w-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-400"></div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-gray-100 shadow-md px-4 py-4 space-y-2 transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100 scale-100" : "max-h-0 opacity-0 scale-95 overflow-hidden"
        }`}
      >
        {user?.role === "admin" ? (
          <>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block font-medium">Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block font-medium">About</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block font-medium">Shop</Link>
            <Link to="/admin/orders" onClick={() => setIsMenuOpen(false)} className="block font-medium">Order Management</Link>
            <Link to="/admin/products" onClick={() => setIsMenuOpen(false)} className="block font-medium">Product Management</Link>
          </>
        ) : (
          <>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block font-medium">Home</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block font-medium">About</Link>
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="block font-medium">Shop</Link>
            <Link to="/customize" onClick={() => setIsMenuOpen(false)} className="block font-medium">Customize</Link>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block font-medium">Wishlist</Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block font-medium">Cart</Link>
          </>
        )}

        {/* User section */}
        <div className="flex items-start gap-2 border-t pt-3 mt-3 border-gray-300">
          <i className="fas fa-user"></i>
          {user ? (
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">{user.name}</span>
              {user.role !== "admin" && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-pink-600 hover:underline"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm text-pink-600 hover:underline"
                  >
                    My Order
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="text-left text-pink-600 hover:underline text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={isUserRegistered ? "/login" : "/register"}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm text-pink-600 hover:underline"
            >
              {isUserRegistered ? "Login" : "Register"}
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
