"use client";

import { logout } from "@/libs/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.ok) {
        router.push("/authentication/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="relative z-10 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">TC</span>
            </div>
            <span className="text-lg font-semibold text-gray-800 tracking-tight">
              Toledo City <span className="text-blue-600">Portal</span>
            </span>
          </Link>

          {/* Right side nav items */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium text-white
                bg-gradient-to-r from-blue-600 to-blue-500 
                hover:from-blue-700 hover:to-blue-600 
                transition-all duration-300 
                shadow-sm hover:shadow-md
                transform hover:-translate-y-0.5
                space-x-2"
            >
              <FiLogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
