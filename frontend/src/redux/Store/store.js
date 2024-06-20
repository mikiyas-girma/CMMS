import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slice/userSlice";
import materialSlice from "../Slice/materialSlice";

const rootReducer = combineReducers({
  user: userSlice,
  material: materialSlice,
});
export const store = configureStore({
  reducer: rootReducer,
});
