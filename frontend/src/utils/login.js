import apiInstance from "./axios";

export const login = async (email, password) => {
  try {
    const data = await apiInstance.post("users/login", {
      email,
      password,
    });
    return { data, error: null };
  } catch (error) {
    console.log("er", error);
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    };
  }
};
