import Issue from "../../models/Issue";
import connectDb from "../../middleware/mongoose";

export default async function handler(req, res) {
  await connectDb();

  try {
    const topUsers = await Issue.aggregate([
      { $group: { _id: { $toLower: "$sid" }, count: { $sum: 1 } } }, // Convert sid to lowercase
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    if (topUsers.length === 0) {
      console.log("No data found");
      return res.status(404).json({ message: "No data found" });
    }

    // console.log("Top 3 Users:", topUsers); // Log all 3 users

    res.status(200).json(topUsers);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
