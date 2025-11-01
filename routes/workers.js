import express from "express";
import Worker from "../models/Worker.js";

const router = express.Router();

// ✅ Reset all worker sites schedule to empty strings (must come first)
router.put("/reset-sites", async (req, res) => {
  try {
    await Worker.updateMany({}, { 
      $set: { 
        schedule: { S: "", M: "", T: "", W: "", Th: "", F: "", St: "" }
      }
    });
    res.json({ message: "All worker sites reset" });
  } catch (err) {
    console.error("Error resetting sites:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all workers
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add new worker
router.post("/", async (req, res) => {
  try {
    const { name, dailyRate, schedule } = req.body;
    const newWorker = new Worker({ name, dailyRate, schedule });
    await newWorker.save();
    res.json(newWorker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update worker (wage or schedule)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete worker
router.delete("/:id", async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: "Worker deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
