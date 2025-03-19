import { useAddBarangayStore } from "@/store/barangayStore";
import { FiHome } from "react-icons/fi";

const AddBarangayCity = () => {
  const { formData, setFormData } = useAddBarangayStore();
  return (
    <div>
      <label
        htmlFor="city"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        City
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiHome className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="Enter city name"
          required
        />
      </div>
    </div>
  );
};

export default AddBarangayCity;
