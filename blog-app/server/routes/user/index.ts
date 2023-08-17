import express from "express"
import authenticateJWT from "../../middleware/auth"
import { getBlog, getBlogs, signinUser, signupUser } from "../../controllers/User"

const router = express.Router()

router.post("/signup",signupUser)
router.post("/signin",signinUser)
router.get("/blogs",authenticateJWT,getBlogs)
router.get("/blogs/:blogId",authenticateJWT,getBlog)


export default router
