import { useBarangayNames } from "@/hooks/barangayHook";
import { useRegisterStore } from "@/store/authStore";

const RegisterBarangay = () => {
  const barangays = useBarangayNames();
  const { formData, setFormData } = useRegisterStore();
  return (
    <div>
      <label
        htmlFor="barangay"
        className="block text-sm font-medium text-gray-700"
      >
        Barangay
      </label>
      <select
        id="barangay"
        name="barangay"
        required
        className="mt-1 block w-full pl-3 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={formData.barangay}
        onChange={(e) =>
          setFormData({
            ...formData,
            barangay: e.target.value,
          })
        }
      >
        {barangays.map((barangay) => (
          <option key={barangay.id} value={barangay.id}>
            {barangay.name.charAt(0).toUpperCase() + barangay.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegisterBarangay;
