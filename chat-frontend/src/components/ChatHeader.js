import React from "react";

function ChatHeader({ onAudioCall, onVideoCall }) {
  return (
    <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3 border-0 rounded-top-3">
      <div className="d-flex align-items-center">
       
        <div className="bg-success rounded-circle me-2" style={{ width: "10px", height: "10px" }}></div>
        <h5 className="mb-0 fw-bold" style={{ fontSize: "1.1rem" }}>💬 Support Chat Room</h5>
      </div>
      
      <div className="d-flex gap-1">
        
        <button 
          onClick={onAudioCall} 
          className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm" 
          style={{ width: "38px", height: "38px", fontSize: "1.1rem" }}
          title="Audio Call"
        >
          📞
        </button>
        
      
        <button 
          onClick={onVideoCall} 
          className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center p-0 shadow-sm" 
          style={{ width: "38px", height: "38px", fontSize: "1.1rem" }}
          title="Video Call"
        >
          📹
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;