import express from "express";
import {
  RegisterStoreOwner,
  getAllStoreOwner,
  UpdateStoreOwner,
  BlockStoreOwner,
  UnBlockStoreOwner,
  DeleteStoreOwner,
  getUserById,
} from "../Controller/userController.js";
import {
  login,
  protect,
  updatePassword,
  restrictTo,
} from "../Controller/authController.js";
const userRouter = express.Router();
userRouter.route("/storeOwner/login").post(login);

userRouter.use(protect);
userRouter.route("/updateMypassword").post(updatePassword);

userRouter.use(restrictTo("admin"));
userRouter.route("/storeOwner").get(getAllStoreOwner).post(RegisterStoreOwner);
userRouter
  .route("/storeOwner/:id")
  .patch(UpdateStoreOwner)
  .delete(DeleteStoreOwner)
  .get(getUserById);
userRouter.route("/storeOwner/block/:id").patch(BlockStoreOwner);
userRouter.route("/storeOwner/unblock/:id").patch(UnBlockStoreOwner);

export default userRouter;
