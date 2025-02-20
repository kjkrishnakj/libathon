import connectDb from "../../middleware/mongoose";
import Book from "../../models/Book";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    console.time("DB Connection");
    await connectDb();
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Failed to connect to MongoDB");
    }
    console.timeEnd("DB Connection");

    if (req.method === "GET") {
      console.time("Fetching Books");
      const books = await Book.find({}).lean().limit(50);
      console.timeEnd("Fetching Books");
      return res.status(200).json(books);
    }

    if (req.method === "POST") {
      console.time("Adding Book");
      const book = await Book.create(req.body);
      console.timeEnd("Adding Book");
      return res.status(201).json(book);
    }

    if (req.method === "PUT") {
      console.time("Updating Book");
      const { id, availableQty } = req.body;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Book ID" });
      }
      const book = await Book.findByIdAndUpdate(id, { availableQty }, { new: true });
      console.timeEnd("Updating Book");
      if (!book) return res.status(404).json({ error: "Book not found" });
      return res.status(200).json(book);
    }

    if (req.method === "DELETE") {
      console.time("Deleting Book");
      const { id } = req.body;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Book ID" });
      }
      const book = await Book.findByIdAndDelete(id);
      console.timeEnd("Deleting Book");
      if (!book) return res.status(404).json({ error: "Book not found" });
      return res.status(204).end();
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
