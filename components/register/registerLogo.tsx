import Link from "next/link";

const RegisterLogo = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center justify-center space-x-3 group"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105">
          <span className="text-white font-bold text-lg">TC</span>
        </div>
        <span className="text-lg font-semibold text-gray-800 tracking-tight">
          Toledo City <span className="text-blue-600">Portal</span>
        </span>
      </Link>

      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/authentication/login"
          className="font-medium text-blue-600 hover:text-blue-500"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterLogo;
