"use client";

import { logout } from "@/libs/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiLogOut,
  FiUser,
  FiChevronDown,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/hooks/userHooks";

export default function Navbar() {
  const router = useRouter();
  const { profile } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
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

          {/* Profile and Logout */}
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 px-4 py-2 rounded-xl 
                    bg-gradient-to-r from-blue-50 to-blue-50/50
                    hover:from-blue-100 hover:to-blue-50 
                    border border-blue-100
                    transition-all duration-200 group"
                >
                  <div
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 
                    rounded-lg flex items-center justify-center 
                    shadow-md group-hover:shadow-lg 
                    transform group-hover:scale-105 transition-all duration-200"
                  >
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {profile.FirstName} {profile.LastName}
                    </p>
                    <p className="text-xs text-blue-600 font-medium capitalize">
                      {profile.Role}
                    </p>
                  </div>
                  <FiChevronDown
                    className={`w-4 h-4 text-blue-500 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl 
                    shadow-lg ring-1 ring-black ring-opacity-5 py-2 z-50 
                    transform origin-top-right transition-all duration-200 
                    animate-fadeIn divide-y divide-gray-100"
                  >
                    <div className="px-4 py-3 hover:bg-blue-50/40 transition-colors duration-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FiMail className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Email
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 pl-9 font-medium">
                        {profile.Email}
                      </p>
                    </div>
                    <div className="px-4 py-3 hover:bg-blue-50/40 transition-colors duration-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FiPhone className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Contact
                        </p>
                      </div>
                      <p className="text-sm text-gray-700 pl-9 font-medium">
                        {profile.Contact}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50/40 
                      transition-colors duration-200 group"
                    >
                      <div className="p-2 bg-red-100 rounded-lg">
                        <FiLogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <span className="text-sm font-medium text-red-600 group-hover:text-red-700">
                        Sign out
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
