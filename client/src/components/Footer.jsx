import { Link } from "react-router-dom"
// import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#2c3e50] to-[#34495e] text-white py-12 px-0 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 md:w-1/2 px-4 mb-4">
            <div className="mb-4">
              <h5 className="text-2xl font-bold mb-4 text-pink-100">Blooming Basket</h5>
              <p className="text-gray-400 leading-relaxed mb-6">
                Your trusted partner for beautiful flowers and memorable moments. We deliver fresh, stunning
                arrangements right to your doorstep.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-pink-300/20 rounded-full text-pink-300 no-underline transition-all duration-300 ease-in-out hover:bg-pink-100 hover:text-white hover:-translate-y-0.5"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-pink-300/20 rounded-full text-pink-300 no-underline transition-all duration-300 ease-in-out hover:bg-pink-100 hover:text-white hover:-translate-y-0.5"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-pink-300/20 rounded-full text-pink-300 no-underline transition-all duration-300 ease-in-out hover:bg-pink-100 hover:text-white hover:-translate-y-0.5"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center w-10 h-10 bg-pink-300/20 rounded-full text-pink-300 no-underline transition-all duration-300 ease-in-out hover:bg-pink-100 hover:text-white hover:-translate-y-0.5"
                >
                  <i className="fab fa-pinterest"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/6 md:w-1/2 px-4 mb-8">
            <div className="mb-8">
              <h6 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h6>
              <ul className="list-none p-0 m-0">
                <li className="mb-2">
                  <Link
                    to="/"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100"
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/shop"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100"
                  >
                    Shop
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/about"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100"
                  >
                    About
                  </Link>
                </li>
                {/* <li>
                  <Link to="/contact" className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100">Contact</Link>
                </li> */}
                <li className="mb-2">
                  <Link
                    to="/customize"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100"
                  >
                    Customize
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/6 md:w-1/2 px-4 mb-8">
            <div className="mb-8">
              <h6 className="text-lg font-semibold mb-4 text-gray-200">Support</h6>
              <ul className="list-none p-0 m-0">
                    <li className="mb-2">
                  <Link
                    to="/faq"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100"
                  >
                    FAQ
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/contactUs"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100"
                  >
                    Contact Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/policy"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/terms"
                    className="text-gray-400 no-underline transition-colors duration-300 hover:text-pink-100"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/3 md:w-1/2 px-4 mb-5">
            <div className="mb-8">
              <h6 className="text-lg font-semibold mb-4 text-gray-200">Contact Info</h6>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <i className="fas fa-map-marker-alt text-pink-300 w-5"></i>
                  <span>123 Flower Street, Garden City, GC 12345</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <i className="fas fa-phone text-pink-300 w-5"></i>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <i className="fas fa-envelope text-pink-300 w-5"></i>
                  <span>info@bloomingbasket.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4 text-center">
            <p className="text-gray-500 m-0 text-sm">
              ©  Blooming Basket. All rights reserved. Made with ❤️ for flower lovers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
