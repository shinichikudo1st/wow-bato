import { useBarangayNames } from "@/hooks/barangayHook";
import { FormErrors, RegisterFormData } from "@/types/authTypes";
import { FiMail, FiUser } from "react-icons/fi";

const RegisterFormLeftColumn = ({
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
  const barangays = useBarangayNames();

  return (
    <div className="space-y-6">
      {/* Email Input */}
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
                                focus:border-transparent`}
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

      {/* First Name & Last Name */}
      <div className="space-y-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="block w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <div className="mt-1 relative rounded-xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="block w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Last name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default RegisterFormLeftColumn;
