import mongoose from "mongoose";

const BookRequestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Status: Pending, Approved, Rejected
  },
  { timestamps: true }
);

export default mongoose.models.BookRequest || mongoose.model("BookRequest", BookRequestSchema);
