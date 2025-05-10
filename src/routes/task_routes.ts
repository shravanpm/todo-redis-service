import express, { Request, Response } from "express";
import Task from "../models/task_model";
import client from "../redis/redis_client";

const router = express.Router();
const REDIS_KEY = "FULLSTACK_TASK_SHRAVAN";

router.get("/fetchAllTasks", async (req: Request, res: Response) => {
  try {
    const redisData = await client.get(REDIS_KEY);
    const cachedTasks: string[] = redisData ? JSON.parse(redisData) : [];
    const dbTasks = await Task.find().lean();
    res.status(200).json({
      tasks: [...cachedTasks, ...dbTasks.map((task) => task.content)],
      status: false,
    });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
});

export default router;
