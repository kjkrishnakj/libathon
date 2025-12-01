import connectDb from "../../middleware/mongoose";
import Ebook from "@/models/Ebook";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const eBooks = await Ebook.countDocuments();
    return res.status(200).json({ eBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching eBooks count" });
  }
};

export default connectDb(handler);
