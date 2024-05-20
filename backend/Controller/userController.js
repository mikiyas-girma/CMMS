import { User, StoreOwner, Employee } from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError.js";

export const RegisterStoreOwner = asyncHandler(async (req, res) => {
  req.body.role = "storeOwner";
  const user = await StoreOwner.create(req.body);
  res.status(201).json({
    status: "success",
    msg: "user Registered successfully ",
    data: {
      user,
    },
  });
});

export const getAllStoreOwner = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    msg: "users fetched successfully",
    data: {
      users,
    },
  });
});

export const UpdateStoreOwner = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError("This Endpoint is not for updating password", 400)
    );

  const user = await StoreOwner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const BlockStoreOwner = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError("This Endpoint is not for updating password", 400)
    );

  const user = await StoreOwner.findByIdAndUpdate(
    req.params.id,
    { status: "inactive" },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const UnBlockStoreOwner = asyncHandler(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError("This Endpoint is not for updating password", 400)
    );

  const user = await StoreOwner.findByIdAndUpdate(
    req.params.id,
    { status: "active" },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const DeleteStoreOwner = asyncHandler(async (req, res) => {
  const user = await StoreOwner.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: {
      message: "User deleted Successfully",
    },
  });
});

export const updatePassword = asyncHandler(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});

// export const RegisterStoreOwner = async (req, res) => {
//   req.body.role = "storeOwner";
//   try {
//     const user = await StoreOwner.create(req.body);
//     res.status(201).json({
//       status: "success",
//       msg: "user  Registered successfully ",

//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
// export const getAllStoreOwner = async (req, res) => {
//   try {
//     const user = await User.find();
//     res.status(200).json({
//       status: "success",
//       results: user.length,
//       msg: "user  Registered successfully ",

//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
// export const UpdateStoreOwner = async (req, res, next) => {
//   try {
//     if (req.body.password || req.body.passwordConfirm) {
//       throw new Error("This Endpoint is not for updating password ");
//     }
//     const user = await StoreOwner.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
// export const BlockStoreOwner = async (req, res) => {
//   try {
//     if (req.body.password || req.body.passwordConfirm) {
//       throw new Error("This Endpoint is not for updating password ");
//     }
//     const user = await StoreOwner.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: "inactive",
//       },
//       { new: true }
//     );
//     res.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
// export const UnBlockStoreOwner = async (req, res) => {
//   try {
//     if (req.body.password || req.body.passwordConfirm) {
//       throw new Error("This Endpoint is not for updating password ");
//     }
//     const user = await StoreOwner.findByIdAndUpdate(
//       req.params.id,
//       {
//         status: "active",
//       },
//       { new: true, runValidators: true }
//     );
//     res.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
// export const DeleteStoreOwner = async (req, res) => {
//   try {
//     const user = await StoreOwner.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: "success",
//       data: {
//         message: "User deleted Successfully",
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: "fail",
//       message: err.message,
//     });
//   }
// };
