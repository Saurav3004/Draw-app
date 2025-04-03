import express from 'express'
import jwt from "jsonwebtoken"
import { middleware } from './middleware'
import { JWT_SECRET_KEY } from '@repo/backend-common/config'
import {CreateUserSchema} from '@repo/common/types'
import { prismaClient } from '@repo/db/client'

const app = express()



app.post("/signup",async (req,res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }

  try {
    await prismaClient.user.create({
      data:{
          email: parsedData.data.email,
          name: parsedData.data.name,
          password: parsedData.data.password
      }
     })
      res.json({
          userdId: "123"
      })
  } catch (error) {
    res.status(411).json({
        message: "Account already exists with this email"
    })
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

app.listen(5000)