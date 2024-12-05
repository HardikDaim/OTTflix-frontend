"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 bg-opacity-75 text-white p-6 text-center mt-6 text-xs md:text-sm">
      {/* Logo and Platform Name */}
      <div className="mb-6">
        <img
          src="/logo-rem.png" // Replace with the path to your platform logo
          alt="OTTFLIX"
          className="mx-auto h-24 md:h-40"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 mb-4">
        <a href="/about" className="hover:underline mb-2 md:mb-0">
          About Us
        </a>
        <a href="/terms" className="hover:underline mb-2 md:mb-0">
          Terms of Service
        </a>
        <a href="/privacy" className="hover:underline mb-2 md:mb-0">
          Privacy Policy
        </a>
        <a href="/contact" className="hover:underline mb-2 md:mb-0">
          Contact Us
        </a>
      </div>

      {/* Social Media Links */}
      <a href="https://www.linkedin.com/in/hardik-daim-ab0b07251/" target="_blank" className="mb-2">Made with love by <b className="hover:underline"><i>Hardik Daim</i></b></a>

      {/* Contact Information */}
      <div className="mt-4 mb-6">
        <p>Email: <a href="mailto:hardikdaim@gmail.com" className="hover:underline">hardikdaim@gmail.com</a></p>
        <p>Phone: <a href="tel:+919518213371" className="hover:underline">+91 95182-13371</a></p>
      </div>

      {/* Copyright Notice */}
      <div className="mt-4">
        <p>&copy; {new Date().getFullYear()} Your OTTflix. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
