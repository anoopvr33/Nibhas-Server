import express from "express";

import JobApplication from "../models/jobApplication.js";

const router = express.Router();

// ============================================
// CREATE APPLICATION
// POST /api/job-applications
// ============================================

router.post("/", async (req, res) => {
  console.log("Job application request body: arrived ");
  try {
    const {
      jobId,
      name,
      phone,
      email,
      experience,
      qualification,
      location,
      message,
    } = req.body;

    // VALIDATION

    if (!jobId || !name || !phone || !email || !experience || !qualification) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    // CREATE

    const application = await JobApplication.create({
      jobId,

      name,

      phone,

      email,

      experience,

      qualification,

      location,

      message,
    });

    res.status(201).json({
      message: "Application submitted successfully.",

      application,
    });
  } catch (error) {
    console.error("Create job application error:", error);

    res.status(500).json({
      message: "Failed to submit application.",
    });
  }
});

// ============================================
// GET ALL APPLICATIONS
// GET /api/job-applications
// ============================================

router.get("/", async (req, res) => {
  try {
    const applications = await JobApplication.find().populate("jobId").sort({
      createdAt: -1,
    });

    res.json(applications);
  } catch (error) {
    console.error("Get applications error:", error);

    res.status(500).json({
      message: "Failed to fetch applications.",
    });
  }
});

// ============================================
// GET SINGLE APPLICATION
// GET /api/job-applications/:id
// ============================================

router.get("/:id", async (req, res) => {
  try {
    const application = await JobApplication.findById(req.params.id).populate(
      "jobId",
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.json(application);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch application.",
    });
  }
});

// ============================================
// UPDATE STATUS
// PUT /api/job-applications/:id
// ============================================

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,

      {
        status,
      },

      {
        new: true,
      },
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.json({
      message: "Application status updated.",

      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update application.",
    });
  }
});

// ============================================
// DELETE APPLICATION
// DELETE /api/job-applications/:id
// ============================================

router.delete("/:id", async (req, res) => {
  try {
    const application = await JobApplication.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
      });
    }

    res.json({
      message: "Application deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete application.",
    });
  }
});

export default router;
