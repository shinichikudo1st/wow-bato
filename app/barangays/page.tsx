'use client';

import { FiMapPin, FiUsers, FiHome, FiArrowRight, FiAward, FiImage } from 'react-icons/fi';
import Link from 'next/link';

const barangays = [
  {
    name: 'Bato',
    population: '5,234',
    captain: 'Juan Dela Cruz',
    description: 'A vibrant community known for its rich cultural heritage and active community programs.',
    highlights: ['Cultural Heritage', 'Community Programs', 'Local Markets']
  },
  {
    name: 'Poblacion',
    population: '8,765',
    captain: 'Maria Santos',
    description: 'The central business district with modern amenities and historical landmarks.',
    highlights: ['Business Hub', 'Historical Sites', 'Modern Facilities']
  },
  {
    name: 'Luray',
    population: '4,321',
    captain: 'Pedro Reyes',
    description: 'A peaceful agricultural community with scenic rice terraces and friendly residents.',
    highlights: ['Agriculture', 'Rice Terraces', 'Rural Tourism']
  },
  {
    name: 'Cabitoonan',
    population: '3,876',
    captain: 'Ana Lim',
    description: 'Known for its traditional crafts and sustainable community projects.',
    highlights: ['Traditional Crafts', 'Sustainability', 'Community Projects']
  },
  {
    name: 'Ibo',
    population: '4,567',
    captain: 'Carlos Garcia',
    description: 'A coastal community with beautiful beaches and thriving marine life.',
    highlights: ['Coastal Area', 'Marine Life', 'Tourism']
  }
];

export default function BarangaysPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
            <FiMapPin className="text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Explore Our Communities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Barangays
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the unique communities that make up our municipality, each with its own character and charm.
          </p>
        </div>
      </div>

      {/* Barangay Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {barangays.map((barangay, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Image Placeholder */}
              <div className="relative h-56 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FiImage className="w-12 h-12 text-blue-300 mx-auto mb-2" />
                    <span className="text-sm text-blue-400">Barangay Image Placeholder</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {barangay.name}
                  </h3>
                  <p className="text-white/90 flex items-center text-sm">
                    <FiMapPin className="mr-2" />
                    Barangay
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center">
                      <FiUsers className="w-5 h-5 mr-2" />
                      <span>Population: {barangay.population}</span>
                    </div>
                    <div className="flex items-center">
                      <FiHome className="w-5 h-5 mr-2" />
                      <span>{barangay.captain}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {barangay.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {barangay.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-600"
                        >
                          <FiAward className="w-3 h-3 mr-1" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <Link
                    href={`/barangays/${barangay.name.toLowerCase()}`}
                    className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 group-hover:shadow-md"
                  >
                    View Details
                    <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Municipality Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Total Population', value: '26,763', icon: <FiUsers className="w-6 h-6" /> },
              { label: 'Total Area', value: '156 km²', icon: <FiMapPin className="w-6 h-6" /> },
              { label: 'Active Projects', value: '25+', icon: <FiHome className="w-6 h-6" /> },
              { label: 'Community Programs', value: '12', icon: <FiAward className="w-6 h-6" /> },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-lg text-blue-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}