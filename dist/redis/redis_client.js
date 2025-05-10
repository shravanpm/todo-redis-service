"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const client = (0, redis_1.createClient)({
    url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
});
client.on("connect", () => {
    console.log("Redis client connecting...");
});
client.on("ready", () => {
    console.log("Redis is ready and connected");
});
client.on("error", (err) => {
    console.error("Redis connection error:", err);
});
client.on("end", () => {
    console.log("Redis connection closed");
});
client.connect();
exports.default = client;
