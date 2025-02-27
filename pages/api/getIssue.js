import connectDb from "../../middleware/mongoose";
import Issue from "../../models/Issue";
import Cors from "cors";

// Initialize CORS
const cors = Cors({
  origin: [process.env.NEXT_PUBLIC_HOST, "https://libathon.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const issue = await Issue.findOne({ _id: req.query.id });
      if (!issue) return res.status(404).json({ error: "Issue not found" });

      res.status(200).json(issue);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export default handler;
