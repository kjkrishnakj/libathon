import connectDb from "../../middleware/mongoose";
import Ebook from "@/models/Ebook";
import Cors from "cors";

// Initialize CORS
const cors = Cors({
  origin: [process.env.NEXT_PUBLIC_HOST, "https://libathon.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default async function handler(req, res) {
  await connectDb();

  try {
    const eBooks = await Ebook.countDocuments();
    res.status(200).json({ eBooks });
  } catch (error) {
    res.status(500).json({ error: "Error fetching eBooks count" });
  }
}
