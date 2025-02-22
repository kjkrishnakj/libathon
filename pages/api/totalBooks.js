import connectDb from "../../middleware/mongoose";

import Book from "../../models/Book";
import Cors from "cors";

// Initialize CORS
const cors = Cors({
  origin: [process.env.NEXT_PUBLIC_HOST, "https://libathon.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

export default async function handler(req, res) {
  await connectDb();

  if (req.method === "GET") {
    try {
      const totalBooks = await Book.countDocuments();
      res.status(200).json({ totalBooks });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch book count" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
