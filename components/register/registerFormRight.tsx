import { FormErrors, RegisterFormData, UserRole } from "@/types/authTypes";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiPhone } from "react-icons/fi";

const RegisterFormRightColumn = ({
  errors,
  formData,
  setFormData,
  setErrors,
}: {
  errors: FormErrors;
  formData: RegisterFormData;
  setFormData: (formData: RegisterFormData) => void;
  setErrors: (errors: FormErrors) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      {/* Role Selection */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
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

      {/* Contact Number */}
      <div>
        <label
          htmlFor="contact"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Number
        </label>
        <div className="mt-1 relative rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiPhone className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="contact"
            name="contact"
            type="tel"
            required
            className="block w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={(e) =>
              setFormData({ ...formData, contact: e.target.value })
            }
          />
        </div>
      </div>

      {/* Password Fields */}
      <div className="space-y-6">
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
              required
              className={`block w-full pl-10 pr-10 py-3 text-sm 
                                  border ${
                                    errors.password
                                      ? "border-red-300"
                                      : "border-gray-200"
                                  } 
                                  rounded-xl focus:outline-none focus:ring-2 
                                  ${
                                    errors.password
                                      ? "focus:ring-red-500"
                                      : "focus:ring-blue-500"
                                  } 
                                  focus:border-transparent`}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
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
      </div>
    </div>
  );
};

export default RegisterFormRightColumn;
