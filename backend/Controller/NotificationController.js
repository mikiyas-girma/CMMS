import { AppError } from "../utils/AppError.js";
import Notification from "../Models/NotificationModel.js";
import asyncHandler from "express-async-handler";
export const createNotification = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const notification = await Notification.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      notification,
    },
  });
});

export const getAllNotifications = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const notifications = await Notification.find({
    receiverIds: { $in: [userId] },
  });

  res.status(200).json({
    status: "success",
    results: notifications.length,
    data: {
      notifications,
    },
  });
});

export const getNotificationById = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new AppError("No notification found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      notification,
    },
  });
});

export const deleteNotification = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);
  if (!notification) {
    return next(new AppError("No notification found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
