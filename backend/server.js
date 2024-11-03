import "dotenv/config"

import express from "express"
import cors from "cors"

const PORT= process.env.PORT || 4000
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import imgaeRouer from "./routes/imageRoute.js"
const app = express()

connectDB()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!")
}   )
app.use('/api/user',userRouter)

app.use('/api/image',imgaeRouer)
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

