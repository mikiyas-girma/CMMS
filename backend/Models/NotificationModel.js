import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    receiverIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    text: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
