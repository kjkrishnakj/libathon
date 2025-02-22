import connectDb from "@/middleware/mongoose";
import Donation from "../../models/Donation";
import Cors from "cors";

// Initialize CORS
const cors = Cors({
  origin: [process.env.NEXT_PUBLIC_HOST, "https://libathon.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { bookTitle, regNo } = req.body;

    if (!bookTitle || !regNo) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    await connectDb();

    const newDonation = new Donation({ bookTitle, regNo });
    await newDonation.save();

    return res.status(201).json({ success: true, message: "Donation recorded" });
  } else if (req.method === "GET") {
    await connectDb();
    const donations = await Donation.find();
    return res.status(200).json({ success: true, donations });
  } else if (req.method === "PUT") {
    const { id, status } = req.body;
    await connectDb();
    await Donation.findByIdAndUpdate(id, { status });
    return res.status(200).json({ success: true, message: "Status updated" });
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
