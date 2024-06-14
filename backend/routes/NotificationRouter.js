import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// Routes
router.route("/").post(createNotification).get(getAllNotifications);
router.route("/UserId").get(getAllNotifications);

router.route("/:id").get(getNotificationById).delete(deleteNotification);

export default router;
