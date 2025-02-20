import mongoose from 'mongoose';

const EbookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    link: { type: String, required: true }
});

export default mongoose.models.Ebook || mongoose.model('Ebook', EbookSchema);
