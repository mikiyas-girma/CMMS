import mongoose from "mongoose";
import { User } from "./UserModel.js";
const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Material name is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    totalQuantity: {
      type: Number,
      min: [0, "Total quantity must be a positive number"],
    },
    addedQuantity: {
      type: Number,
      default: 0,
      min: [0, "Added quantity must be a positive number"],
    },
    removedQuantity: {
      type: Number,
      default: 0,
      min: [0, "Removed quantity must be a positive number"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

export default Material;
