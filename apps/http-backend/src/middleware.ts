import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";

export function middleware(req:Request,res:Response,next:NextFunction) {
    try {
        const token = req.headers["authorization"] ?? "";
        const decoded = jwt.verify(token,JWT_SECRET_KEY)
        if(decoded){
            //@ts-ignore
            req.userId = decoded
            
            next()
        }
    } catch (error) {
    
            res.status(411).json({
                message: "Unauthorized"
            })
        
    }
}