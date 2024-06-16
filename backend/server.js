import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js"; // Importing the app instance

// Load environment variables
dotenv.config({ path: "./config.env" });

// MongoDB connection
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then((con) => {
    console.log(`MongoDB connected ${con.connection.host}`);
  })
  .catch((err) => {
    console.log(`Error:${err.message}`);
  });
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8000",
    credentials: true,
  },
});

let onlineUsers = [];

const addOnlineUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeOnlineUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

// const getUser = (userId) => {
//   return onlineUsers.find((user) => user.userId === userId);
// };
const getUserSocketId = (userId) => {
  console.log("userIDfor Socket", userId);
  const user = onlineUsers.find(
    (user) => user.userId.toString() === userId.toString()
  );
  console.log("ActiveUser socket", user);
  console.log("onlineUser", onlineUsers);

  return user ? user.socketId : null;
};
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (userId) => {
    addOnlineUser(userId, socket.id);
    io.emit("getUsers", onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeOnlineUser(socket.id);
    io.emit("getUsers", onlineUsers);
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io, getUserSocketId };
