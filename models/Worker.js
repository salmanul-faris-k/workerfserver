import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dailyRate: { type: Number, default: 1350 },
  schedule: {
    S: { type: String, default: "" },  // Sunday
    M: { type: String, default: "" },  // Monday
    T: { type: String, default: "" },  // Tuesday
    W: { type: String, default: "" },  // Wednesday
    Th: { type: String, default: "" }, // Thursday
    F: { type: String, default: "" },  // Friday
    St: { type: String, default: "" }, // Saturday
  },
});

export default mongoose.model("Worker", workerSchema);
