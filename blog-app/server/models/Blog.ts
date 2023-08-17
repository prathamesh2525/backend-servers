import mongoose, { Schema, Document } from "mongoose"

export interface IBlogPost {
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
}

export interface IBlogModel extends IBlogPost, Document {}

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
)

const Blog = mongoose.model<IBlogModel>("Blog", BlogSchema)

export default Blog
