import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  created: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = model("UserSchema", UserSchema);

export { UserModel };
