import Spotlight from "@/models/Spotlight";
import mongoose from "mongoose";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    // GET — fetch spotlight messages
    if (req.method === "GET") {
      const spotlights = await Spotlight.find({});
      return res.status(200).json(spotlights);
    }

    // POST — add spotlight message
    if (req.method === "POST") {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const newSpotlight = new Spotlight({ message });
      await newSpotlight.save();

      return res.status(201).json({
        success: true,
        spotlight: newSpotlight,
      });
    }

    // DELETE — remove spotlight by ID
    if (req.method === "DELETE") {
      const { id } = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Spotlight ID" });
      }

      const deletedSpotlight = await Spotlight.findByIdAndDelete(id);

      if (!deletedSpotlight) {
        return res.status(404).json({ error: "Spotlight message not found" });
      }

      return res.status(204).end();
    }

    // Method not allowed
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });

  } catch (error) {
    console.error("❌ Spotlight API Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default connectDb(handler);
