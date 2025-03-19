import { useAddBarangayStore } from "@/store/barangayStore";
import { FiGlobe } from "react-icons/fi";

const AddBarangayRegion = () => {
  const { formData, setFormData } = useAddBarangayStore();
  return (
    <div>
      <label
        htmlFor="region"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Region
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiGlobe className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          id="region"
          name="region"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter region"
          required
        />
      </div>
    </div>
  );
};

export default AddBarangayRegion;
