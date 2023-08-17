import "dotenv/config"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRouter from "./routes/user/index"
import adminRouter from "./routes/admin/index"
import Logging from "./library/Logging"

const app = express()
const PORT = 5000 || process.env.PORT

mongoose
  .connect(
process.env.MONGODB_URI,
    { retryWrites: true }
  )
  .then(() => {
    Logging.info("Connected to MongoDB...")
  })
  .catch((err) => {
    Logging.error("Unable to Connect: ")
    Logging.error(err)
  })

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", userRouter)
app.use("/admin", adminRouter)

app.listen(PORT, () => {
  console.log(`App Listening on port http://localhost:${PORT}`)
})
