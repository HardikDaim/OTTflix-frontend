"use client";
import React from "react";
import { motion } from "framer-motion";
import { MdOutlineHome } from "react-icons/md";
import { FiTv, FiSearch } from "react-icons/fi";
import { IoFolderOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { HiOutlineDuplicate } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", icon: <MdOutlineHome size={24} />, tooltip: "Home" },
    { href: "/search", icon: <FiSearch size={20} />, tooltip: "Search" },
    { href: "/tv", icon: <FiTv size={19} />, tooltip: "TV" },
    { href: "/movies", icon: <IoFolderOutline size={19} />, tooltip: "Movies" },
    {
      href: "/sports",
      icon: <HiOutlineDuplicate size={20} />,
      tooltip: "Sports",
    },
    {
      href: "/categories",
      icon: <TbCategory size={20} />,
      tooltip: "Categories",
    },
  ];

  return (
    <>
    <div className="fixed z-20 hidden lg:flex lg:flex-col lg:w-24 bg-black bg-opacity-50 px-0 py-2 select-none justify-between text-gray-400 h-full">
      {/* Top Icon */}
      <Link href="/" className="flex justify-center">
        <motion.img
          className="w-full h-full"
          src="/logo-rem.png"
          alt="OTTflix"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ scale: 1.2 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </Link>

      {/* Navigation Buttons */}
      <div className="flex flex-col items-center space-y-14">
        {menuItems.map(({ href, icon, tooltip }, index) => (
          <Link href={href} key={index} passHref>
            <button
              data-tooltip-id={`tooltip-${index}`}
              data-tooltip-content={tooltip}
              data-tooltip-place="top"
              className={`hover:text-white ${
                pathname === href ? "text-white" : ""
              }`}
            >
              {icon}
              <Tooltip id={`tooltip-${index}`} effect="solid" />
            </button>
          </Link>
        ))}
      </div>

      {/* Bottom Icon */}
      <div className="flex justify-center">
        <FaStar className="text-yellow-400 hidden" size={20} />
      </div>
    </div>
    </>
  );
};

export default Sidebar;
