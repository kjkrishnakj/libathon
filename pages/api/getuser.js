import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken"


const handler = async (req,res)=>{
 
    if(req.method =='POST'){
        let token = req.body.token
        
        
        
        // let user = jsonwebtoken.verify(token,process.env.JWT_SECRET,{expiresIn:"2d"})
        // let dbuser = User.find({email:req.body.email})
        let dbuser = await User.findOne({ "email": req.body.email })

        // console.log("user : "+dbuser);
        const {name,email,address,pincode,phone} = dbuser
        // console.log(name,email,address,pincode);
        res.status(200).json({name,email,address,pincode,phone})
    }
    else{

        res.status(400).json({ error:'error' });
    }
}
export default connectDb(handler)
