import connectDb from "../../middleware/mongoose";
import Issue from "../../models/Issue";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            let issue = new Issue(req.body);
            await issue.save();
            res.status(200).json({ success: "success", issueId: issue._id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        res.status(400).json({ error: "Invalid request method" });
    }
};

export default connectDb(handler);
