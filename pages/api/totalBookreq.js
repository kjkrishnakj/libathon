import connectDb from "../../middleware/mongoose";
import BookRequest from "../../models/BookRequest";

export default async function handler(req, res) {
  await connectDb();

  try {
    const bookreq = await BookRequest.countDocuments();
    console.log(bookreq);
    
    res.status(200).json({ bookreq });
  } catch (error) {
    res.status(500).json({ error: "Error fetching total books count" });
  }
}
 