import mongoose from "mongoose";

const vacancySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Vacancy", vacancySchema);
