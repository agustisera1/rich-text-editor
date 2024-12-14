import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  created: { type: Date, default: Date.now },
});

const UserModel = model("UserSchema", UserSchema);

export { UserModel };
