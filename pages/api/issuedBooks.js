import Issue from "@/models/Issue";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const issuedBooks = await Issue.countDocuments({ rs: false });
    return res.status(200).json({ issuedBooks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching issued books count" });
  }
};

export default connectDb(handler);
