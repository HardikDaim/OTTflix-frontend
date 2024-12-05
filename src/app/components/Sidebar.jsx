"use client"
import React from "react";
import {
  FaHome,
  FaSearch,
  FaBook,
  FaCog,
  FaStar,
  FaUser,
  FaBell,
} from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="fixed z-20 hidden lg:flex lg:flex-col lg:w-24 bg-black bg-opacity-50 px-0 py-2 justify-between text-gray-400 h-full">
      {/* Top Icon */}
      <Link href="/" className="flex justify-center">
        <img className="w-full h-full" src="/logo-rem.png" alt="OTTflix" />
      </Link>

      {/* Navigation Buttons */}
      <div className="flex flex-col items-center space-y-8">
        <Link className="cursor-pointer" href="/" passHref>
          <button className="hover:text-white">
            <FaHome size={20} />
          </button>
        </Link>
        <button className="hover:cursor-pointer hover:text-white">
          <FaSearch size={20} />
        </button>
        <button className="hover:cursor-pointer hover:text-white">
          <FaBook size={20} />
        </button>
        <button className="hover:cursor-pointer hover:text-white">
          <FaCog size={20} />
        </button>
        <button className="hover:cursor-pointer hover:text-white">
          <FaUser size={20} />
        </button>
        <button className="hover:cursor-pointer hover:text-white">
          <FaBell size={20} />
        </button>
      </div>

      {/* Bottom Icon */}
      <div className="flex justify-center">
        <FaStar className="text-yellow-400" size={20} />
      </div>
    </div>
  );
};

export default Sidebar;
