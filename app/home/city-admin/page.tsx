"use client";

import Image from "next/image";
import AuthBackground from "@/components/auth/authBackground";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CityAdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        router.push("/authentication/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white">
      <AuthBackground />

      {/* Navbar */}
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
                  transform hover:-translate-y-0.5"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="bg-white py-8 px-4 shadow-lg rounded-2xl sm:px-10 
          border border-gray-100
          backdrop-blur-xl 
          bg-opacity-80
          hover:shadow-xl
          transition-all duration-300
          relative
          before:absolute before:inset-0 before:-z-10 before:bg-white/40 before:backdrop-blur-xl before:rounded-2xl"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Welcome to Your Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              This is your personalized homepage. Add your main content here.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
