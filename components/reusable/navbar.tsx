"use client";

import { logout, getProfile } from "@/libs/authentication";
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

interface ProfileData {
  Email: string;
  FirstName: string;
  LastName: string;
  Role: string;
  Contact: string;
}

export default function Navbar() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

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
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl 
                    shadow-lg border border-blue-100 py-2 z-50 
                    transform transition-all duration-200 
                    animate-fadeIn"
                  >
                    <div
                      className="px-4 py-3 border-b border-blue-50 
                      hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent 
                      transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <FiMail className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xs font-medium text-blue-600">
                          Email
                        </p>
                      </div>
                      <p className="text-sm text-gray-900 pl-7">
                        {profile.Email}
                      </p>
                    </div>
                    <div
                      className="px-4 py-3 
                      hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent 
                      transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <FiPhone className="w-4 h-4 text-blue-600" />
                        </div>
                        <p className="text-xs font-medium text-blue-600">
                          Contact
                        </p>
                      </div>
                      <p className="text-sm text-gray-900 pl-7">
                        {profile.Contact}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

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
