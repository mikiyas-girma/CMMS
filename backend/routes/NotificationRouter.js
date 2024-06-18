import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  deleteNotification,
  markAsViewed,
  markAsRead,
  NotReadNotification,
  NotViwedNotification,
} from "../Controller/NotificationController.js";
import { protect } from "../Controller/authController.js";

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
Notificationrouter.get("/not-read/:userId", NotReadNotification);
Notificationrouter.get("/not-viewed/:userId", NotViwedNotification);

export default Notificationrouter;
