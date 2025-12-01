import connectDb from "@/middleware/mongoose";
import Ebook from "../../models/Ebook";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const ebooks = await Ebook.find({});
      return res.status(200).json(ebooks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching eBooks" });
    }
  }

  if (req.method === "POST") {
    try {
      const { name, link } = req.body;

      if (!name || !link) {
        return res.status(400).json({ error: "Name and Link are required" });
      }

      const newEbook = new Ebook({ name, link });
      await newEbook.save();

      return res.status(201).json({ message: "Ebook added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error adding ebook" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Ebook ID is required" });
      }

      await Ebook.findByIdAndDelete(id);

      return res.status(200).json({ message: "Ebook deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error deleting ebook" });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
};

export default connectDb(handler);

