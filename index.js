import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import projectRoutes from "./routes/project.routes.js";

dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});