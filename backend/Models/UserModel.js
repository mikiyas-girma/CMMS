import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
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
  username: {
    type: String,
    required: true,
    unique: true,
  },
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
  image: String,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

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
  })
);

export { User, StoreOwner, Employee };
