import { FormErrorsLogin, LoginFormData } from "@/types/authTypes";
import { create } from "zustand";

type loginStore = {
  formData: LoginFormData;
  errors: FormErrorsLogin;
  showPassword: boolean;
  setFormData: (data: Partial<LoginFormData>) => void;
  setErrors: (errors: FormErrorsLogin) => void;
  setShowPassword: () => void;
};

export const useLoginStore = create<loginStore>((set) => ({
  formData: { email: "", password: "" },
  errors: {},
  showPassword: false,
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  setErrors: (errors) => set(() => ({ errors })),
  setShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),
}));
