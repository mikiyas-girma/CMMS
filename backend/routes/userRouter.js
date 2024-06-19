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
  UpdateMe,
  getme,
  UpdateEmployee,
  DeleteEmployee,
  BlockEmployee,
  UnBlockEmployee,
} from "../Controller/userController.js";
import {
  login,
  protect,
  updatePassword,
  restrictTo,
  forgotPassword,
  clearCookie,
  getStatus,
} from "../Controller/authController.js";
const userRouter = express.Router();
userRouter.route("/login").post(login);
userRouter.route("/forgotPassword").post(forgotPassword);
userRouter.route("/resetPassword/:token").patch(resetPassword);

// userRouter.get("/auth-status", getStatus);

userRouter.use(protect);
userRouter.get("/deleteCookies/:name", clearCookie);
userRouter.route("/updateMypassword").post(updatePassword);
userRouter.route("/me").get(getme, getUserById);

userRouter
  .route("/updateMe")
  .patch(checkPasswordUpdate, uploadUserPhoto, resizePhoto, UpdateMe);

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

userRouter
  .route("/employee/:id")
  .patch(restrictTo("storeOwner"), checkPasswordUpdate, UpdateEmployee)
  .delete(restrictTo("storeOwner"), DeleteEmployee)
  .get(restrictTo("storeOwner"), getUserById);
userRouter
  .route("/employee/block/:id")
  .patch(restrictTo("storeOwner"), checkPasswordUpdate, BlockEmployee);
userRouter
  .route("/employee/unblock/:id")
  .patch(restrictTo("storeOwner"), checkPasswordUpdate, UnBlockEmployee);

export default userRouter;
