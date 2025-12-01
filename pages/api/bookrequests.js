import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";
import BookRequest from "@/models/BookRequest";

const handler = async (req, res) => {
  // GET – fetch all book requests
  if (req.method === "GET") {
    try {
      const requests = await BookRequest.find({});
      return res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching book requests" });
    }
  }

  // POST – create new request
  if (req.method === "POST") {
    try {
      const { title, author } = req.body;

      if (!title || !author) {
        return res.status(400).json({ error: "Title and author are required" });
      }

      const newRequest = new BookRequest({ title, author });
      await newRequest.save();

      return res.status(201).json({
        success: true,
        request: newRequest,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error creating book request" });
    }
  }

  // DELETE – remove a request by ID
  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid request ID" });
      }

      const deletedRequest = await BookRequest.findByIdAndDelete(id);

      if (!deletedRequest) {
        return res.status(404).json({ error: "Request not found" });
      }

      return res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error deleting request" });
    }
  }

  // PUT – update request status
  if (req.method === "PUT") {
    try {
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

      if (!updatedRequest) {
        return res.status(404).json({ error: "Request not found" });
      }

      return res.status(200).json({
        success: true,
        request: updatedRequest,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error updating request" });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
};

export default connectDb(handler);
