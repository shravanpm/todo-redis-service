"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_model_1 = __importDefault(require("../models/task_model"));
const redis_client_1 = __importDefault(require("../redis/redis_client"));
const router = express_1.default.Router();
const REDIS_KEY = "FULLSTACK_TASK_SHRAVAN";
router.get("/fetchAllTasks", async (req, res) => {
    try {
        const redisData = await redis_client_1.default.get(REDIS_KEY);
        const cachedTasks = redisData ? JSON.parse(redisData) : [];
        const dbTasks = await task_model_1.default.find().lean();
        res.status(200).json({
            tasks: [...cachedTasks, ...dbTasks.map((task) => task.content)],
            status: false,
        });
    }
    catch (error) {
        res.status(500).json({ status: false, msg: "Internal server error" });
    }
});
exports.default = router;
