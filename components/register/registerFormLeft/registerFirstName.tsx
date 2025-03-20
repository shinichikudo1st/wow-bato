import { useRegisterStore } from "@/store/authStore";
import { FiUser } from "react-icons/fi";

const RegisterFirstName = () => {
  const { formData, setFormData } = useRegisterStore();
  return (
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
  );
};

export default RegisterFirstName;
