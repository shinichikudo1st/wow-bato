import { LoginFormData, RegisterFormData } from "@/types/authTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
}

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
    const authResponse = await fetch(`${API_BASE_URL}/user/checkAuth`, {
      credentials: "include",
    });

    if (!authResponse.ok) {
      throw new Error("Failed to check authentication");
    }

    return authResponse;
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
