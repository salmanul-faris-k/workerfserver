import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import workerRoutes from "./routes/workers.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());  // Important: JSON middleware for body parsing

app.use("/api/workers", workerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
