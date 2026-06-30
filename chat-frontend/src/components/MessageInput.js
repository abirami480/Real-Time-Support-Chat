import { useState } from "react";

function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null); 
  const [showEmojis, setShowEmojis] = useState(false); 

  const emojiCategories = {
    Smilies: ["😊", "😂", "🤣", "😁", "😉", "😎", "😍", "🥰", "🥳", "🤩", "😜", "🙄", "😴", "😭", "😱", "😡", "🤔", "🤫"],
    Hands: ["👍", "👎", "👌", "👊", "✊", "✌️", "🤞", "🤟", "👋", "👏", "🙌", "🙏", "🤝", "✍️"],
    Hearts: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "💖", "💘", "💝", "💔", "🔥", "✨"],
    Fun: ["🎉", "🎊", "🎂", "🎈", "🎁", "🏆", "🌟", "⭐", "💯", "🚀", "💻", "📱", "🎧", "🎮", "⚽"]
  };

  const handleSend = () => {
    if (text.trim() === "" && !file) return;

    onSend(text, file);
    
    setText("");
    setFile(null); 
    setShowEmojis(false); 
  };

  const handleEmojiClick = (emoji) => {
    setText((prevText) => prevText + emoji);
  };

  return (
    <div className="card-footer bg-white p-3 position-relative">
      
     
      {showEmojis && (
        <div 
          className="position-absolute bg-white border rounded-4 shadow-lg p-3"
          style={{ 
            bottom: "75px", 
            left: "15px", 
            width: "320px", 
            maxHeight: "280px", 
            overflowY: "auto", 
            zIndex: 10,
            scrollbarWidth: "thin"
          }}
        >
          {Object.keys(emojiCategories).map((category) => (
            <div key={category} className="mb-3">
              <small className="text-muted fw-bold d-block mb-1 text-uppercase" style={{ fontSize: "0.65rem", letterSpacing: "0.5px" }}>
                {category}
              </small>
              <div className="d-flex flex-wrap gap-1">
                {emojiCategories[category].map((emoji, index) => (
                  <button 
                    key={index} 
                    type="button" 
                    className="btn btn-sm p-1 fs-5 border-0 bg-transparent text-center"
                    onClick={() => handleEmojiClick(emoji)}
                    style={{ width: "38px", height: "38px", transition: "transform 0.1s" }}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.25)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="d-flex align-items-center">
        
     
        <button 
          className={`btn ${showEmojis ? "btn-warning text-white" : "btn-light"} me-2 rounded-circle`} 
          type="button"
          onClick={() => setShowEmojis(!showEmojis)}
          style={{ width: "42px", height: "42px" }}
        >
          😊
        </button>

    
        <label htmlFor="chat-file-upload" className="btn btn-light me-2 mb-0 rounded-circle d-flex align-items-center justify-content-center" style={{ cursor: "pointer", width: "42px", height: "42px" }}>
          📎
        </label>
        <input 
          id="chat-file-upload" 
          type="file" 
          accept="image/*" 
          style={{ display: "none" }} 
          onChange={(e) => setFile(e.target.files[0])} 
        />

        <input
          type="text"
          className="form-control rounded-pill bg-light border-0 px-3 py-2"
          placeholder={file ? `Selected: ${file.name}` : "Type your message..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="btn btn-success ms-2 rounded-pill px-4 fw-bold shadow-sm"
          onClick={handleSend}
        >
          Send
        </button>
      </div>

    
      {file && (
        <div className="mt-2 small text-success d-flex align-items-center gap-2" style={{ paddingLeft: "55px" }}>
          📸 Image Ready: <strong>{file.name}</strong> 
          <button 
            type="button" 
            className="btn btn-sm btn-link text-danger p-0 ms-2 text-decoration-none" 
            onClick={() => setFile(null)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}

export default MessageInput;