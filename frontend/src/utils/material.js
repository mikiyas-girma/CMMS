import Swal from "sweetalert2";
import apiInstance from "./axios";
const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

export const registerMaterial = async (
  name,
  category,
  image,
  totalQuantity
) => {
  try {
    const requestData = {
      name,
      category,
      image,
      totalQuantity,
    };

    const { data } = await apiInstance.post("/materials", requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("data", data);
    Toast.fire({
      icon: "success",
      title: "Material Registered Successfully",
    });

    return { data, error: null };
  } catch (error) {
    console.log("error", error.response?.data);
    return {
      data: null,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
