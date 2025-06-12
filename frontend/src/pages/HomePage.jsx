import { useEffect, useState } from "react";
import io from "socket.io-client";
import server from "../environment";
import GroupTab from ".././components/GroupTab"
import GroupWindow from ".././components/GroupWindow";

const HomePage = ({ user, groups, setGroups, chats, setChats }) => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null); 
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    const newSocket = io(server.prod);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);


  useEffect(() => {
    if (!socket || (!currentGroup && !currentChat)) return;

    if(currentGroup){
        const groupId = currentGroup._id;

    socket.emit("join-group", { groupId });
    }

    if(currentChat){
      const receiverId = currentChat._id;
      const senderId = user.id;

      socket.emit("join-chat", { senderId , receiverId})

    }
    

    socket.on("receive-message", (data) => {
      console.log("Received message:", data);
     if(Array.isArray(data)){
      setMessages(data);
     } else {
      setMessages((prev) => [...prev, data]);
     }
      
      
    });

    return () => {
      socket.off("receive-message");
    };
  }, [socket, currentGroup, currentChat]);

  return (
    <div className="flex">
      
      <div>
        <GroupTab
          user={user}
          groups={groups}
          setGroups={setGroups}
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          setChats={setChats}
          chats={chats}
        />
      </div>
      <div>
        
        <GroupWindow socket={socket} setCurrentGroup={setCurrentGroup} currentGroup={currentGroup} setCurrentChat={setCurrentChat} currentChat={currentChat} user={user} messages={messages} />
      </div>
      
    </div>
  );
};

export default HomePage;

