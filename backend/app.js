import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import userRoutes from "./routes/userRoutes.js"
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

app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "DELETE"],
        credentials: true
    },
});


const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);
app.use("/api/group", groupRoutes);

io.on("connection", (Socket)=>{
    console.log("User connected", Socket.id)
    Socket.on("join-group", async ({groupId, password})=>{
        let allMessage = await Message.find({group: groupId}).populate("sender","username")
        Socket.join(groupId);
        Socket.emit("receive-message", allMessage)
    })

    Socket.on("send-message", async ({sender, message, groupId})=>{
        let newMessage = new Message({sender: sender, group: groupId, content: message})
        await newMessage.save();
        await newMessage.populate("sender")
        io.to(groupId).emit("receive-message", newMessage);
    })
    });

    


server.listen(PORT, ()=>{
    console.log("Server running on "+PORT)
})

