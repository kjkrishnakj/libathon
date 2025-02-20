import connectDb from "@/middleware/mongoose";
import Ebook from '../../models/Ebook';

export default async function handler(req, res) {
    await connectDb(); // Connect to MongoDB

    if (req.method === 'GET') {
        // Fetch all ebooks
        const ebooks = await Ebook.find({});
        return res.status(200).json(ebooks);
    } 
    else if (req.method === 'POST') {
        // Add new ebook
        const { name, link } = req.body;
        if (!name || !link) {
            return res.status(400).json({ error: "Name and Link are required" });
        }

        const newEbook = new Ebook({ name, link });
        await newEbook.save();
        return res.status(201).json({ message: "Ebook added successfully" });
    } 
    else if (req.method === 'DELETE') {
        // Delete an ebook
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Ebook ID is required" });
        }

        await Ebook.findByIdAndDelete(id);
        return res.status(200).json({ message: "Ebook deleted successfully" });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
