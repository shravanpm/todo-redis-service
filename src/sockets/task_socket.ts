import { Server, Socket } from "socket.io";
import client from "../redis/redis_client";
import Task from "../models/task_model";

const REDIS_KEY = "FULLSTACK_TASK_SHRAVAN";

export const registerSocketHandlers = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("add", async (task: string) => {
      const redisData = await client.get(REDIS_KEY);
      const tasks = JSON.parse(redisData || "[]");

      tasks.push(task);

      if (tasks.length > 50) {
        await Task.insertMany(tasks.map((content: string) => ({ content })));
        await client.set(REDIS_KEY, JSON.stringify([]));
      } else {
        await client.set(REDIS_KEY, JSON.stringify(tasks));
      }

      io.emit("tasksUpdated", task);
    });
  });
};
