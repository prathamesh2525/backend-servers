import mongoose, { Schema, Document } from "mongoose"

export interface IUser {
  email: string
  password: string
}

export interface IUserModel extends IUser, Document {}

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
)

const User = mongoose.model<IUserModel>("User", UserSchema)

export default User
