import express from "express";
import Career from "../models/career.js";

const router = express.Router();

// ==========================================
// GET ALL CAREERS
// ==========================================

router.get("/", async (req, res) => {
  try {
    const jobs = await Career.find().sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch careers",
      error: error.message,
    });
  }
});

// ==========================================
// GET SINGLE CAREER
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const job = await Career.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Career position not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch career",
      error: error.message,
    });
  }
});

// ==========================================
// CREATE
// ==========================================

router.post("/", async (req, res) => {
  try {
    const { title, department, location, type, experience } = req.body;

    const job = await Career.create({
      title,
      department,
      location,
      type,
      experience,
      
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create career",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE
// ==========================================

router.put("/:id", async (req, res) => {
  try {
    const job = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return res.status(404).json({
        message: "Career position not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update career",
      error: error.message,
    });
  }
});

// ==========================================
// DELETE
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const job = await Career.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Career position not found",
      });
    }

    res.status(200).json({
      message: "Career position deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete career",
      error: error.message,
    });
  }
});

export default router;
