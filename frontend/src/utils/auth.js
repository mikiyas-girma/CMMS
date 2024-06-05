import apiInstance from "./axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

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
      Toast.fire({
        icon: "success",
        title: "Login Successfully",
      });
    }
    return { data, error: null };
  } catch (error) {
    // console.log("er", error);
    return {
      data: null,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};

export const getUserAuthStatus = () => {
  const token = Cookies.get("jwt");
  if (!token) return { isAuth: false };

  try {
    const decodedToken = jwtDecode(token);
    return { isAuth: true, role: decodedToken.role };
  } catch (error) {
    return { isAuth: false };
  }
};
export const register = async (
  Fname,
  Lname,
  email,
  phone,
  password,
  passwordConfirm
) => {
  console.log("data", Fname, Lname, email, phone, password, passwordConfirm);

  try {
    const { data } = await apiInstance.post("users/users/employee", {
      Fname,
      Lname,
      email,
      phone,
      password,
      passwordConfirm,
    });

    Toast.fire({
      icon: "success",
      title: "Registered Successfully",
    });

    await login(email, password); // Log in automatically after registration

    return { data, error: null };
  } catch (error) {
    console.log("error", error.response?.data);
    return {
      data: null,
      error: error.response?.data?.detail || "Something went wrong",
    };
  }
};
