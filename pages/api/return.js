// pages/api/return.js
import connectDb from "../../middleware/mongoose";
import Issue from "../../models/Issue";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { bid, sid } = req.body;

            let issue = await Issue.findOne({ bid, sid });
            if (!issue) {
                return res.status(404).json({ error: "No record found!" });
            }

            if (issue.rs) {
                return res.status(400).json({ error: "Book already returned!" });
            }

            // Calculate penalty
            let today = new Date();
            let returnDate = new Date(issue.rdate);
            let penaltyAmount = 0;

            if (today > returnDate) {
                let daysLate = Math.ceil((today - returnDate) / (1000 * 60 * 60 * 24));
                penaltyAmount = daysLate;
            }

            // Update issue record
            issue.rs = true;
            issue.penalty = penaltyAmount;
            await issue.save();

            return res.status(200).json({ success: true, penalty: penaltyAmount });

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(400).json({ error: "Invalid request method" });
};

export default connectDb(handler);
