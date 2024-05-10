import express from "express";
import {
  RegisterStoreOwner,
  getAllStoreOwner,
  UpdateStoreOwner,
} from "../Controller/userController.js";
const userRouter = express.Router();

userRouter.route("/").get(getAllStoreOwner).post(RegisterStoreOwner);
userRouter.route("/:id").patch(UpdateStoreOwner).delete(RegisterStoreOwner);

export default userRouter;
