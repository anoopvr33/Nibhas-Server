import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    vacancies: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    specialties: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const City = mongoose.model("City", citySchema);

export default City;
