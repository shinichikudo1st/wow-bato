import { RegisterFormData } from "@/types/authTypes";

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
