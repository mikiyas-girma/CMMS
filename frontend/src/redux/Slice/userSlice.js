import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiInstance from "../../utils/axios";

const initialState = {
  status: "",
  error: "",
  numberofuser: "",
  userData: [],
  user: "",
};

export const fetchUsers = createAsyncThunk(
  "fetchUsers",
  async (url, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.get(`/users/${url}`);
      return data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (url, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.get("/users/me");
      return data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.userData = action?.payload?.data?.users;
        state.numberofuser = action.payload.results;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.user = action?.payload?.data?.user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
