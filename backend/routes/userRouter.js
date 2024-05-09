import express from "express";
import {
  RegisterStoreOwner,
  getAllStoreOwner,
} from "../Controller/userController.js";
const userRouter = express.Router();

userRouter.route("/").get(getAllStoreOwner).post(RegisterStoreOwner);
export default userRouter;
