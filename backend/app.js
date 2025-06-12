import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import chatRoutes from "./routes/chatRoutes.js"
import groupRoutes from "./routes/groupRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { createServer } from "http";
import { Server } from "socket.io";
import Group from "./models/group.model.js";
import Message from "./models/message.model.js";

dotenv.config();

main()
.then(()=>{
    console.log(`Connected to DB`);
})
.catch((err)=>{
    console.log(`Can't connect to DB ${err}`)
});

async function main() {
    await mongoose.connect(process.env.DB_URL);
}

const app = express();

app.use(cors({
    origin: "https://chit-chat-nu32.onrender.com",
    credentials: true
}));
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://chit-chat-nu32.onrender.com",
        methods: ["GET", "POST", "DELETE"],
        credentials: true
    },
});


const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/chat", chatRoutes);

io.on("connection", (Socket)=>{
    console.log("User connected", Socket.id)
    Socket.on("join-group", async ({groupId, password})=>{
        let allMessage = await Message.find({group: groupId}).populate("sender","username")
        Socket.join(groupId);
        Socket.emit("receive-message", allMessage)
    })

    Socket.on("join-chat", async ({ senderId, receiverId }) => {
        
    try {
        const sentMessages = await Message.find({ sender: senderId, receiver: receiverId })
            .populate("receiver", "username")
            .populate("sender", "username");

        const receivedMessages = await Message.find({ sender: receiverId, receiver: senderId })
            .populate("sender", "username")
            .populate("receiver", "username");
        
        
        const allMessages = [...sentMessages, ...receivedMessages];
        
        allMessages.sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));

        const roomId = [senderId, receiverId].sort().join("-"); 
        Socket.join(roomId);

        Socket.emit("receive-message", allMessages);
    } catch (error) {
        console.error("Error joining chat:", error);
    }
});


    Socket.on("send-message", async ({sender, message, groupId})=>{
        let newMessage = new Message({sender: sender, group: groupId, content: message})
        await newMessage.save();
        await newMessage.populate("sender")
       
        io.to(groupId).emit("receive-message", newMessage);
    })
    

    Socket.on("send-personal-message", async ({sender, message, receiver})=>{
        let newMessage = new Message({sender: sender, receiver: receiver, content: message})
        console.log(sender, receiver)
        await newMessage.save();
        await newMessage.populate("sender")
         console.log(Array.isArray(newMessage))
         const roomId = [sender.id, receiver.id].sort().join("-"); 
        Socket.join(roomId);
        io.to(roomId).emit("receive-message", newMessage);
    })
    });
    


server.listen(PORT, ()=>{
    console.log("Server running on "+PORT)
})

