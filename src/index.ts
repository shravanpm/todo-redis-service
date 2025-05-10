import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app";
import { connectMongo } from "./db/db";
import { registerSocketHandlers } from "./sockets/task_socket";

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

registerSocketHandlers(io);

const PORT = process.env.PORT || 3001;

server.listen(PORT, async () => {
  await connectMongo();
  console.log(`Server running on port ${PORT}`);
});
