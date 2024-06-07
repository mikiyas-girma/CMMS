import { User, StoreOwner, Employee } from "../Models/UserModel.js";
import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError.js";
import multer from "multer";
import sharp from "sharp";
import { Email } from "../utils/Email.js";

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

export const uploadUserPhoto = upload.single("image");

export const resizePhoto = async (req, res, next) => {
  console.log(req.file);
  if (!req.file) return next();
  req.file.filename = `user-${req.user.username}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

export const checkPasswordUpdate = (req, res, next) => {
  // Check if the request body contains password fields
  if (req.body.password || req.body.passwordConfirm) {
    // If not, return an error
    return next(
      new AppError(
        "You are not authorized to update another user's password or this endpoint is not for updating password.",
        403
      )
    );
  }
  next();
};

export const RegisterStoreOwner = asyncHandler(async (req, res, next) => {
  req.body.role = "storeOwner";
  const password = req.body.password;

  const existingUsers = await User.findOne({ email: req.body.email });
  console.log("Found existing users", existingUsers);

  if (existingUsers) {
    return next(new AppError(" This user already exist.", 400));
  }
  const user = await StoreOwner.create(req.body);
  const url = `${req.protocol}://${req.get("host")}/me/${user._id}`;
  try {
    await new Email(user, url).sendWelcome(password);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
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

export const RegisterEmployee = asyncHandler(async (req, res, next) => {
  const existingUsers = await User.findOne({ email: req.body.email });

  if (existingUsers) {
    return next(new AppError(" This user already exist.", 400));
  }
  const password = req.body.password;
  req.body.storeOwner = req.user._id;

  req.body.role = "employee";
  const user = await Employee.create(req.body);
  const url = `${req.protocol}://${req.get("host")}/me/${user._id}`;
  try {
    await new Email(user, url).sendWelcome(password);
  } catch (error) {
    console.log("error", error);

    return next(new AppError(error.message, 500));
  }
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
export const UpdateMe = asyncHandler(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
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
