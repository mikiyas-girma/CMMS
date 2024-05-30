import apiInstance from "./axios";

export const login = async (email, password) => {
  try {
    const data = await apiInstance.post("/storeOwner/login", {
      email,
      password,
    });
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    };
  }
};
