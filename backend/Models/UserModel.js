import mongoose from "mongoose";
import validator from "validator";
import passwordPlugin from "./plugin.js";

const userSchema = new mongoose.Schema(
  {
    Fname: {
      type: String,
      required: true,
    },
    Lname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    // username: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    role: {
      type: String,
      required: [true, "please enter user role"],
      enum: ["admin", "storeOwner", "employee"],
    },
    image: {
      type: String,
      default: "defaultUser.png",
    },
    passwordChangedAt: Date,
    passwordResetExpires: Date,
    passwordResetToken: String,
  },
  { timestamps: true }
);
userSchema.plugin(passwordPlugin);

const User = mongoose.model("User", userSchema);
const StoreOwner = User.discriminator(
  "StoreOwner",
  new mongoose.Schema({
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    phone: {
      type: String,
      required: true,
    },
  })
);
const Employee = User.discriminator(
  "Employee",
  new mongoose.Schema({
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    storeOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StoreOwner",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  })
);

export { User, StoreOwner, Employee };
