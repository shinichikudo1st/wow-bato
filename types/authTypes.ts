export type UserRole = "citizen" | "barangay admin" | "city admin";

export interface RegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  barangay: string;
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
  Email: string;
  FirstName: string;
  LastName: string;
  Role: string;
  Contact: string;
}

export interface AuthenticationInformation {
  userID: number | null;
  barangayID: number | null;
  userRole: string | null;
  barangayName: string | null;
}
