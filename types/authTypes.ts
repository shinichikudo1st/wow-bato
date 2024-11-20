export type UserRole = "citizen" | "barangay admin" | "city admin";

export interface RegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  contact: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  contact?: string;
  password?: string;
  confirmPassword?: string;
}

export interface FormErrorsLogin {
  email?: string;
  password?: string;
}

export interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  contact: string;
}
