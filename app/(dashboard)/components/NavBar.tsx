"use client";

import Link from "next/link";
import React, { useState } from "react";

import { useSession } from "next-auth/react";
import { NavbarMenu } from "./NavbarMenu";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (status === "loading") return null; // Render nothing

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-wrap items-center justify-between h-auto px-4 py-2 bg-white shadow-md mb-0">
      <Link
        href="/"
        className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200"
        prefetch={false}
      >
        <span>BidLink</span>
      </Link>

      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
      >
        <Menu className="w-6 h-6 text-gray-600" />
      </button>

      <nav
        className={`w-full md:w-auto md:flex md:items-center ${
          isMenuOpen ? "block" : "hidden"
        } mt-4 md:mt-0`}
      >
        <div className="flex flex-col md:flex-row md:gap-3 font-medium">
          <Link
            href="/"
            prefetch={false}
            className={`py-2 px-3 rounded-md transition-colors duration-200 ${
              pathname === "/"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            Home
          </Link>

          <Link
            href="/auctions"
            prefetch={false}
            className={`py-2 px-3 rounded-md transition-colors duration-200 ${
              pathname === "/auctions"
                ? "bg-gray-200 text-gray-900"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            My Auctions
          </Link>

          <NavbarMenu />
        </div>
      </nav>
    </header>
  );
};
