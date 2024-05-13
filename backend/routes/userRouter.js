import express from "express";
import {
  RegisterStoreOwner,
  getAllStoreOwner,
  UpdateStoreOwner,
  BlockStoreOwner,
} from "../Controller/userController.js";
const userRouter = express.Router();

userRouter.route("/storeOwner/").get(getAllStoreOwner).post(RegisterStoreOwner);
userRouter
  .route("/storeOwner/:id")
  .patch(UpdateStoreOwner)
  .delete(RegisterStoreOwner);
userRouter.route("/storeOwner/block/:id").patch(BlockStoreOwner);

export default userRouter;
