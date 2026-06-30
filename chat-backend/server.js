require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const path =require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes"); // 👈 1. Message route-ah import panrom
const { initializeSocket } = require("./socket/socket");

dotenv.config();
console.log(process.env.MONGO_URI);
console.log(process.cwd());
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Routes Setup
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); // 👈 2. Message API endpoint-ah register panrom

app.get("/", (req, res) => {
  res.send("Real-Time Support Chat Backend Running...");
});

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});