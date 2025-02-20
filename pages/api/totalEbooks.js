import connectDb from "../../middleware/mongoose";
import Ebook from "@/models/Ebook";

export default async function handler(req, res) {
  await connectDb();

  try {
    const eBooks = await Ebook.countDocuments();
    res.status(200).json({ eBooks });
  } catch (error) {
    res.status(500).json({ error: "Error fetching eBooks count" });
  }
}
