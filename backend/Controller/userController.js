import { User, StoreOwner, Employee } from "../Models/UserModel.js";

export const RegisterStoreOwner = async (req, res) => {
  req.body.role = "storeOwner";
  try {
    const user = await StoreOwner.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
export const getAllStoreOwner = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "success",
      results: user.length,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
export const UpdateStoreOwner = async (req, res, next) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
export const DeleteStoreOwner = async (req, res) => {
  try {
    const user = await StoreOwner.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        message: "User deleted Successfully",
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
