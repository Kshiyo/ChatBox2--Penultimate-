import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

//(err,req,res,next)

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) //getting info from forms
app.use(express.urlencoded({extended: true , limit: "16kb"})) //getting info from urls
app.use(express.static("public"))//making public asset to store any file or something
app.use(cookieParser())//performing curd ops on cookies

//routes

import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users",userRouter)

// http://localhost:8000/api/v1/users/register




export { app }