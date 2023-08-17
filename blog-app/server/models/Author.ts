import mongoose, { Schema, Document } from "mongoose"

export interface IAuthor {
  email: string
  password: string
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
)

const Author = mongoose.model<IAuthorModel>("Author", AuthorSchema)

export default Author
