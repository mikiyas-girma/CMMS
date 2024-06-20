import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
