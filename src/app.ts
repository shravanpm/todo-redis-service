import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task_routes";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use("/api", taskRoutes);

export default app;
