"use client";
import React from "react";
import { motion } from 'framer-motion';
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="select-none bg-gray-900 bg-opacity-75 text-white p-6 text-center mt-6 text-xs md:text-sm">
      {/* Logo and Platform Name */}
      <Link href="/" className="mb-6">
      <motion.img
      src="/logo-rem.png" // Replace with the path to your platform logo
      alt="OTTflix"
      className="mx-auto h-40"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ scale: 1.2 }} // Scaling the logo up
      transition={{
        duration: 1, // Duration for scaling
        repeat: Infinity, // Infinite loop
        repeatType: "reverse", // Reverse the scaling animation (shrink back)
        ease: "easeInOut", // Smooth transition in and out
      }}
    />
      </Link>

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
        <p>Version: 1.0.1</p>
      </div>
    </footer>
  );
};

export default Footer;
