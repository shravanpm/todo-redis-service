import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const client = createClient({
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

export default client;
