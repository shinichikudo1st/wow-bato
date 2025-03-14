import { BudgetCategoryResponse } from "@/types/budgetCategoryTypes";
import { useRouter } from "next/navigation";
import { FiEye, FiFileText, FiFolder, FiTrendingUp } from "react-icons/fi";

const BudgetCategories = ({
  category,
  userRole,
}: {
  category: BudgetCategoryResponse;
  userRole: string | null;
}) => {
  const router = useRouter();

  return (
    <div
      key={category.id}
      className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-4 flex-1 min-w-0">
          {/* Category Header */}
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-200 flex-shrink-0">
              <FiFolder className="w-5 h-5 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {category.description}
              </p>
            </div>
          </div>

          {/* Category Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <FiFolder className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">
                {category.project_count} Projects
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <FiTrendingUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">₱200,000</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiFileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600 truncate">1 Active</span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => {
            if (userRole === "citizen") {
              router.push(`/home/citizen/${category.id}`);
            } else if (userRole === "barangay admin") {
              router.push(`/home/barangay-admin/${category.id}`);
            } else {
              router.push(`/home/city-admin/${category.id}`);
            }
          }}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-transparent hover:bg-blue-50 rounded-lg transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 flex-shrink-0"
        >
          <FiEye className="w-4 h-4 mr-1.5" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default BudgetCategories;
