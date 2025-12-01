// pages/api/addIssue.js
import connectDb from "../../middleware/mongoose";
import Issue from "../../models/Issue";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const issue = new Issue(req.body);
      await issue.save();

      return res.status(200).json({
        success: true,
        issueId: issue._id,
      });
    } catch (error) {
      console.error("ISSUE ERROR:", error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const issues = await Issue.find({});
      return res.status(200).json(issues);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default connectDb(handler);
