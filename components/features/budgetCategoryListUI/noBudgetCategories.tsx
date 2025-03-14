import { FiFolderPlus } from "react-icons/fi";

const NoBudgetCategories = () => {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <FiFolderPlus className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No Budget Categories Yet
      </h3>
      <p className="text-gray-500">
        Create your first budget category to get started.
      </p>
    </div>
  );
};

export default NoBudgetCategories;
