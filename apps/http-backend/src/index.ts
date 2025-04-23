import express from 'express'
import jwt from "jsonwebtoken"
import { middleware } from './middleware'
import { JWT_SECRET_KEY } from '@repo/backend-common/config'
import {CreateRoomSchema, CreateUserSchema, SignInSchema} from '@repo/common/types'
import { prismaClient } from '@repo/db/client'
import bcryptjs from 'bcryptjs'

const app = express()
app.use(express.json())


app.post("/signup",async (req,res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    
    if(!parsedData.success){
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
 
  try {
    const hashedPassword = await bcryptjs.hash(parsedData.data.password,10);
   const user = await prismaClient.user.create({
      data:{
          email: parsedData.data.email,
          name: parsedData.data.name,
          password: hashedPassword
      }
     })
      res.json({
          userdId: user
      })
  } catch (error) {
    res.status(411).json({
        message: "Account already exists with this email"
    })
  }
    
})

app.get("/signin",async (req,res) => {
    try {
        const parsedData = SignInSchema.safeParse(req.body);
        if(!parsedData.data){
            res.status(411).json({
                message: "All fields required"
            })
            return;
        }
        
        const userExists = await prismaClient.user.findFirst({
            where:{
                email: parsedData.data.email 
            }
        })
        if(!userExists){
            res.status(411).json({
                message: "No user exists with this email"
            })
            return;
        }
        // @ts-ignore 
        const verifyPassword = await bcryptjs.compare(parsedData.data.password,userExists.password)
        if(verifyPassword){
            const token = jwt.sign(userExists.id,JWT_SECRET_KEY)
            res.status(200).json({
                message: "Login successfully",
                token
            })

        }else{
            res.status(411).json({
                message: "Wrong password or email"
            })
            return ;
        }
        
    
        
    } catch (error) {
        console.log(error)
    }
})

app.post("/room",middleware,async (req,res) => {
    
        const parsedData = CreateRoomSchema.safeParse(req.body);
        if(!parsedData.data){
            res.status(411).json({
                message: "Room name is required"
            })
            return;
        }
        
        try {
            // @ts-ignore 
        const userId = req.userId
        console.log(userId)
            const room = await prismaClient.room.create({
                data:{
                    slug: parsedData.data.name,
                    adminId: userId
                }
            })
    
            res.status(200).json({
                room
            })
        
        }
     catch (error) {
       res.status(500).json({
        message: "Room already exists with this name.try another name"
       })
    }

   
})

app.get("/chats/:roomId",async (req,res) => {
    const roomId = Number(req.params.roomId)
    const messages = await prismaClient.chat.findMany({
        where:{
            roomId: roomId
        },
        orderBy:{
            id: "desc"
        },
        take:20
    })

    res.json({
        messages
    })
})

app.get("/room/:slug",async (req,res) => {
    const slug = req.params.slug
    const room = await prismaClient.room.findFirst({
        where:{
            slug: slug
        }
    })

    res.json({
        room
    })
})



app.listen(5000)