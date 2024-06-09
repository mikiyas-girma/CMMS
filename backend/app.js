import express from "express";
import morgan from "morgan";
import { AppError } from "./utils/AppError.js";
import { ErrorHandler } from "./utils/ErrorController.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import MaterialRouter from "./routes/MaterialRouter.js";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(helmet());

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    credentials: true, // Allow credentials (cookies) to be sent
    origin: "http://localhost:8000",
  })
);

app.use(mongoSanitize());

app.use("/public", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "developement") app.use(morgan("dev"));

app.use("/cmms/api/users", userRouter);
app.use("/cmms/api/materials", MaterialRouter);
app.all("*", (req, res, next) => {
  // console.log(
  //   new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  // );
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(ErrorHandler);

export default app;
