import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import errorHandler from "./middleware/errorMiddleware.js";


dotenv.config();

connectDB();

const app = express();


app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});