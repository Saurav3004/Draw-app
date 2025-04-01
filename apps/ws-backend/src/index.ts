import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "@repo/backend-common/config";


const wss = new WebSocketServer({port:8080});

wss.on("connection",(ws,request) => {
    const url = request.url;
    if(!url){
        return;
    }

    const getParams = new URLSearchParams(url.split("?")[1]);
    const token = getParams.get('token') || "";

    const decoded = jwt.verify(token,JWT_SECRET_KEY)

    if(typeof decoded == "string"){
        ws.close()
        return;
    }

    if(!decoded || !decoded.userId){
        ws.close();
        return;
    }

})