import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import createRoute from "./routes/createRoute.js";
import postRoute from "./routes/postRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/create", createRoute);
app.use("/api/v1/post", postRoute);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8080, () => console.log("Server is running on port 8080"));
  } catch (error) {
    console.log(error);
  }
}

startServer();