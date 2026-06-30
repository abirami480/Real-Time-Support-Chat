import React, { useEffect, useRef } from "react";
import socket from "../services/socket";

function ChatBox({ messages }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="p-3 overflow-auto" style={{ height: "60vh", backgroundColor: "#f8f9fa" }}>
      {messages.map((msg, index) => {
        // Checking if the message is sent by the current active tab socket session
        const isMyMessage = msg.senderId === socket.id;

        return (
          <div
            key={index}
            className={`d-flex ${isMyMessage ? "justify-content-end" : "justify-content-start"} mb-3`}
            ref={scrollRef}
          >
            <div
              className={`p-2 px-3 rounded shadow-sm ${
                isMyMessage ? "bg-primary text-white" : "bg-white text-dark"
              }`}
              style={{ maxWidth: "70%" }}
            >
              {/* Displays the dynamic Sender Name on top of the chat bubble */}
              <div className="fw-bold d-block mb-1" style={{ fontSize: "11px", opacity: 0.9 }}>
                {isMyMessage ? "You" : msg.senderName || "User"}
              </div>

              <div className="small">{msg.text}</div>
              
              <div style={{ fontSize: "9px", opacity: 0.6, textAlign: "right" }} className="mt-1">
                {msg.time}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBox;