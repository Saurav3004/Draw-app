import express from 'express'
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from './config'
import { middleware } from './middleware'
const app = express()



app.post("/signup",async (req,res) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return console.log("all fields required")
    }
    
})

app.post("/signin",(req,res) => {
    const userId = 1;
    const token = jwt.sign({userId},JWT_SECRET_KEY)

    res.json({
        token
    })
})

app.post("/create-room",middleware,(req,res) => {
    //db-call

    res.json({
        roomId:123
    })
})