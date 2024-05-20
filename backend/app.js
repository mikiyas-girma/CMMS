import express from "express";
import morgan from "morgan";
import { AppError } from "./utils/AppError.js";
import { ErrorHandler } from "./utils/ErrorController.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import MaterialRouter from "./routes/MaterialRouter.js";

const app = express();

app.use(cookieParser());

app.use(express.json());

if (process.env.NODE_ENV === "developement") app.use(morgan("dev"));

app.use("/cmms/api/users", userRouter);
app.use("/cmms/api/materials", MaterialRouter);
app.all("*", (req, res, next) => {
  console.log(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(ErrorHandler);

export default app;
