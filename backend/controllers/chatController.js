import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const joinChat = async (req, res) => {
    let { receiverId } = req.body;

    let receiver  = await User.findById(receiverId);

    if(!receiver) return res.json({error: "User not found"});
      
    res.json({ success: true,  receiver});
}

const createChat = async (req, res) => {
    let {userId, senderId} = req.body;
    let user = await User.findById(userId);
    let sender = await User.findById(senderId);
    
    if(!user) return res.json({error: "User not found"});
    console.log(sender.contacts)
    if(!sender.contacts.includes(userId)){
        sender.contacts.push(userId);
    } else {
        return res.json({error: "User is already in your chats"});
    }
    
    await sender.save();
    res.status(201).json(user);
}

const allChats = async (req, res) => {
  
    let token = req.headers.authorization;
    console.log(token)
    if(!token) return res.status(401).json({ isAuthenticated: false, message: "No token provided" });
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user = await User.findById(decoded.id).populate("contacts");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      userId: user._id,
      username: user.username,
      contacts: user.contacts,
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

export {joinChat, createChat, allChats}