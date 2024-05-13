import express from "express";
import morgan from "morgan";
import { AppError } from "./utils/AppError.js";

const app = express();
import userRouter from "./routes/userRouter.js";
app.use(express.json());

if (process.env.NODE_ENV === "developement") app.use(morgan("dev"));

app.use("/cmms/api/users", userRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

export default app;
