"use client";

import AuthBackground from "@/components/ui/authBackground";
import { LoginFormData } from "@/types/authTypes";
import LoginLogo from "@/components/login/loginLogo";
import ForgotPassword from "@/components/login/forgotPassword";
import SocialLoginButton from "@/components/login/socialLoginButton";
import LoginButton from "@/components/login/loginButton";
import { useMutation } from "@tanstack/react-query";
import { login, validateLoginForm } from "@/libs/authentication";
import { useRouter } from "next/navigation";
import { useLoginStore } from "@/store/authStore";
import LoginDivider from "@/components/login/loginDivider";
import LoginEmail from "@/components/login/loginForm/loginEmail";
import LoginPassword from "@/components/login/loginForm/loginPassword";

export default function LoginPage() {
  const {
    formData,

    setErrors,
  } = useLoginStore();

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await login(data);
      const responseData = await response.json();
      return responseData;
    },
    onSuccess: (data) => {
      router.push(`/home/${data.role.toLowerCase().replace(" ", "-")}`);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm(formData, setErrors)) return;

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

          <LoginDivider />

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <LoginEmail />

            <LoginPassword />

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
