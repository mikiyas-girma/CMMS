import { AppError } from "./AppError.js";

const handleDuplicateEmailError = (err) => {
  const value = err.keyValue.email;
  const message = `The email address '${value}' is already exist. Please provide a different email.`;
  return new AppError(message, 400);
};
const handleDuplicateNameError = (err) => {
  const value = err.keyValue.name;
  const message = `The material name '${value}' already exists. Please use a different name.`;
  return new AppError(message, 400);
};
const handleDuplicatePhoneError = (err) => {
  const value = err.keyValue.phone;
  const message = `The phone number '${value}' is already exist. Please provide a different phone number.`;
  return new AppError(message, 400);
};

export const ErrorHandler = (err, req, res, next) => {
  console.log("error: ", err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.code === 11000) {
    if (err.keyValue.email) {
      err = handleDuplicateEmailError(err);
    } else if (err.keyValue.name) {
      err = handleDuplicateNameError(err);
    } else if (err.keyValue.phone) {
      err = handleDuplicatePhoneError(err);
    }
  }
  if (err.name === "ValidationError") {
    if (err.errors.role && err.errors.role.kind === "enum") {
      const message = "Please enter only admin, storeOwner, or employee.";
      err = new AppError(message, 400);
    }
  }
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
