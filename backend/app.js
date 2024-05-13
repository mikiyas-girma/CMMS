import express from "express";
import morgan from "morgan";
import { AppError } from "./utils/AppError.js";
import { ErrorHandler } from "./utils/ErrorController.js";

const app = express();
import userRouter from "./routes/userRouter.js";
app.use(express.json());

if (process.env.NODE_ENV === "developement") app.use(morgan("dev"));

app.use("/cmms/api/users", userRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(ErrorHandler);

export default app;
