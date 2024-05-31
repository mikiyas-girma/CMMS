import apiInstance from "./axios";
import Cookies from "js-cookie";
export const setAuthUser = (token) => {
  Cookies.set("jwt", token, {
    expires: 1,
    // secure: true,
  });
};
export const login = async (email, password) => {
  try {
    const { data } = await apiInstance.post("users/login", {
      email,
      password,
    });
    // console.log("token", data?.token);

    if (data?.status === "success") {
      setAuthUser(data?.token);
    }
    return { data, error: null };
  } catch (error) {
    console.log("er", error);
    return {
      data: null,
      error: error.response.data?.detail || "Something went wrong",
    };
  }
};
