"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db/db");
const task_socket_1 = require("./sockets/task_socket");
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
(0, task_socket_1.registerSocketHandlers)(io);
const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
    await (0, db_1.connectMongo)();
    console.log(`Server running on port ${PORT}`);
});
