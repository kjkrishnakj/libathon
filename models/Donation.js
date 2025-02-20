import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  regNo: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
});

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
