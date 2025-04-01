import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "./config";


const wss = new WebSocketServer({port:8080});

wss.on("connection",(ws,request) => {
    const url = request.url;
    if(!url){
        return;
    }

    const getParams = new URLSearchParams(url.split("?")[1]);
    const token = getParams.get('token') || "";

    const decoded = jwt.verify(token,JWT_SECRET_KEY)

    if(!decoded){
        ws.close();
        return;
    }

})