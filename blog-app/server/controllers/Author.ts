import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import Author from "../models/Author"
import Blog from "../models/Blog"

const signupAuthor = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const author = await Author.findOne({ email, password })
  if (author) {
    res
      .status(403)
      .json({ message: "Author Already exists. Login In to proceed." })
  } else {
    const newAuthor = new Author({ email: email, password: password })
    await newAuthor.save()
    const token = jwt.sign({ id: newAuthor._id }, process.env.SECRET, {
      expiresIn: "1d",
    })
    res
      .status(200)
      .json({ message: "New Author Registered Successfully", token })
  }
}

const loginAuthor = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const author = await Author.findOne({ email: email, password: password })
  if (author) {
    const token = jwt.sign({ id: author._id }, process.env.SECRET, {
      expiresIn: "1d",
    })
    res.json({ message: "Author Logged in Successfully",token })
  } else {
    res.status(404).json({ message: "Enter Valid email and password." })
  }
}

const getUser = async (req: Request, res: Response) => {
  const userId = req.headers["userId"]
  const user = await Author.findOne({ _id: userId })
  if (user) {
    res.json({ email: user.email })
  } else {
    res.status(403).json({ message: "User not logged in" })
  }
}

const createBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body
  const newBlog = new Blog({
    title: title,
    content: content,
    author: req.headers.userId,
  })
  await newBlog.save()
  res.status(201).json({ message: "New Blog created" })
}

const updateBlog = async (req: Request, res: Response) => {
  const blogId = req.params.blogId
  const userId = req.headers["userId"]
  const blog = await Blog.findOneAndUpdate(
    { _id: blogId, author: userId },
    req.body
  )
  if (blog) {
    res.json({ message: "Blog updated successfully" })
  } else {
    res.status(404).json({ message: "Blog not found" })
  }
}

const getBlogs = async (req: Request, res: Response) => {
  const userId = req.headers["userId"]
  const blogs = await Blog.find({ author: userId })
  res.json(blogs)
}

const getBlog = async (req: Request, res: Response) => {
  const blogId = req.params.blogId
  const userId = req.headers["userId"]
  const blog = await Blog.findOne({ _id: blogId, author: userId })
  if (!blog) {
    return res.status(404).json({ message: "BLog not found" })
  } else {
    res.json(blog)
  }
}

export {
  signupAuthor,
  loginAuthor,
  getUser,
  createBlog,
  updateBlog,
  getBlog,
  getBlogs,
}

// function insertPosts() {
//   Blog.insertMany([
//     {
//       title: "Learn SQL Commands",
//       content:
//         "Learn basic to advanced SQL queries in this blog. Make sure you practice them at your end.",
//       author: "Prathamesh Madniwale",
//       createdAt: "16/08/23 ",
//     },
//     {
//       title: "Learn Linux Commands",
//       content:
//         "Learn basic to advanced Linux in this blog. Make sure you practice them at your end.",
//       author: "Prathamesh Madniwale",
//       createdAt: "15/08/23 ",
//     },
//     {
//       title: "Learn NodeJS Basics",
//       content:
//         "Learn basics of NodeJS in this blog. We will cover nodejs architecture and some nodejs internal packages. Make sure you practice them at your end.",
//       author: "Prathamesh Madniwale",
//       createdAt: " 14/08/23 ",
//     },
//   ])
// }

// insertPosts()
