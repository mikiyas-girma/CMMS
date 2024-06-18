import apiInstance from "./axios";

export const getAllNotifications = async (userId) => {
  try {
    const { data } = await apiInstance.get(`/notifications/user/${userId}`);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const getNotViewedNotifications = async (userId) => {
  try {
    const { data } = await apiInstance.get(
      `/notifications/not-viewed/${userId}`
    );
    console.log("notV", data);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
