import connectDb from "../../middleware/mongoose";
import Book from "../../models/Book";
import Cors from "cors";

// Initialize CORS
const cors = Cors({
  origin: [process.env.NEXT_PUBLIC_HOST, "https://libathon.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { searchText } = req.body;  
        
        try {
            let book = await Book.findOne({ title: { $regex: new RegExp(searchText, "i") } });
            if (book) {
                res.status(200).json({ success: true, book });
                // console.log(book);
            } else {
                res.status(200).json({ success: false, message: "book not found" });
            }
        } catch (error) {
            console.error("Error fetching book:", error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } else {
        res.status(400).json({ success: false, error: "Invalid request method" });
    }
};

export default connectDb(handler);
