import express from "express";
import Designation from "../models/designation.js";

const router = express.Router();

// ==========================================
// GET ALL DESIGNATIONS
// ==========================================

router.get("/", async (req, res) => {
  try {
    const designations = await Designation.find().sort({ createdAt: -1 });

    res.status(200).json(designations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch designations",
      error: error.message,
    });
  }
});

// ==========================================
// GET SINGLE DESIGNATION
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);

    if (!designation) {
      return res.status(404).json({
        message: "Designation not found",
      });
    }

    res.status(200).json(designation);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch designation",
      error: error.message,
    });
  }
});

// ==========================================
// CREATE
// ==========================================

router.post("/", async (req, res) => {
  try {
    const { name, description, openings } = req.body;

    const designation = await Designation.create({
      name,
      description,
      openings,
    });

    res.status(201).json(designation);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create designation",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE
// ==========================================

router.put("/:id", async (req, res) => {
  try {
    const designation = await Designation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!designation) {
      return res.status(404).json({
        message: "Designation not found",
      });
    }

    res.status(200).json(designation);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update designation",
      error: error.message,
    });
  }
});

// ==========================================
// DELETE
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const designation = await Designation.findByIdAndDelete(req.params.id);

    if (!designation) {
      return res.status(404).json({
        message: "Designation not found",
      });
    }

    res.status(200).json({
      message: "Designation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete designation",
      error: error.message,
    });
  }
});

export default router;
