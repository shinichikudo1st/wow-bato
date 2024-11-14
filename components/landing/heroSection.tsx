import { FiTrendingUp, FiSearch, FiDatabase } from "react-icons/fi";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gray-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B5563' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
              <span className="block">Toledo City</span>
              <span className="block text-blue-700">Transparency Portal</span>
            </h1>
            <p className="mt-3 text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl">
              Empowering citizens through financial transparency. Access,
              understand, and monitor Toledo City's barangays budget allocation
              and spending in real-time.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start space-x-4">
              <a
                href="#explore"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 transition-colors duration-150"
              >
                <FiTrendingUp className="mr-2" />
                Explore Budget Data
              </a>
              <a
                href="#learn"
                className="inline-flex items-center px-6 py-3 border border-blue-700 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-150"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                {/* Placeholder for actual image */}
                <div className="w-full h-[400px] bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <span className="text-sm">
                      Budget Analytics Dashboard Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
