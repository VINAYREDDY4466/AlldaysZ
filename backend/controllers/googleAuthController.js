import { OAuth2Client } from "google-auth-library";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin= async(req, res)=>{
    const{credential}= req.body;
    try{
        const ticket= await client.verifyIdToken({
            idToken:credential,
            audience:process.env.GOOGLE_CLIENT_ID,
        });
        const payload= ticket.getPayload();
        const{email, name} =payload;
        let user= await userModel.findOne({email});

        if(!user){
            user= new userModel({name, email, isVerified: true, cartData: {}});
            console.log("New user created:", user);
            await user.save();
        } else {
            console.log("Existing user found:", user);
        }
         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
        });
        res.json({message:"true", token ,user});
    }
    catch(error){
        res.status(400).json({error:"Invalid Google token"})
    }
}
export {googleLogin}