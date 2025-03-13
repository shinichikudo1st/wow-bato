"use client";

import AuthBackground from "@/components/ui/authBackground";
import { RegisterFormData } from "@/types/authTypes";
import ErrorMessage from "@/components/ui/error";
import SuccessMessage from "@/components/ui/success";
import { register, validateRegisterForm } from "@/libs/authentication";
import RegisterLogo from "@/components/register/registerLogo";
import RegisterSocialButton from "@/components/register/registerSocialButton";
import RegisterFormLeftColumn from "@/components/register/registerFormLeft";
import RegisterFormRightColumn from "@/components/register/registerFormRight";
import RegisterFormButton from "@/components/register/registerButton";
import { useRegisterStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";

export default function RegisterPage() {
  const {
    formData,
    errors,
    error,
    success,
    setFormData,
    setErrors,
    setError,
    setSuccess,
  } = useRegisterStore();

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      await register(data);
    },
    onSuccess: () => {
      setSuccess("Registration successful! You can now login to your account.");
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        barangay: "1",
        role: "citizen",
        contact: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    },
    onError: (error) => {
      setError(error instanceof Error ? error.message : "Failed to register");
      setTimeout(() => {
        setError(null);
      }, 3000);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegisterForm(formData, setErrors, errors)) return;

    registerMutation.mutate(formData);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthBackground />

      <RegisterLogo />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl relative z-10">
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
          {/* Error Message */}
          {error && <ErrorMessage error={error} setError={setError} />}

          {/* Success Message */}
          {success && (
            <SuccessMessage success={success} setSuccess={setSuccess} />
          )}

          {/* Social Registration Buttons in a row */}
          <RegisterSocialButton />

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or register with email
                </span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            onChange={resetMessages}
            className="mt-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - email, firstname, lastname, barangay*/}
              <RegisterFormLeftColumn
                errors={errors}
                setErrors={setErrors}
                formData={formData}
                setFormData={setFormData}
              />

              {/* Right Column - role, contact, password, confirm password*/}
              <RegisterFormRightColumn
                errors={errors}
                setErrors={setErrors}
                formData={formData}
                setFormData={setFormData}
              />
            </div>

            {/* Submit Button - Full Width */}
            <RegisterFormButton isLoading={registerMutation.isPending} />
          </form>
        </div>
      </div>
    </div>
  );
}
