import apiInstance from "./axios";
import Cookies from "js-cookie";

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
