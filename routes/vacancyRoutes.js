import express from "express";
import Vacancy from "../models/vacancy.js";

const router = express.Router();

// ==========================================
// GET ALL
// ==========================================

router.get("/", async (req, res) => {
  try {
    const vacancies = await Vacancy.find().sort({
      createdAt: -1,
    });

    res.json(vacancies);
  } catch (error) {
    console.error("Get vacancies error:", error);

    res.status(500).json({
      message: "Failed to fetch vacancies",
    });
  }
});

// ==========================================
// GET SINGLE
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const vacancy = await Vacancy.findById(req.params.id);

    if (!vacancy) {
      return res.status(404).json({
        message: "Vacancy not found",
      });
    }

    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch vacancy",
      error: error.message,
    });
  }
});

// ==========================================
// CREATE
// ==========================================

router.post("/", async (req, res) => {
  try {
    const { city, designation, experience, type } = req.body;

    const vacancy = await Vacancy.create({
      city,
      designation,
      experience,
      type,
    });

    res.status(201).json(vacancy);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create vacancy",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE
// ==========================================

router.put("/:id", async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!vacancy) {
      return res.status(404).json({
        message: "Vacancy not found",
      });
    }

    res.status(200).json(vacancy);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update vacancy",
      error: error.message,
    });
  }
});

// ==========================================
// DELETE
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const vacancy = await Vacancy.findByIdAndDelete(req.params.id);

    if (!vacancy) {
      return res.status(404).json({
        message: "Vacancy not found",
      });
    }

    res.status(200).json({
      message: "Vacancy deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete vacancy",
      error: error.message,
    });
  }
});

export default router;
