import express from 'express'
import jwt from "jsonwebtoken"
import { middleware } from './middleware'
import { JWT_SECRET_KEY } from '@repo/backend-common/config'
import {CreateUserSchema} from '@repo/common/types'

const app = express()



app.post("/signup",async (req,res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    res.json({
        userdId: "123"
    })
    
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