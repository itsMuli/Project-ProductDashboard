"use client";

import Link from "next/link";
import ResponsiveSearch from "./ResponsiveSearch";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-popover text-black dark:text-white transition-all duration-300 shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/products" className="text-xl font-bold text-green-700">
          🛒 ProductDash
        </Link>

        <nav className="space-x-4 text-sm font-medium">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
        <ResponsiveSearch />
        <ThemeToggle />
      </div>
    </header>
  );
}
