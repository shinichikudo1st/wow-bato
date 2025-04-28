"use client";

import { FiMapPin, FiUsers, FiHome, FiAward } from "react-icons/fi";
import BarangayListPublic from "@/components/ui/barangayPublic/barangayPublicView";
import BarangayPublicHeroSection from "@/components/ui/barangayPublic/barangayPublicHeroSection";

const barangays = [
  {
    name: "Bato",
    population: "5,234",
    captain: "Juan Dela Cruz",
    description:
      "A vibrant community known for its rich cultural heritage and active community programs.",
    highlights: ["Cultural Heritage", "Community Programs", "Local Markets"],
  },
  {
    name: "Poblacion",
    population: "8,765",
    captain: "Maria Santos",
    description:
      "The central business district with modern amenities and historical landmarks.",
    highlights: ["Business Hub", "Historical Sites", "Modern Facilities"],
  },
  {
    name: "Luray",
    population: "4,321",
    captain: "Pedro Reyes",
    description:
      "A peaceful agricultural community with scenic rice terraces and friendly residents.",
    highlights: ["Agriculture", "Rice Terraces", "Rural Tourism"],
  },
  {
    name: "Cabitoonan",
    population: "3,876",
    captain: "Ana Lim",
    description:
      "Known for its traditional crafts and sustainable community projects.",
    highlights: ["Traditional Crafts", "Sustainability", "Community Projects"],
  },
  {
    name: "Ibo",
    population: "4,567",
    captain: "Carlos Garcia",
    description:
      "A coastal community with beautiful beaches and thriving marine life.",
    highlights: ["Coastal Area", "Marine Life", "Tourism"],
  },
];

export default function BarangaysPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <BarangayPublicHeroSection />

      {/* Barangay Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {barangays.map((barangay, index) => (
            <BarangayListPublic barangay={barangay} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Municipality Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                label: "Total Population",
                value: "26,763",
                icon: <FiUsers className="w-6 h-6" />,
              },
              {
                label: "Total Area",
                value: "156 km²",
                icon: <FiMapPin className="w-6 h-6" />,
              },
              {
                label: "Active Projects",
                value: "25+",
                icon: <FiHome className="w-6 h-6" />,
              },
              {
                label: "Community Programs",
                value: "12",
                icon: <FiAward className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
