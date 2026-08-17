import express from "express";
import City from "../models/city.js";

const router = express.Router();

// ==========================================
// GET ALL CITIES
// ==========================================

router.get("/", async (req, res) => {
  try {
    const cities = await City.find().sort({ createdAt: -1 });

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch cities",
      error: error.message,
    });
  }
});

// ==========================================
// GET SINGLE CITY
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch city",
      error: error.message,
    });
  }
});

// ==========================================
// CREATE CITY
// ==========================================

router.post("/", async (req, res) => {
  console.log("city arrived");
  try {
    const { name, vacancies, specialties } = req.body;

    const city = await City.create({
      name,
      vacancies,
      specialties,
    });

    res.status(201).json(city);
  } catch (error) {
    // Duplicate city
    if (error.code === 11000) {
      return res.status(400).json({
        message: "City already exists",
      });
    }

    res.status(500).json({
      message: "Failed to create city",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE CITY
// ==========================================

router.put("/:id", async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update city",
      error: error.message,
    });
  }
});

// ==========================================
// DELETE CITY
// ==========================================

router.delete("/:id", async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);

    if (!city) {
      return res.status(404).json({
        message: "City not found",
      });
    }

    res.status(200).json({
      message: "City deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete city",
      error: error.message,
    });
  }
});

export default router;
