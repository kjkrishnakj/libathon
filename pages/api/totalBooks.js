import connectDb from "../../middleware/mongoose";
import Book from "@/models/Book";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const totalBooks = await Book.countDocuments();
    return res.status(200).json({ totalBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching total books count" });
  }
};

export default connectDb(handler);
