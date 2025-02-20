import connectDb from "../../middleware/mongoose";
import Book from "../../models/Book";
import mongoose from "mongoose";

export default async function handler(req, res) {
  try {
    console.log("Incoming request:", req.method, req.body);
    
    await connectDb();
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Failed to connect to MongoDB");
    }

    if (req.method === "GET") {
      const books = await Book.find({}).lean().limit(50);
      return res.status(200).json(books);
    }

    if (req.method === "POST") {
      const { title, author, category, slug, descr, img, availableQty, row, cnum, floor } = req.body;
      if (!title || !author) {
        return res.status(400).json({ error: "Title and Author are required" });
      }
      const book = await Book.create({ title, author, category, slug, descr, img, availableQty, row, cnum, floor });
      return res.status(201).json(book);
    }

    if (req.method === "PUT") {
      const { id, availableQty } = req.body;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Book ID" });
      }
      const book = await Book.findByIdAndUpdate(id, { availableQty }, { new: true });
      if (!book) return res.status(404).json({ error: "Book not found" });
      return res.status(200).json(book);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Book ID" });
      }
      const book = await Book.findByIdAndDelete(id);
      if (!book) return res.status(404).json({ error: "Book not found" });
      return res.status(204).end();
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
