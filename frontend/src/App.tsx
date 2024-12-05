import { useEffect, useState } from "react";
import {Bounce, toast} from "react-toastify"
import "./App.css";

function App() {
  const [coonected, setCon] = useState(false);
  const [roomid, setRoom] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [msgs, setMsg] = useState<Messages[]>([]);
  const [currentMsg, setCMsg] = useState<string>("");

  interface Messages {
    name: string;
    message: string;
  }

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    setWs(ws);
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMsg((prev) => [...prev, data]);
    };
  }, []);

  function sendMsg() {
    if (!ws) {
      return;
    }
    console.log(11111);
    ws.send(
      JSON.stringify({
        type: "chat",
        payload: {
          name: username,
          message: currentMsg,
        },
      })
    );
    setCMsg("");
    console.log("message sent");
  }

  function createRoom() {
    const chars = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];

    let id = "";

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length); // Generate a random index
      id += chars[randomIndex]; // Append the random character to the ID
    }
    joinRoom(id);
  }

  function joinRoom(roomidd: string | undefined = undefined) {
    if (!ws) {
      return;
    }
    const message = {
      type: "join",
      payload: {
        roomid: roomidd ? roomidd : roomid,
      },
    };
    setCon(true);
    localStorage.setItem("roomid", roomidd ? roomidd : roomid);
    localStorage.setItem("name",username);
    ws.send(JSON.stringify(message));
    toast.success('Room joined, Room ID: ' + localStorage.getItem("roomid"), {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: 0,
      theme: "light",
      transition: Bounce,
      });
  }

  return (
    <>
      {!coonected ? (
        <div className="flex flex-col h-screen  items-center bg-[#0e0e0e] w-screen text-white p-10">
          <div className="flex flex-col items-center">
            <h3 className="text-3xl font-semibold">Temp</h3>
            <h2 className="text-7xl font-bold m-5">
              <span className="bg-red-500 px-2">Chat</span> App
            </h2>
          </div>
          <div className=" flex flex-col justify-center w-1/2 gap-3 mt-48">
            <input
              type="text "
              className="my-5 px-5 py-3 w-full border-[#4e4e4e] border-[1px] rounded-md  bg-[#0e0e0e] "
              placeholder="Enter Your name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <div className="w-full flex gap-2">
              <input
                type="text "
                className="px-5 py-3 w-5/6 border-[#4e4e4e] border-[1px] rounded-md  bg-[#0e0e0e] text-center"
                placeholder="Enter the room id"
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
              <button
                className="border-[#4e4e4e] w-1/6 border-[1px] rounded-md px-5 py-3"
                onClick={() => joinRoom(roomid)}
              >
                Join Room{" "}
              </button>
            </div>
            <center>
              <p>- or - </p>
            </center>
            <button
              className="border-[#4e4e4e] border-[1px] rounded-md px-5 py-3"
              onClick={createRoom}
            >
              Create Room{" "}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            id="chatting"
            className="h-screen bg-[#0e0e0e] w-screen flex flex-col justify-between p-5 text-white items-center"
          >
            <div className="flex overflow-scroll flex-col w-1/2 screen m-5 p-5 gap-5">
              <div className="py-5 border-[#3e3e3e] border-[1px] px-5 rounded-md w-full flex justify-between items-center">
                <h2>Room ID : {localStorage.getItem("roomid")}</h2>
                <button onClick={()=>{
                  const id = localStorage.getItem("roomid");
                  if(!id){
                    return;
                  }
                   navigator.clipboard.writeText(id)
                   toast.success('Copied to clipboard!', {
                    position: "top-left",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                    theme: "dark",
                    transition: Bounce,
                    });
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                  />
                </svg>
                </button>
              </div>
              {msgs.map((e) => {
                const isUserMessage = localStorage.getItem("name") === e.name;
                return (
                  <div className={`flex flex-col ${isUserMessage ? "items-end" : "items-start"}`}>
                    <div className="text-xs p-1">{e.name}</div>
                    <div className={`p-3 bg-[#0e0e0e] border-[#3e3e3e] border-[1px] w-max rounded-md ${isUserMessage ? "self-end" : "self-start"}`}>
                      {e.message}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 items-center justify-center w-1/2 mb-10">
              <input
                type="text "
                className="px-5 py-3 w-full  border-[#4e4e4e] border-[1px] rounded-md  bg-[#0e0e0e] "
                placeholder="Enter message here ... "
                value={currentMsg}
                onChange={(e) => {
                  setCMsg(e.target.value);
                }}
              />
              <button
                className="border-[#4e4e4e] border-[1px] rounded-md px-5 py-3"
                onClick={sendMsg}
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
