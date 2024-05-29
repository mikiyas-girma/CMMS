import mongoose from "mongoose";

const QuantityChangeSchema = new mongoose.Schema(
  {
    material: {
      type: mongoose.Schema.ObjectId,
      ref: "Material",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    changeType: {
      type: String,
      required: true,
      enum: ["add", "withdraw"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const QuantityChange = mongoose.model("QuantityChange", QuantityChangeSchema);

export default QuantityChange;
