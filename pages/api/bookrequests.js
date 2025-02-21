import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";

import BookRequest from "@/models/BookRequest";

export default async function handler(req, res) {
  await connectDb();

  if (req.method === "GET") {
    // Fetch all book requests
    const requests = await BookRequest.find({});
    return res.status(200).json(requests);
  }

  if (req.method === "POST") {
    // Create a new book request
    const { title, author } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: "Title and author are required" });
    }

    const newRequest = new BookRequest({ title, author });
    await newRequest.save();
    return res.status(201).json({ success: true, request: newRequest });
  }

  if (req.method === "DELETE") {
    // Delete a book request by ID
    const { id } = req.body;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const deletedRequest = await BookRequest.findByIdAndDelete(id);
    if (!deletedRequest) return res.status(404).json({ error: "Request not found" });

    return res.status(204).end();
  }

  if (req.method === "PUT") {
    const { id, status } = req.body;
  
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }
  
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
  
    const updatedRequest = await BookRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  
    if (!updatedRequest) return res.status(404).json({ error: "Request not found" });
  
    return res.status(200).json({ success: true, request: updatedRequest });
  }
  

  res.status(405).json({ error: "Method not allowed" });
}
