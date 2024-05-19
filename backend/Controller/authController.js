import asyncHandler from "express-async-handler";
import { AppError } from "../utils/AppError.js";
import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
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
