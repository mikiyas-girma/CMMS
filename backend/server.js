import dotenv from "dotenv";

import mongoose from "mongoose";

import app from "./app.js";

dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(DB)
  .then((con) => {
    console.log(`MongoDB connected ${con.connection.host}`);
  })
  .catch((err) => {
    console.log(`Error:${err.message}`);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const x = 6;
