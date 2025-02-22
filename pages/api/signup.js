import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import Cors from "cors";

// Initialize CORS
const cors = Cors({
  origin: [process.env.NEXT_PUBLIC_HOST, "https://libathon.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

const handler = async (req, res) => {
  if (req.method === "POST") {
    await User.collection.dropIndex("email_1").catch(() => {}); // Ignore if index doesn't exist

    try {
      let u = new User(req.body);
      await u.save();
      res.status(200).json({ success: "success" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid request method" });
  }
};

export default connectDb(handler);
