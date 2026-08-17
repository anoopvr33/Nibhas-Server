import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import Application from "../models/application.js";

const router = express.Router();

// =====================================================
// MULTER - CV UPLOAD
// =====================================================

const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/cvs",

    filename: (req, file, cb) => {
      cb(null, `cv-${Date.now()}-${file.originalname}`);
    },
  }),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// =====================================================
// CREATE APPLICATION
// POST /api/applications
// =====================================================

router.post("/", upload.single("cv"), async (req, res) => {
  console.log("🔥 APPLICATION ROUTE HIT");

  try {
    const {
      vacancyId,
      name,
      phone,
      email,
      experience,
      qualification,
      location,
      message,
    } = req.body || {};

    if (!vacancyId) {
      return res.status(400).json({
        message: "Vacancy ID is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        message: "Phone number is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "CV PDF is required",
      });
    }

    const application = await Application.create({
      vacancyId,
      name,
      phone,
      email,
      experience,
      qualification,
      location,
      message,

      cv: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        path: req.file.path,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });

    return res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("APPLICATION ERROR:", error);

    return res.status(500).json({
      message: "Failed to submit application",
      error: error.message,
    });
  }
});

// =====================================================
// GET ALL APPLICATIONS
// GET /api/applications
// =====================================================

router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("vacancyId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("GET APPLICATIONS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
});

// =====================================================
// GET SINGLE APPLICATION
// GET /api/applications/:id
// =====================================================

router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate(
      "vacancyId",
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.status(200).json({
      application,
    });
  } catch (error) {
    console.error("GET APPLICATION ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch application",
      error: error.message,
    });
  }
});

// =====================================================
// UPDATE APPLICATION STATUS
// PATCH /api/applications/:id/status
// =====================================================

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Under Review",
      "Shortlisted",
      "Interview",
      "Placed",
      "Rejected",
    ];

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      },
    ).populate("vacancyId");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);

    return res.status(500).json({
      message: "Failed to update application status",
      error: error.message,
    });
  }
});

// =====================================================
// DELETE APPLICATION
// DELETE /api/applications/:id
// =====================================================

router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Delete CV from uploads folder
    if (application.cv?.path) {
      const cvPath = path.resolve(application.cv.path);

      if (fs.existsSync(cvPath)) {
        fs.unlinkSync(cvPath);
      }
    }

    await Application.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("DELETE APPLICATION ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete application",
      error: error.message,
    });
  }
});

export default router;
