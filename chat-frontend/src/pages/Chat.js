import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatBox from "../components/ChatBox";
import MessageInput from "../components/MessageInput";
import socket from "../services/socket";
import axios from "axios";

// Using a unique session ID to identify the tab
const sessionStorageId = "user_" + Math.random().toString(36).substring(2, 9);

function Chat() {
  const [search, setSearch] = useState(""); 
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "System",
      senderName: "Support",
      text: "Hello 👋 Welcome to Real-Time Support Chat.",
      time: "10:00 AM",
    },
  ]);

  const [isCalling, setIsCalling] = useState(false);
  const [callType, setCallType] = useState(""); 
  const [currentAudio, setCurrentAudio] = useState(null); 

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => {
        if (prev.some((msg) => msg.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    socket.on("incomingCall", (data) => {
      setCallType(data.type);
      setIsCalling(true);
      // Ensure ringtone.mp3 exists in public folder
      const audio = new Audio("/ringtone.mp3");
      audio.loop = true;
      audio.play().catch((err) => console.log("Audio playback blocked:", err));
      setCurrentAudio(audio);
    });

    socket.on("callEnded", () => {
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      setIsCalling(false);
      setCallType("");
      setCurrentAudio(null);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("incomingCall");
      socket.off("callEnded");
    };
  }, [currentAudio]);

  // FIXED: Arguments added to startCall and endCall
  const startCall = (type) => {
    setCallType(type);
    setIsCalling(true);
    // Emitting call event
    socket.emit("startCall", { type: type, sender: search || "You" });
  };

  const endCall = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setIsCalling(false);
    setCallType("");
    setCurrentAudio(null);
    socket.emit("endCall");
  };

  const handleSend = async (text, file) => {
    const timeString = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMessage = { 
      id: Date.now(), 
      mySessionId: sessionStorageId, 
      senderName: search.trim() ? search : "You", 
      text: text, 
      time: timeString 
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("sendMessage", newMessage);
  };

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar search={search} setSearch={setSearch} />
        <div className="flex-grow-1 p-3">
          <div className="card shadow position-relative">
            <ChatHeader onAudioCall={() => startCall("Audio")} onVideoCall={() => startCall("Video")} />
            <ChatBox messages={messages} currentSessionId={sessionStorageId} />
            <MessageInput onSend={handleSend} />

            {isCalling && (
              <div className="position-absolute w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white rounded" style={{ top: 0, left: 0, zIndex: 100, opacity: 0.95 }}>
                <div className="text-center">
                  <h4 className="fw-bold mb-1">{callType} Calling...</h4>
                  <button onClick={endCall} className="btn btn-danger btn-lg rounded-circle mt-4 p-3 px-4 shadow">❌ End Call</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;