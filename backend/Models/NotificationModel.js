import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  receiverIds: {
    type: [String],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
