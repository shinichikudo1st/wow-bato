import { useRegisterStore } from "@/store/authStore";
import { FiUser } from "react-icons/fi";

const RegisterLastName = () => {
  const { formData, setFormData } = useRegisterStore();
  return (
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
  );
};

export default RegisterLastName;
