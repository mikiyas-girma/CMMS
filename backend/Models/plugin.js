import bcrypt from "bcryptjs";

const passwordPlugin = function (schema, options) {
  schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  });
};

export default passwordPlugin;
