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

// Handling Socket.io connections
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };
