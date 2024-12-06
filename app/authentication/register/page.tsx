"use client";

import AuthBackground from "@/components/auth/authBackground";
import Link from "next/link";
import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiFacebook,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FormErrors, RegisterFormData, UserRole } from "@/types/authTypes";
import ErrorMessage from "@/components/ui/error";
import SuccessMessage from "@/components/ui/success";
import { register } from "@/libs/authentication";
import { useBarangayNames } from "@/hooks/barangayHook";

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    firstName: "",
    lastName: "",
    barangay: "1",
    role: "citizen",
    contact: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const barangays = useBarangayNames();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Contact validation
    if (!formData.contact) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid contact number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      setTimeout(() => {
        setErrors({ ...errors, password: undefined });
      }, 3000);
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and numbers";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await register(formData);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to register");
      }

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
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to register");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <AuthBackground />

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
              {/* Left Column */}
              <div className="space-y-6">
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
                        focus:border-transparent`}
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

                {/* First Name & Last Name */}
                <div className="space-y-6">
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

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <div className="mt-1 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        className="block w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="barangay"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Barangay
                    </label>
                    <select
                      id="barangay"
                      name="barangay"
                      required
                      className="mt-1 block w-full pl-3 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.barangay}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          barangay: e.target.value,
                        })
                      }
                    >
                      {barangays.map((barangay) => (
                        <option key={barangay.id} value={barangay.id}>
                          {barangay.name.charAt(0).toUpperCase() +
                            barangay.name.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Role Selection */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    className="mt-1 block w-full pl-3 pr-10 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: e.target.value as UserRole,
                      })
                    }
                  >
                    <option value="citizen">Citizen</option>
                    <option value="barangay admin">Barangay Admin</option>
                    <option value="city admin">City Admin</option>
                  </select>
                </div>

                {/* Contact Number */}
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

                {/* Password Fields */}
                <div className="space-y-6">
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
                        required
                        className={`block w-full pl-10 pr-10 py-3 text-sm 
                          border ${
                            errors.password
                              ? "border-red-300"
                              : "border-gray-200"
                          } 
                          rounded-xl focus:outline-none focus:ring-2 
                          ${
                            errors.password
                              ? "focus:ring-red-500"
                              : "focus:ring-blue-500"
                          } 
                          focus:border-transparent`}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            password: e.target.value,
                          });
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
                      <p className="mt-2 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1 relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="block w-full pl-10 pr-3 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button - Full Width */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center px-4 py-3 
                  text-sm font-medium rounded-xl text-white 
                  bg-gradient-to-r from-blue-600 to-blue-500 
                  hover:from-blue-700 hover:to-blue-600 
                  transition-all duration-300 
                  shadow-sm hover:shadow-md
                  transform hover:-translate-y-0.5
                  disabled:opacity-50 disabled:cursor-not-allowed
                  disabled:hover:transform-none`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <FiArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
