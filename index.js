import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/DB.js";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Use your new URL routes
app.use("/", urlRoutes);

app.listen(5050, () => {
  console.log("🚀 Server running on port 5050");
});

export default app;
