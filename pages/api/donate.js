import connectDb from "@/middleware/mongoose";
import Donation from "../../models/Donation";

const handler = async (req, res) => {
  // POST — create new donation
  if (req.method === "POST") {
    try {
      const { bookTitle, regNo } = req.body;

      if (!bookTitle || !regNo) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const newDonation = new Donation({ bookTitle, regNo });
      await newDonation.save();

      return res
        .status(201)
        .json({ success: true, message: "Donation recorded" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error recording donation" });
    }
  }

  // GET — fetch all donations
  if (req.method === "GET") {
    try {
      const donations = await Donation.find({});
      return res.status(200).json({ success: true, donations });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error fetching donations" });
    }
  }

  // PUT — update donation status
  if (req.method === "PUT") {
    try {
      const { id, status } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Donation ID is required" });
      }

      await Donation.findByIdAndUpdate(id, { status });

      return res
        .status(200)
        .json({ success: true, message: "Status updated" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Error updating status" });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["POST", "GET", "PUT"]);
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} Not Allowed`,
  });
};

export default connectDb(handler);
