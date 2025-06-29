import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser } from "./user.interfaces";
import config from "../../config/config";

export const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 50,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, select: 0 },
    photoURL: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password!, Number(config.bcrypt_salt));
  next();
});

export const UserModel = model<TUser>("User", userSchema);
