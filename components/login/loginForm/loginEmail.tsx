import { useLoginStore } from "@/store/authStore";
import { FiMail } from "react-icons/fi";

const LoginEmail = () => {
  const { errors, setErrors, formData, setFormData } = useLoginStore();
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Email address
      </label>
      <div className="mt-1 relative rounded-xl shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiMail
            className={`h-5 w-5 ${
              errors.email ? "text-red-400" : "text-gray-400"
            }`}
          />
        </div>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={`block w-full pl-10 pr-3 py-3 text-sm 
                            border ${
                              errors.email
                                ? "border-red-300"
                                : "border-gray-200"
                            } 
                            rounded-xl focus:outline-none focus:ring-2 
                            ${
                              errors.email
                                ? "focus:ring-red-500"
                                : "focus:ring-blue-500"
                            } 
                            focus:border-transparent
                            transition-colors duration-200`}
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
        />
      </div>
      {errors.email && (
        <p className="mt-2 text-sm text-red-600">{errors.email}</p>
      )}
    </div>
  );
};

export default LoginEmail;
