function Message({ sender, text, time }) {
  const isYou = sender === "You";

  return (
    <div className={`d-flex mb-3 ${isYou ? "justify-content-end" : "justify-content-start"}`}>
      <div
        className={`p-3 rounded shadow ${
          isYou ? "bg-primary text-white" : "bg-white"
        }`}
        style={{ maxWidth: "70%" }}
      >
        <strong>{sender}</strong>

        <p className="mb-1">{text}</p>

        <small>{time}</small>
      </div>
    </div>
  );
}

export default Message;