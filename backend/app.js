import express from "express";

const app = express();
import userRouter from "./routes/userRouter.js";
app.use(express.json());

if (process.env.NODE_ENV === "developement") app.use(morgan("dev"));

app.use("/cmms/api/", userRouter);

export default app;
