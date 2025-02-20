import mongoose from "mongoose";

const SpotlightSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Spotlight || mongoose.model("Spotlight", SpotlightSchema);
