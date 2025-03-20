import { useLoginStore } from "@/store/authStore";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

const LoginPassword = () => {
  const {
    errors,
    setErrors,
    formData,
    setFormData,
    showPassword,
    setShowPassword,
  } = useLoginStore();
  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <div className="mt-1 relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiLock
            className={`h-5 w-5 ${
              errors.password ? "text-red-400" : "text-gray-400"
            }`}
          />
        </div>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          className={`block w-full pl-10 pr-10 py-3 text-sm 
                    border ${
                      errors.password ? "border-red-300" : "border-gray-200"
                    } 
                    rounded-xl focus:outline-none focus:ring-2 
                    ${
                      errors.password
                        ? "focus:ring-red-500"
                        : "focus:ring-blue-500"
                    } 
                    focus:border-transparent
                    transition-colors duration-200`}
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword()}
        >
          {showPassword ? (
            <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
      {errors.password && (
        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
      )}
    </div>
  );
};

export default LoginPassword;
