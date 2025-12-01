import connectDb from "../../middleware/mongoose";
import Book from "../../models/Book";
import mongoose from "mongoose";

const handler = async (req, res) => {
  try {
    console.log("Incoming request:", req.method, req.body);

    // GET — fetch all books
    if (req.method === "GET") {
      const books = await Book.find({}).lean().limit(50);
      return res.status(200).json(books);
    }

    // POST — add new book
    if (req.method === "POST") {
      const {
        title,
        author,
        category,
        slug,
        descr,
        img,
        availableQty,
        row,
        cnum,
        floor,
      } = req.body;

      if (!title || !author) {
        return res.status(400).json({ error: "Title and Author are required" });
      }

      const book = await Book.create({
        title,
        author,
        category,
        slug,
        descr,
        img,
        availableQty,
        row,
        cnum,
        floor,
      });

      return res.status(201).json(book);
    }

    // PUT — update quantity
    if (req.method === "PUT") {
      const { id, availableQty } = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Book ID" });
      }

      const book = await Book.findByIdAndUpdate(
        id,
        { availableQty },
        { new: true }
      );

      if (!book) return res.status(404).json({ error: "Book not found" });

      return res.status(200).json(book);
    }

    // DELETE — remove book
    if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Book ID" });
      }

      const book = await Book.findByIdAndDelete(id);

      if (!book) return res.status(404).json({ error: "Book not found" });

      return res.status(204).end();
    }

    // If method unsupported:
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};

export default connectDb(handler);
