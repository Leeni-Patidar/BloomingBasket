import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 px-4 md:pt-20 md:px-10 lg:pt-26 lg:px-20 pb-5">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
