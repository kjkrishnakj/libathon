const mongoose = require('mongoose')

const IssueSchema  = new mongoose.Schema({
    title: { type: String, required: true },
    sname: { type: String, required: true },
    bid: { type: String, required: true },
    sid: { type: String, required: true },
    penalty: { type: Number, default: 0 },
    idate: { type: Date, default: Date.now },
    rdate: { type: Date, default: Date.now },
    rs: { type: Boolean, default: false }    
 

},{timestamps: true});

mongoose.models = {};
module.exports = mongoose.model("Issue", IssueSchema);
