import "dotenv/config"

import express from "express"
import cors from "cors"

const PORT= process.env.PORT || 4000
import connectDB from "./config/db.js"
const app = express()

connectDB()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello World!")
}   )

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

