import { FormErrors, LoginFormData, RegisterFormData } from "@/types/authTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
}

export const validateRegisterForm = async (
  formData: RegisterFormData,
  setErrors: (errors: FormErrors) => void,
  errors: FormErrors
): Promise<boolean> => {
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

export async function logout() {
  try {
    const response = await fetch(`${API_BASE_URL}/user/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export async function register(formData: RegisterFormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export async function login(formData: LoginFormData) {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export async function checkAuth() {
  try {
    const response = await fetch(`${API_BASE_URL}/user/checkAuth`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to check authentication");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get profile");
    }

    const profileData = await response.json();

    return profileData.data;
  } catch (error) {
    throw error;
  }
}
