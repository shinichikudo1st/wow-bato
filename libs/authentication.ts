import { LoginFormData, RegisterFormData } from "@/types/authTypes";

export async function logout() {
  try {
    const response = await fetch("http://localhost:8080/api/v1/user/logout", {
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
    const response = await fetch("http://localhost:8080/api/v1/user/register", {
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
    const response = await fetch("http://localhost:8080/api/v1/user/login", {
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
    const authResponse = await fetch(
      "http://localhost:8080/api/v1/user/checkAuth",
      {
        credentials: "include",
      }
    );

    if (!authResponse.ok) {
      throw new Error("Failed to check authentication");
    }

    return authResponse;
  } catch (error) {
    throw error;
  }
}
