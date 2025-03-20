import {
  FormErrors,
  FormErrorsLogin,
  LoginFormData,
  RegisterFormData,
} from "@/types/authTypes";
import { create } from "zustand";

type LoginStore = {
  formData: LoginFormData;
  errors: FormErrorsLogin;
  showPassword: boolean;
  setFormData: (data: LoginFormData) => void;
  setErrors: (errors: FormErrorsLogin) => void;
  setShowPassword: () => void;
};

type RegisterStore = {
  formData: RegisterFormData;
  errors: FormErrors;
  error: string | null;
  success: string | null;
  showPassword: boolean;

  setFormData: (data: RegisterFormData) => void;
  setErrors: (errors: FormErrors) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  setShowPassword: (showPassword: boolean) => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
  formData: { email: "", password: "" },
  errors: {},
  showPassword: false,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setErrors: (errors) => set(() => ({ errors })),
  setShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));

export const useRegisterStore = create<RegisterStore>((set) => ({
  formData: {
    email: "",
    firstName: "",
    lastName: "",
    barangay: "1",
    role: "citizen",
    contact: "",
    password: "",
    confirmPassword: "",
  },
  errors: {},
  error: null,
  success: null,
  showPassword: false,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setErrors: (errors) => set(() => ({ errors })),
  setError: (error) => set(() => ({ error })),
  setSuccess: (success) => set(() => ({ success })),
  setShowPassword: (showPassword) =>
    set(() => ({ showPassword: showPassword })),
}));
