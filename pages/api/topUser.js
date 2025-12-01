import Issue from "../../models/Issue";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  try {
    const topUsers = await Issue.aggregate([
      { $group: { _id: { $toLower: "$sid" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    if (topUsers.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    return res.status(200).json(topUsers);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export default connectDb(handler);
