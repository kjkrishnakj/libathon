import connectDb from "../../middleware/mongoose";
import Issue from "../../models/Issue";
import Cors from "cors";

// Initialize CORS
const cors = Cors({
  origin: [process.env.NEXT_PUBLIC_HOST, "https://libathon.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            let issue = new Issue(req.body);
            await issue.save();
            return res.status(200).json({ success: "success", issueId: issue._id });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    } 
    
    if (req.method === 'GET') {
        try {
            let issues = await Issue.find({});
            return res.status(200).json(issues);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(400).json({ error: "Invalid request method" });
};

export default connectDb(handler);
