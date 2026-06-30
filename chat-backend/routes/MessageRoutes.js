const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { sendMessage, getMessages } = require("../controllers/messageController");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 'uploads' 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

// Routes
router.post("/send", upload.single("file"), sendMessage); // 'file' 
router.get("/history/:user1/:user2", getMessages);

module.exports = router;