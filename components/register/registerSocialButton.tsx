import { FcGoogle } from "react-icons/fc";
import { FiFacebook } from "react-icons/fi";

const RegisterSocialButton = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        className="flex items-center justify-center px-4 py-3 
                        border border-gray-200 rounded-xl text-sm font-medium text-gray-700 
                        hover:bg-gray-50 transition-colors duration-200"
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Continue with Google
      </button>
      <button
        type="button"
        className="flex items-center justify-center px-4 py-3 
                        bg-blue-600 rounded-xl text-sm font-medium text-white 
                        hover:bg-blue-700 transition-colors duration-200"
      >
        <FiFacebook className="h-5 w-5 mr-2" />
        Continue with Facebook
      </button>
    </div>
  );
};

export default RegisterSocialButton;
