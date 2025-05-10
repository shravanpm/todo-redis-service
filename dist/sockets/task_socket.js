"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSocketHandlers = void 0;
const redis_client_1 = __importDefault(require("../redis/redis_client"));
const task_model_1 = __importDefault(require("../models/task_model"));
const REDIS_KEY = "FULLSTACK_TASK_SHRAVAN";
const registerSocketHandlers = (io) => {
    io.on("connection", (socket) => {
        socket.on("add", async (task) => {
            const redisData = await redis_client_1.default.get(REDIS_KEY);
            const tasks = JSON.parse(redisData || "[]");
            tasks.push(task);
            if (tasks.length > 50) {
                await task_model_1.default.insertMany(tasks.map((content) => ({ content })));
                await redis_client_1.default.set(REDIS_KEY, JSON.stringify([]));
            }
            else {
                await redis_client_1.default.set(REDIS_KEY, JSON.stringify(tasks));
            }
            io.emit("tasksUpdated", task);
        });
    });
};
exports.registerSocketHandlers = registerSocketHandlers;
