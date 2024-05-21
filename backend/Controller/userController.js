import { User, StoreOwner, Employee } from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError.js";
import multer from "multer";

// updatePassword iddlware can update only  the pasword and passwordconfirm if othres also paassed thay can't be updated
// export const checkStatusChangePermission = (req, res, next) => {
//   if (req.body.status) {
//     return next(
//       new AppError("You can't update status, you have no permission", 403)
//     );
//   }
//   next();
// };
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an image Please upload only image", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

export const uploadUserPhoto = upload.single("photo");

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
export const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({
    status: "success",
    msg: "User fetched successfully",
    data: {
      user,
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

//employee

export const RegisterEmployee = asyncHandler(async (req, res) => {
  req.body.role = "employee";
  const user = await Employee.create(req.body);
  res.status(201).json({
    status: "success",
    msg: "user Registered successfully ",
    data: {
      user,
    },
  });
});

export const getAllEmployee = asyncHandler(async (req, res) => {
  const users = await Employee.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    msg: "users fetched successfully",
    data: {
      users,
    },
  });
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
