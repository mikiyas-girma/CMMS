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
  }).sort({ createdAt: -1 });

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
export const markAsViewed = asyncHandler(async (req, res, next) => {
  const { userId, notificationIds } = req.body;

  const notifications = await Notification.updateMany(
    { _id: { $in: notificationIds }, viewedBy: { $ne: userId } },
    { $addToSet: { viewedBy: userId } }
  );

  if (notifications.nModified === 0) {
    return next(new AppError("No notifications found with those IDs", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Notifications marked as viewed",
  });
});

export const markAsRead = asyncHandler(async (req, res, next) => {
  const { userId, notificationIds } = req.body;

  const notifications = await Notification.updateMany(
    { _id: { $in: notificationIds }, readBy: { $ne: userId } },
    { $addToSet: { readBy: userId } }
  );

  if (notifications.nModified === 0) {
    return next(new AppError("No notifications found with those IDs", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Notifications marked as read",
  });
});
export const NotReadNotification = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const notifications = await Notification.find({ readBy: { $ne: userId } });

  if (notifications || notifications.length > 0) {
    res.status(200).json({
      status: "success",
      data: {
        notifications,
      },
    });
  }
});

export const NotViwedNotification = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const notifications = await Notification.find({ viewedBy: { $ne: userId } });

  if (notifications || notifications.length > 0) {
    res.status(200).json({
      status: "success",
      results: notifications.length,

      data: {
        notifications,
      },
    });
  }
});
