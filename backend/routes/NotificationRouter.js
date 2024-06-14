import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  deleteNotification,
} from "../Controller/NotificationController.js";

const Notificationrouter = express.Router();

// Routes
Notificationrouter.route("/").post(createNotification);
Notificationrouter.route("/user/:userId").get(getAllNotifications);

Notificationrouter.route("/:id")
  .get(getNotificationById)
  .delete(deleteNotification);

export default Notificationrouter;
