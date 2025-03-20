import { useRegisterStore } from "@/store/authStore";
import { FiLock } from "react-icons/fi";

const RegisterConfirmPassword = () => {
  const { formData, setFormData } = useRegisterStore();
  return (
    <div>
      <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium text-gray-700"
      >
        Confirm Password
      </label>
      <div className="mt-1 relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiLock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="block w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({
              ...formData,
              confirmPassword: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};

export default RegisterConfirmPassword;
