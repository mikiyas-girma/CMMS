import express from "express";
import {
  RegisterStoreOwner,
  getAllStoreOwner,
  UpdateStoreOwner,
  BlockStoreOwner,
  UnBlockStoreOwner,
  DeleteStoreOwner,
  getUserById,
  RegisterEmployee,
  getAllEmployee,
  uploadUserPhoto,
  checkPasswordUpdate,
  resizePhoto,
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

userRouter
  .route("/storeOwner")
  .get(restrictTo("admin"), getAllStoreOwner)
  .post(restrictTo("admin"), RegisterStoreOwner);
userRouter
  .route("/storeOwner/:id")
  .patch(restrictTo("admin"), checkPasswordUpdate, UpdateStoreOwner)
  .delete(restrictTo("admin"), DeleteStoreOwner)
  .get(restrictTo("admin"), getUserById);
userRouter
  .route("/storeOwner/block/:id")
  .patch(restrictTo("admin"), checkPasswordUpdate, BlockStoreOwner);
userRouter
  .route("/storeOwner/unblock/:id")
  .patch(restrictTo("admin"), checkPasswordUpdate, UnBlockStoreOwner);

//employee
userRouter
  .route("/employee")
  .get(restrictTo("storeOwner"), getAllEmployee)
  .post(restrictTo("storeOwner"), RegisterEmployee);

export default userRouter;
