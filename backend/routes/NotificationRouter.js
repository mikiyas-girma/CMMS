import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  deleteNotification,
  markAsViewed,
  markAsRead,
} from "../Controller/NotificationController.js";

const Notificationrouter = express.Router();

// Routes
Notificationrouter.use(protect);
Notificationrouter.route("/").post(createNotification);
Notificationrouter.route("/user/:userId").get(getAllNotifications);
Notificationrouter.route("/markAsViewed").post(markAsViewed);
Notificationrouter.route("/markAsRead").post(markAsRead);

Notificationrouter.route("/:id")
  .get(getNotificationById)
  .delete(deleteNotification);

export default Notificationrouter;
