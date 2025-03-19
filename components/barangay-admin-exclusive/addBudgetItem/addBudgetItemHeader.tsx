import { FiPackage } from "react-icons/fi";

const AddBudgetItemHeader = () => {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-blue-600">
            New Budget Item
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center">
          <FiPackage className="mr-2 text-blue-600" />
          Add Budget Item
        </h2>
      </div>
    </div>
  );
};

export default AddBudgetItemHeader;
