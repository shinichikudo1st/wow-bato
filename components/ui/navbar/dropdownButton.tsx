import { FiChevronDown, FiUser } from "react-icons/fi";

const DropdownButton = ({
  setIsDropdownOpen,
  isDropdownOpen,
  profile,
}: {
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
  isDropdownOpen: boolean;
  profile: any;
}) => {
  return (
    <button
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="flex items-center space-x-3 px-4 py-2 rounded-xl 
                            bg-gradient-to-r from-blue-50 to-blue-50/50
                            hover:from-blue-100 hover:to-blue-50 
                            border border-blue-100
                            transition-all duration-200 group"
    >
      <div
        className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 
                            rounded-lg flex items-center justify-center 
                            shadow-md group-hover:shadow-lg 
                            transform group-hover:scale-105 transition-all duration-200"
      >
        <FiUser className="w-4 h-4 text-white" />
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-gray-900">
          {profile.FirstName} {profile.LastName}
        </p>
        <p className="text-xs text-blue-600 font-medium capitalize">
          {profile.Role}
        </p>
      </div>
      <FiChevronDown
        className={`w-4 h-4 text-blue-500 transition-transform duration-200 ${
          isDropdownOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

export default DropdownButton;
