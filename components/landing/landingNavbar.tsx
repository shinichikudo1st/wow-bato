"use client";

import Link from "next/link";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-lg">TC</span>
              </div>
              <span className="text-lg font-semibold text-gray-800 tracking-tight">
                Toledo City <span className="text-blue-600">Portal</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {["About", "Transparency", "Barangays", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 group"
              >
                <span>{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/login"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 space-x-2"
            >
              <FiUser className="w-4 h-4" />
              <span>Sign in</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md shadow-lg border-t border-blue-50">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {["About", "Transparency", "Barangays", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                >
                  {item}
                </Link>
              ))}
              <div className="mt-6 pt-4 border-t border-blue-50 space-y-3">
                <Link
                  href="/login"
                  className="flex items-center px-4 py-2.5 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-200"
                >
                  <FiUser className="w-5 h-5 mr-3" />
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-center transition-all duration-200 shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
