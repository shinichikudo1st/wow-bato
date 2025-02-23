import { BarangayListItem } from "@/types/barangayTypes";
import { FiGlobe, FiHome } from "react-icons/fi";

const BarangayViewCard = ({
  barangay,
}: {
  barangay: BarangayListItem | null;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
        <div className="flex items-center space-x-3 mb-3">
          <FiHome className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm font-medium text-gray-500">City</h2>
        </div>
        <p className="text-lg font-semibold text-gray-900 ml-8">
          {barangay?.city}
        </p>
      </div>

      <div className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
        <div className="flex items-center space-x-3 mb-3">
          <FiGlobe className="w-5 h-5 text-purple-600" />
          <h2 className="text-sm font-medium text-gray-500">Region</h2>
        </div>
        <p className="text-lg font-semibold text-gray-900 ml-8">
          {barangay?.region}
        </p>
      </div>
    </div>
  );
};

export default BarangayViewCard;
