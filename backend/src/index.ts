import { WebSocketServer } from "ws";
import WebSocket from "ws";

let userCount = 0 ;
let allSocket:WebSocket[] = [];
const wss = new WebSocketServer({port : 8080}) 

wss.on("connection",(ws:WebSocket)=>{
    userCount++ ;
    console.log(userCount)
    allSocket.push(ws);
    ws.on("message",(data)=>{
        allSocket.map((wsss)=>{
            wsss.send(data.toString())
        }
    )})
    
    ws.on("close",()=>{
        userCount--;
        console.log(userCount)  
        allSocket = allSocket.filter(x => x !== ws);
    })
})
