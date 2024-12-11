"use client";
import React from "react";
import { MdOutlineHome } from "react-icons/md";
import { FiTv, FiSearch } from "react-icons/fi";
import { IoFolderOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";
import { HiOutlineDuplicate } from "react-icons/hi";
import { usePathname } from "next/navigation";
import Link from "next/link";

const MobileNavigation = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", icon: <MdOutlineHome size={24} />, label: "Home" },
    { href: "/search", icon: <FiSearch size={24} />, label: "Search" },
    { href: "/tv", icon: <FiTv size={24} />, label: "TV" },
    { href: "/movies", icon: <IoFolderOutline size={24} />, label: "Movies" },
    { href: "/sports", icon: <HiOutlineDuplicate size={24} />, label: "Sports" },
    { href: "/categories", icon: <TbCategory size={24} />, label: "Categories" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-80 text-gray-400 flex justify-around items-center py-2 z-50 lg:hidden select-none">
      {menuItems.map(({ href, icon, label }, index) => (
        <Link href={href} key={index} passHref>
          <button
            className={`flex flex-col items-center text-sm hover:text-white transition-all duration-300 ${
              pathname === href ? "text-white" : ""
            }`}
          >
            {icon}
            <span className="text-xs mt-1">{label}</span>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default MobileNavigation;
