import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import Blog from "../models/Blog"
import User from "../models/User"

const signupUser = async (req: Request, res: Response) => {
	const {email,password} = req.body
	const user = await User.findOne({email,password})
	if(user){
		res.status(403).json({message:"User already exists."})
	}else{
		const newUser = new User({email,password})
		await newUser.save()
		const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
      expiresIn: "1d",
    })
    res
      .status(200)
      .json({ message: "New User Registered Successfully", token })
	}
}

const signinUser = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email, password: password })
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    })
    res.json({ message: "User Logged in Successfully",token })
  } else {
    res.status(404).json({ message: "Enter Valid email and password." })
  }
}

const getBlogs = async(req:Request,res:Response)=>{
	const blogs = await Blog.find({})
	res.json({blogs})
}

const getBlog = async(req:Request,res:Response)=>{
	const blogId = req.params.blogId
	const blog = await Blog.findById(blogId)
	res.json({blog})
}

const getUser = async (req: Request, res: Response) => {
  const userId = req.headers["userId"]
  const user = await User.findOne({ _id: userId })
  if (user) {
    res.json({ email: user.email })
  } else {
    res.status(403).json({ message: "User not logged in" })
  }
}

export {signupUser,signinUser,getBlog,getBlogs,getUser}