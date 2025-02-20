const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    descr: { type: String, required: true },
    img: { type: String, required: true },
    availableQty: { type: Number, required: true },
}, { timestamps: true });

mongoose.models = {};
module.exports = mongoose.model("Book", BookSchema);
