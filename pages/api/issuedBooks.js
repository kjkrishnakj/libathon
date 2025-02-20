
import Issue from "@/models/Issue";
import connectDb from "../../middleware/mongoose";

export default async function handler(req, res) {
  await connectDb();

  try {
    const issuedBooks = await Issue.countDocuments({ rs: false });
    res.status(200).json({ issuedBooks });
  } catch (error) {
    res.status(500).json({ error: "Error fetching issued books count" });
  }
}
