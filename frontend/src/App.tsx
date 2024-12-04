import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currentMsg , setCM] = useState<any>();
  const [ws,setWs] = useState<WebSocket | null>(null)
  const [msgs,setMsg] = useState<string[]>([]);
  useEffect(()=>{
    const ws = new WebSocket("http://localhost:8080")
    setWs(ws)
    ws.onmessage = (e)=>{
      setMsg(prev=>[...prev,e.data])
    }
  },[])

  function sendMsg(){
    if(!ws){
      return
    }
      ws.send(currentMsg);
  }

  return (
    <div className='flex flex-col items-center h-screen bg-[#0e0e0e] w-screen text-white p-10'> 
      <div className='flex flex-col items-center'>
        <h3 className='text-3xl font-semibold'>Temp</h3>
        <h2 className='text-7xl font-bold m-5'><span className='bg-red-500 px-2'>Chat</span> App</h2>
      </div>
      <div className=' flex justify-center mt-5 w-screen'>
        <div className='flex gap-3'>
          <input type="text " className='px-5 py-3 border-[#4e4e4e] border-[1px] rounded-md  bg-[#0e0e0e]' onChange={(e)=>{setCM(e.target.value)}}/>
          <button className='border-[#4e4e4e] border-[1px] rounded-md px-5' onClick={sendMsg}>Send message !</button>
        </div>
      </div>
      <div>
        <h2>Messages : </h2>
        <div className='flex flex-col'>
          {msgs.map((e)=>{
            return(<ul>
              {e}
            </ul>)
          })}
        </div>
      </div>
     
    </div>
  )
}

export default App
