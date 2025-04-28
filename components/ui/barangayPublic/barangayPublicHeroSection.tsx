import { FiMapPin } from "react-icons/fi";

const BarangayPublicHeroSection = () => {
  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/50" />
      <div className="relative max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-8">
          <FiMapPin className="text-blue-600" />
          <span className="text-sm font-medium text-blue-600">
            Explore Our Communities
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our Barangays
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the unique communities that make up our municipality, each
          with its own character and charm.
        </p>
      </div>
    </div>
  );
};

export default BarangayPublicHeroSection;
