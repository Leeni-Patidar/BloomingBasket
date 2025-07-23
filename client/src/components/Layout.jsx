// src/components/Layout.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-26 pb-5 px-5">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
