"use client";

import { logout } from "@/libs/authentication";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiMail, FiPhone } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useProfile } from "@/hooks/userHooks";
import DropdownButton from "./navbar/dropdownButton";
import DropdownBox from "./navbar/dropdownBox";

export default function Navbar() {
  const router = useRouter();
  const { profile } = useProfile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
                <DropdownButton
                  setIsDropdownOpen={setIsDropdownOpen}
                  isDropdownOpen={isDropdownOpen}
                  profile={profile}
                />

                {/* Dropdown */}
                {isDropdownOpen && (
                  <DropdownBox profile={profile} handleLogout={handleLogout} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
