import apiInstance from "./axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
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
  });
};
export const login = async (email, password) => {
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/cmms/api/users/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
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
  // console.log("tokenfromCookies", token);
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
    const { data } = await apiInstance.post("/users/storeOwner", {
      Fname,
      Lname,
      email,
      phone,
      password,
      passwordConfirm,
    });

    console.log("data", data);
    Toast.fire({
      icon: "success",
      title: "Registered Successfully",
    });

    // await login(email, password);

    return { data, error: null };
  } catch (error) {
    console.log("error", error.response?.data);
    return {
      data: null,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
