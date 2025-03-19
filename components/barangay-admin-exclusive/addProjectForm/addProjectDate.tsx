import { useAddProjectStore } from "@/store/projectStore";
import { FiCalendar } from "react-icons/fi";

const AddProjectDate = () => {
  const { formData, setFormData } = useAddProjectStore();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Start Date
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiCalendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          hover:border-blue-300 transition-all duration-200
                          bg-white hover:bg-blue-50/30"
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="endDate"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          End Date
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiCalendar className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                          hover:border-blue-300 transition-all duration-200
                          bg-white hover:bg-blue-50/30"
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddProjectDate;
