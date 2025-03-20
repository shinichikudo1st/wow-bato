import { useRegisterStore } from "@/store/authStore";
import { UserRole } from "@/types/authTypes";

const RegisterRole = () => {
  const { formData, setFormData } = useRegisterStore();
  return (
    <div>
      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
        Role
      </label>
      <select
        id="role"
        name="role"
        required
        className="mt-1 block w-full pl-3 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={formData.role}
        onChange={(e) =>
          setFormData({
            ...formData,
            role: e.target.value as UserRole,
          })
        }
      >
        <option value="citizen">Citizen</option>
        <option value="barangay admin">Barangay Admin</option>
        <option value="city admin">City Admin</option>
      </select>
    </div>
  );
};

export default RegisterRole;
