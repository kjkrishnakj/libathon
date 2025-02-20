import connectDb from "../../middleware/mongoose";
import Book from "../../models/Book";

export default async function handler(req, res) {
  await connectDb();

  if (req.method === "GET") {
    const books = await Book.find({});
    return res.status(200).json(books);
  }

  if (req.method === "POST") {
    const book = await Book.create(req.body);
    return res.status(201).json(book);
  }

  if (req.method === "PUT") {
    const { id, availableQty } = req.body;
    const book = await Book.findByIdAndUpdate(id, { availableQty }, { new: true });
    return res.status(200).json(book);
  }

  if (req.method === "DELETE") {
    await Book.findByIdAndDelete(req.body.id);
    return res.status(204).end();
  }

  res.status(405).end();
}
