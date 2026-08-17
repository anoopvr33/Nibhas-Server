import mongoose from "mongoose";
import { model } from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    vacancyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    location: String,

    message: String,

    cv: {
      filename: String,
      originalName: String,
      path: String,
      mimetype: String,
      size: Number,
    },

    // ADD THIS
    status: {
      type: String,
      enum: [
        "New",
        "Under Review",
        "Shortlisted",
        "Interview",
        "Placed",
        "Rejected",
      ],
      default: "New",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Application", applicationSchema);
