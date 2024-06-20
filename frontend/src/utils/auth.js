// utils/auth.js
import apiInstance from "./axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Fix import here
import axios from "axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

// The rest of your code

export const setAuthUser = (token) => {
  Cookies.set("jwt", token, {
    expires: 1,
  });
};
export const login = async (email, password) => {
  try {
    const { data } = await apiInstance.post("/users/login", {
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

// export const fetchUsers = async (url) => {
//   try {
//     const { data } = await apiInstance.get(`/users/${url}`);
//     return { data, error: null };
//   } catch (error) {
//     return {
//       data: null,
//       error: error?.response?.data?.message || "Something went wrong",
//     };
//   }
// };
export const getUserAuthStatus = () => {
  // console.log("tokenfromCookies", Cookies);

  const token = Cookies.get("jwt");
  console.log("tokenfromCookies", token);
  if (!token) return { isAuth: false };

  try {
    const decodedToken = jwtDecode(token);
    return { isAuth: true, role: decodedToken.role, userId: decodedToken.id };
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
  // console.log("data", Fname, Lname, email, phone, password, passwordConfirm);
  const { role } = getUserAuthStatus();
  let url = "";

  if (role === "admin") {
    url = "/users/storeOwner";
  }
  if (role === "storeOwner") {
    url = "/users/employee";
  }

  try {
    const { data } = await apiInstance.post(url, {
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

export const blockUser = async (url, user) => {
  let ur = "";
  if (user.role === "storeOwner") {
    ur = `/storeOwner/${url}`;
  } else if (user.role === "employee") {
    ur = `/employee/${url}`;
  }
  try {
    const { data } = await apiInstance.patch(`/users${ur}`);
    // console.log("token", data?.token);

    if (data?.status === "success") {
      Toast.fire({
        icon: "success",
        title: `${
          url.startsWith("block")
            ? "User Blocked Successfully"
            : "User Activated Successfully"
        } `,
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
export const updateUser = async (url, editedUser) => {
  try {
    const { data } = await apiInstance.patch(url, editedUser);

    if (data?.status === "success") {
      Toast.fire({
        icon: "success",
        title: "User Updated Successfully",
      });
    }
    return { data, error: null };
  } catch (error) {
    console.log("Error", error);
    return {
      data: null,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
export const forgotPassword = async (email) => {
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:3000/cmms/api/users/forgotPassword",
      { email }
    );

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const { data } = await axios.patch(
      `http://127.0.0.1:3000/cmms/api/users/resetPassword/${token}`,
      { password, passwordConfirm }
    );

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
export const deleteCookies = async (cookieName) => {
  try {
    const response = await apiInstance.get(
      `/users/deleteCookies/${cookieName}`
    );
    console.log(`Cookie ${cookieName} deleted successfully.`);
    return response.data; // Optionally return data if needed
  } catch (error) {
    return {
      data: null,
      error: error?.response?.data?.message || "Something went wrong",
    };
  }
};
