// src/components/Footer.jsx
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Five Shop</h2>
          <p className="text-gray-400 text-sm">© 2025 Five Shop - All Rights Reserved</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          <a href="#" className="hover:text-white">Shop Now</a>
          <a href="#" className="hover:text-white">Shipping & Returns</a>
          <a href="#" className="hover:text-white">Terms & Conditions</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </nav>

        <div className="flex justify-center gap-5 text-xl">
          <a href="#"><FaFacebook className="hover:text-blue-400" /></a>
          <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
          <a href="#"><FaTwitter className="hover:text-sky-400" /></a>
          <a href="#"><FaTiktok className="hover:text-gray-300" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
