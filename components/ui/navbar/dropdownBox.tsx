import { FiLogOut, FiMail, FiPhone } from "react-icons/fi";

const DropdownBox = ({
  profile,
  handleLogout,
}: {
  profile: any;
  handleLogout: () => void;
}) => {
  return (
    <div
      className="absolute right-0 mt-2 w-72 bg-white rounded-2xl 
                    shadow-lg ring-1 ring-black ring-opacity-5 py-2 z-50 
                    transform origin-top-right transition-all duration-200 
                    animate-fadeIn divide-y divide-gray-100"
    >
      <div className="px-4 py-3 hover:bg-blue-50/40 transition-colors duration-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiMail className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Email
          </p>
        </div>
        <p className="text-sm text-gray-700 pl-9 font-medium">
          {profile.Email}
        </p>
      </div>
      <div className="px-4 py-3 hover:bg-blue-50/40 transition-colors duration-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiPhone className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Contact
          </p>
        </div>
        <p className="text-sm text-gray-700 pl-9 font-medium">
          {profile.Contact}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-red-50/40 
                      transition-colors duration-200 group"
      >
        <div className="p-2 bg-red-100 rounded-lg">
          <FiLogOut className="w-4 h-4 text-red-600" />
        </div>
        <span className="text-sm font-medium text-red-600 group-hover:text-red-700">
          Sign out
        </span>
      </button>
    </div>
  );
};

export default DropdownBox;
