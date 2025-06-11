import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";
import crypto from "crypto"

const login = async (req, res) => {
    try{ 
    let { email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(302).json({ message: "User not found"});
    
    if(user.password === password){
        let token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            await user.save();
            console.log("Yes")
            return res.status(200).json({token: token, user}); 
    }
     throw new Error("Password Incorrect")
    } catch(err) {
        res.status(500).json({message: `Something went wrong ${err}`});
    }
}

const signup = async (req, res) => {
    try{ 
    let {name, email, password} = req.body;

    const exists = await User.findOne({email});
    if(exists) return res.status(302).json({ message: "User already exists"});

    const newUser = new User({username: name, email: email, password: password});
    await newUser.save();
     
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET)

     return res.status(200).json({token: token, newUser});
     
    } catch(err) {
        res.status(500).json({message: `Something went wrong ${err.message}`});
    }
}


export { signup, login};