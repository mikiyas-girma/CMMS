import apiInstance from "../../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: "",
  error: "",
  material: [],
};

export const getMaterials = createAsyncThunk(
  "getMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiInstance.get("/materials");
      console.log("Materials", data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const MaterialSlice = createSlice({
  name: "material",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMaterials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMaterials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.material = action?.payload?.data?.materials;
      })
      .addCase(getMaterials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default MaterialSlice.reducer;
