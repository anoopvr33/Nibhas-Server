import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Full Time", "Part Time", "Contract", "Internship"],
      default: "Full Time",
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    github: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Career = mongoose.model("Career", careerSchema);

export default Career;
