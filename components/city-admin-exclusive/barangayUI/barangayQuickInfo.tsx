import { FiCalendar } from "react-icons/fi";

const BarangayQuickInfo = ({ barangayID }: { barangayID: number | undefined }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-2xl border border-gray-100 backdrop-blur-xl bg-opacity-80">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Quick Information
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiCalendar className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">ID Number</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            #{barangayID}
          </span>
        </div>
        {/* Add more quick stats here */}
      </div>
    </div>
  );
};

export default BarangayQuickInfo;
