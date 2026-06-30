const Message = require("../models/Message");

// Send Message (Supports Text & Image)
const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    let fileUrl = "";

    
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    const newMessage = await Message.create({
      sender,
      receiver,
      text: text || "",
      fileUrl: fileUrl, 
      timestamp: new Date()
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Messages
const getMessages = async (req, res) => {
  try {
    const { user1, user2 } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ timestamp: 1 });
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };