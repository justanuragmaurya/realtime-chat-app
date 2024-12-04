import { WebSocketServer } from "ws";
import WebSocket from "ws";

const wss = new WebSocketServer({port : 8080}) 

wss.on("connection",(ws:WebSocket)=>{
    ws.on("message",(data)=>{
        ws.send(data.toString());
    })
})
