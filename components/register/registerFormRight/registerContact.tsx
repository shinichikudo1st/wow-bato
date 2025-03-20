import { useRegisterStore } from "@/store/authStore";
import { FiPhone } from "react-icons/fi";

const RegisterContact = () => {
  const { formData, setFormData } = useRegisterStore();
  return (
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
  );
};

export default RegisterContact;
