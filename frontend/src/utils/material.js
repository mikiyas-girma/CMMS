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
  totalQuantity,
  minthreshold
) => {
  try {
    const requestData = {
      name,
      category,
      image,
      totalQuantity,
      minthreshold,
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

export const getMaterials = async () => {
  try {
    const { data } = await apiInstance.get("/materials");
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const addMaterials = async (url, materials) => {
  try {
    const { data } = await apiInstance.post(`/materials/${url}`, materials);

    console.log("data", data);
    if (data?.status === "success") {
      Toast.fire({
        icon: "success",
        title: `Material ${
          url === "withdrawmaterial" ? "withdrawn" : "added"
        } and  totalQuantities updated Successfully`,
      });
    }

    return { data, error: null };
  } catch (error) {
    console.log("error", error.response?.data);
    return {
      data: null,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const generatereport = async (url, start, upto) => {
  try {
    const { data } = await apiInstance.post(`/materials/${url}`, {
      start,
      upto,
    });

    console.log("data", data);
    if (data?.status === "success") {
      Toast.fire({
        icon: "success",
        title: ` ${
          url === "addedmaterialreport" ? "Added" : "Withdrawn"
        } Material Report Generated Successfully`,
      });
    }

    return { data, error: null };
  } catch (error) {
    console.log("error", error.response?.data);
    return {
      data: null,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
