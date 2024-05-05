import express from "express";

const app = express();
import userRouter from "./routes/userRouter";
app.use(express.json());

if (process.env.NODE_ENV === "developement") app.use(morgan("dev"));

app.use('/api/v1/users', userRouter);


export default app;
