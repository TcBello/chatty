const express = require("express");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const { Server } = require("socket.io");
const { UserRoutes } = require("./routes/user_routes");
const { ChatRoomRoutes } = require("./routes/chat_room_routes");
const { MessageRoutes } = require("./routes/message_routes");

const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://tcbello-chatty.vercel.app",
    methods: ["GET", "POST", "PUT"],
  },
});

app.use(express.json());
app.use(cors());

// CONNECT MONGO DB
connectDB();

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

io.sockets.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`Joined at ${data}`);
  });

  socket.on("send-message", (data) => {
    socket.to(data.chatRoomID).emit("receive-message", data);
  });

  socket.on("end-chat", (data) => {
    socket.to(data).emit("receive-end-chat", data);
  });
});

app.get("/", (req, res) => res.send("<h1>Welcome to API</h1>"));
app.use("/api/user", UserRoutes);
app.use("/api/chat", ChatRoomRoutes);
app.use("/api/message", MessageRoutes);
