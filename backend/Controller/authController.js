import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError.js";
import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  // 3) If everything ok, send token to client
  const user = await User.findOne({ email }).select("+password");

  const correct = await user.correctPassword(password, user.password);
  if (!user || !correct) {
    return next(new AppError("Incorrect email or password", 401));
  }
  createSendToken(user, 200, res);
});
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log("req", req);

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log("Token:", req.cookies.jwt);

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access.", 401)
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // const decoded = await jwt.verify(
  //   token,
  //   process.env.JWT_SECRET,
  //   (err, decoded) => {
  //     if (err) {
  //       return next(new AppError("Token is not valid", 403));
  //     }
  //     console.log("decode", decoded);
  //   }
  // );

  // Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  // Check if user account is active
  if (!freshUser.status === "active") {
    return next(
      new AppError("The user account is disabled. Please contact support.", 403)
    );
  }

  // Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "The user recently changed the password. Please log in again.",
        401
      )
    );
  }

  // Grant access to protected route
  req.user = freshUser;
  next();
});
