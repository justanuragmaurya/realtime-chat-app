import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [roomid , setRoom] = useState<any>();
  const [ws,setWs] = useState<WebSocket | null>(null)
  const [msgs,setMsg] = useState<string[]>([]);
  const [currentMsg, setCMsg] = useState<string>("");
  useEffect(()=>{
    const ws = new WebSocket("http://localhost:8080")
    setWs(ws)
    ws.onmessage = (e)=>{
      setMsg(prev=>[...prev,e.data])
    }
  },[])

  function sendMsg(){
    if(!ws){
      return;
    }
    console.log(11111)
    ws.send(
      JSON.stringify({
          type:"chat",
          payload:{
            message: currentMsg
          }
        })
    )
    setCMsg("");
    console.log("message sent")
  }

  function createRoom(){
    const chars = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    let id = ""
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length); // Generate a random index
      id += chars[randomIndex]; // Append the random character to the ID
    }
    console.log(id);
  } 

  function joinRoom(){
    if(!ws){
      return;
    }
    const message = {
      type: "join",
      payload:{
        roomid: roomid
      }
    }
    ws.send(JSON.stringify(message))
  }

  return (
    <>
    <div className='flex flex-col  items-center bg-[#0e0e0e] w-screen text-white p-10'> 
      <div className='flex flex-col items-center'>
        <h3 className='text-3xl font-semibold'>Temp</h3>
        <h2 className='text-7xl font-bold m-5'><span className='bg-red-500 px-2'>Chat</span> App</h2>
      </div>
      <div className=' flex flex-col justify-center w-1/2 gap-3 mt-48'>
      <input type="text " className='my-5 px-5 py-3 w-full border-[#4e4e4e] border-[1px] rounded-md  bg-[#0e0e0e] ' placeholder='Enter Your name' onChange={(e)=>{console.log(e.target.value)}}/>
      <div className='w-full flex gap-2'>
        <input type="text " className='px-5 py-3 w-5/6 border-[#4e4e4e] border-[1px] rounded-md  bg-[#0e0e0e] text-center' placeholder='Enter the room id' onChange={(e)=>{setRoom(e.target.value)}}/>
        <button className='border-[#4e4e4e] w-1/6 border-[1px] rounded-md px-5 py-3' onClick={joinRoom}>Join Room </button>
        </div>
        <center><p>- or - </p></center>
        <button className='border-[#4e4e4e] border-[1px] rounded-md px-5 py-3' onClick={createRoom}>Create Room </button>
      </div>
    </div>
    <div id="chatting" className='h-screen bg-[#0e0e0e] w-screen flex flex-col justify-between p-5 text-white items-center'> 
      <div className='flex overflow-scroll flex-col w-1/2 screen m-5 p-5 gap-3'>
        {msgs.map((e)=>{
          return(
            <div className='p-3 bg-[#0e0e0e] border-[#3e3e3e] border-[1px] w-max rounded-md'>
              {e}
            </div>
          )
        })}
      </div>
      <div className='flex gap-3 items-center justify-center w-1/2'>
        <input type="text " className='px-5 py-3 w-full  border-[#4e4e4e] border-[1px] rounded-md  bg-[#0e0e0e] ' placeholder='Enter message here ... ' value={currentMsg} onChange={(e)=>{setCMsg(e.target.value)}}/>
        <button className='border-[#4e4e4e] border-[1px] rounded-md px-5 py-3' onClick={sendMsg}>Send</button>
      </div>
    </div>
    </>
  )
}

export default App
