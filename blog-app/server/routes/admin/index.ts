import express, { Request, Response } from "express"
import authenticateJWT from "../../middleware/auth"
import {
  loginAuthor,
  signupAuthor,
  getUser,
  createBlog,
  updateBlog,
  getBlog,
  getBlogs,
	deleteBlog,
} from "../../controllers/Author"

const router = express.Router()

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Admin Listening..." })
})

router.post("/signup", signupAuthor)

router.post("/signin", loginAuthor)

router.get("/me", authenticateJWT, getUser)

router.post("/blogs", authenticateJWT, createBlog)

router.patch("/blogs/:blogId", authenticateJWT, updateBlog)

router.delete("/blogs/:blogId",authenticateJWT,deleteBlog)

router.get("/blogs", authenticateJWT, getBlogs)

router.get("/blogs/:blogId", authenticateJWT, getBlog)

export default router
