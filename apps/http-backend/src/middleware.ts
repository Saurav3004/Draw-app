import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@repo/backend-common/config";

export function middleware(req:Request,res:Response,next:NextFunction) {
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token,JWT_SECRET_KEY)
    
    if(!decoded){
        res.status(403).json({
            message: "you are not authenticated"
        })
    }else{
        //@ts-ignore
        req.userId = decoded.userId
    }
}