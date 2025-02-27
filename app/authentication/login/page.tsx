"use client";

import AuthBackground from "@/components/auth/authBackground";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FormErrorsLogin, LoginFormData } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { checkAuth, login } from "@/libs/authentication";
import LoginLogo from "@/components/login/loginLogo";
import ForgotPassword from "@/components/login/forgotPassword";
import SocialLoginButton from "@/components/login/socialLoginButton";
import LoginButton from "@/components/login/loginButton";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrorsLogin>({});
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: async () => {
      try {
        const authResponse = await checkAuth();
        const authData = await authResponse.json();
        router.push(`/home/${authData.role.toLowerCase().replace(" ", "-")}`);
      } catch (error) {
        console.error("Auth check error:", error);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
    }
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrorsLogin = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    
    loginMutation.mutate(formData);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthBackground />

      <LoginLogo />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div
          className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10 
          border border-gray-100
          backdrop-blur-xl 
          bg-opacity-80
          hover:shadow-xl
          transition-all duration-300
          relative
          before:absolute before:inset-0 before:-z-10 before:bg-white/40 before:backdrop-blur-xl before:rounded-2xl"
        >
          {/* Social Login Buttons */}
          <SocialLoginButton />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </div>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
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
                      errors.email ? "border-red-300" : "border-gray-200"
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
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock
                    className={`h-5 w-5 ${
                      errors.password ? "text-red-400" : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className={`block w-full pl-10 pr-10 py-3 text-sm 
                    border ${
                      errors.password ? "border-red-300" : "border-gray-200"
                    } 
                    rounded-xl focus:outline-none focus:ring-2 
                    ${
                      errors.password
                        ? "focus:ring-red-500"
                        : "focus:ring-blue-500"
                    } 
                    focus:border-transparent
                    transition-colors duration-200`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (errors.password)
                      setErrors({ ...errors, password: undefined });
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <ForgotPassword />

            {/* Submit Button */}
            <LoginButton isLoading={loginMutation.isPending} />
          </form>
        </div>
      </div>
    </div>
  );
}
