import { FcGoogle } from "react-icons/fc";
import { FiFacebook } from "react-icons/fi";

const SocialLoginButton = () => {
  return (
    <div className="space-y-3">
      <button
        type="button"
        className="w-full flex items-center justify-center px-4 py-3 
                border border-gray-200 rounded-xl text-sm font-medium text-gray-700 
                hover:bg-gray-50 transition-colors duration-200 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FcGoogle className="h-5 w-5 mr-2" />
        Continue with Google
      </button>
      <button
        type="button"
        className="w-full flex items-center justify-center px-4 py-3 
                bg-blue-600 rounded-xl text-sm font-medium text-white 
                hover:bg-blue-700 transition-colors duration-200 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FiFacebook className="h-5 w-5 mr-2" />
        Continue with Facebook
      </button>
    </div>
  );
};

export default SocialLoginButton;
