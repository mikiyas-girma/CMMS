import mongoose from "mongoose";
import { User } from "./UserModel.js";
const materialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Material name is required"],
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    totalQuantity: {
      type: Number,
      default: 0,
      min: [0, "Total quantity must be a positive number"],
    },
    minthreshold: {
      type: Number,
      default: 5,
      min: [0, "Treshold must be a positive number"],
    },
    weight: {
      type: Number,
      default: 0,
      min: [0, "Weight must be a positive number"],
    },

    receiverIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    image: {
      type: String,
      required: [true, "Material image is required"],
    },
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

export default Material;
