import connectDb from "../../middleware/mongoose";
import BookRequest from "../../models/BookRequest";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const bookreq = await BookRequest.countDocuments();
    console.log(bookreq);

    return res.status(200).json({ bookreq });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching total books count" });
  }
};

export default connectDb(handler);
