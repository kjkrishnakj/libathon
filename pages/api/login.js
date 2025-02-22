import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import Cors from "cors";

// Initialize CORS
const cors = Cors({
  origin: [process.env.NEXT_PUBLIC_HOST, "https://libathon.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE"],
});
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {
    if (req.method == 'POST') {
        let user = await User.findOne({ "rno": req.body.rno })
        if (user) {
            if (req.body.rno == user.rno && req.body.password == user.password) {
                var token = jwt.sign({  rno: user.rno, name: user.name}, process.env.JWT_SECRET,{expiresIn:"2d"});
                res.status(200).json({success:true,token,rno:user.rno});
            }
            else{

                res.status(200).json({ success: false,error:"no user found" });
            }
            
        } else {
            res.status(200).json({ success: false,error:"invalid credentials" });

        }
    }
    else {
        res.status(400).json({ error: "error" });

    }
}

export default connectDb(handler)
