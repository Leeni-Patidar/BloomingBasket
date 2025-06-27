"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import { ToastContainer } from "react-toastify"
import { useState, useEffect } from "react"

// Import components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LoaderAnimation from "./components/LoaderAnimation"
import ErrorBoundary from "./components/ErrorBoundary"

// Import pages
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Simulate initial loading
      const timer = setTimeout(() => {
        setIsLoading(false)
        console.log("App loaded successfully")
      }, 2500) // 2.5 seconds loader

      return () => clearTimeout(timer)
    } catch (err) {
      console.error("Error during app initialization:", err)
      setError(err.message)
      setIsLoading(false)
    }
  }, [])

  if (error) {
    return <NotFound />
  }

  if (isLoading) {
    return <LoaderAnimation />
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <ErrorBoundary>
                <Navbar />
              </ErrorBoundary>
              <main className="main-content">
                <ErrorBoundary>
                  <Routes>
                    {/* Working Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/login" element={<Login />} />

                    {/* All other routes redirect to 404 */}
                    <Route path="/about" element={<NotFound />} />
                    <Route path="/customize" element={<NotFound />} />
                    <Route path="/contact" element={<NotFound />} />
                    <Route path="/product/:id" element={<NotFound />} />
                    <Route path="/cart" element={<NotFound />} />
                    <Route path="/wishlist" element={<NotFound />} />
                    <Route path="/my-orders" element={<NotFound />} />
                    <Route path="/order/:id" element={<NotFound />} />
                    <Route path="/profile" element={<NotFound />} />
                    <Route path="/admin/*" element={<NotFound />} />

                    {/* Catch all route - 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </main>
              <ErrorBoundary>
                <Footer />
              </ErrorBoundary>
              <ToastContainer position="top-right" autoClose={3000} />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
