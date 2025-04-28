import Link from "next/link";
import {
  FiArrowRight,
  FiAward,
  FiHome,
  FiImage,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

interface BarangayPublicList {
  name: string;
  population: string;
  captain: string;
  description: string;
  highlights: string[];
}

const BarangayListPublic = ({
  barangay,
  index,
}: {
  barangay: BarangayPublicList;
  index: number;
}) => {
  return (
    <div
      key={index}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
    >
      {/* Image Placeholder */}
      <div className="relative h-56 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <FiImage className="w-12 h-12 text-blue-300 mx-auto mb-2" />
            <span className="text-sm text-blue-400">
              Barangay Image Placeholder
            </span>
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
          <p className="text-gray-600">{barangay.description}</p>

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
  );
};

export default BarangayListPublic;
