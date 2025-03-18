import { useAddBudgetCategoryStore } from "@/store/budgetCategoryStore";
import { FiFolderPlus } from "react-icons/fi";

const AddCategoryName = () => {
  const { formData, setFormData } = useAddBudgetCategoryStore();
  return (
    <div>
      <label
        htmlFor="categoryName"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Category Name
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiFolderPlus className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          id="categoryName"
          name="categoryName"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        hover:border-blue-300 transition-all duration-200
                        bg-white hover:bg-blue-50/30"
          placeholder="Enter category name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
    </div>
  );
};

export default AddCategoryName;
