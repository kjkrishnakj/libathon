import connectDb from "../../middleware/mongoose";
import Book from "../../models/Book";

export default async function handler(req, res) {
  try {
    console.time("DB Connection");
    await connectDb();
    console.timeEnd("DB Connection");

    if (req.method === "GET") {
      const books = await Book.find({}).lean();
      return res.status(200).json(books);
    }

    if (req.method === "POST") {
      const book = await Book.create(req.body);
      return res.status(201).json(book);
    }

    if (req.method === "PUT") {
      const { id, availableQty } = req.body;
      if (!id) return res.status(400).json({ error: "Book ID is required" });
      const book = await Book.findByIdAndUpdate(id, { availableQty }, { new: true });
      if (!book) return res.status(404).json({ error: "Book not found" });
      return res.status(200).json(book);
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "Book ID is required" });
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
