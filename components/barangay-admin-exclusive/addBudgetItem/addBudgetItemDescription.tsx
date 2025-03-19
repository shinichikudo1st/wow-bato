import { useAddBudgetItemStore } from "@/store/budgetItemStore";
import { FiFileText } from "react-icons/fi";

const AddBudgetItemDescription = () => {
  const { formData, setFormData } = useAddBudgetItemStore();
  return (
    <div>
      <label
        htmlFor="description"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Description
      </label>
      <div className="relative group">
        <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
          <FiFileText className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        hover:border-blue-300 transition-all duration-200
                        bg-white hover:bg-blue-50/30"
          placeholder="Enter a detailed description of the budget item..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Provide details about how this budget will be utilized
      </p>
    </div>
  );
};

export default AddBudgetItemDescription;
