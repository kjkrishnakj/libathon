import Spotlight from "@/models/Spotlight";
import mongoose from "mongoose";
import connectDb from "@/middleware/mongoose";

export default async function handler(req, res) {
  // await connectDb();

  if (req.method === "GET") {
    // Fetch all spotlight messages
    const spotlights = await Spotlight.find({});
    return res.status(200).json(spotlights);
  }

  if (req.method === "POST") {
    // Add a new spotlight message
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const newSpotlight = new Spotlight({ message });
    await newSpotlight.save();

    return res.status(201).json({ success: true, spotlight: newSpotlight });
  }

  if (req.method === "DELETE") {
    console.time("Deleting Spotlight Message");

    const { id } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Spotlight ID" });
    }

    const deletedSpotlight = await Spotlight.findByIdAndDelete(id);
    
    console.timeEnd("Deleting Spotlight Message");

    if (!deletedSpotlight) {
      return res.status(404).json({ error: "Spotlight message not found" });
    }

    return res.status(204).end(); // No content response
  }

  return res.status(405).json({ error: "Method not allowed" });
}
