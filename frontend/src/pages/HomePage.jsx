import { useEffect, useState } from "react";
import io from "socket.io-client";
import server from "../environment";
import GroupTab from ".././components/GroupTab"
import GroupWindow from ".././components/GroupWindow";

const HomePage = ({ user, groups, setGroups }) => {
  const [currentGroup, setCurrentGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null); 


  useEffect(() => {
    const newSocket = io(server.dev);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);


  useEffect(() => {
    if (!socket || !currentGroup) return;

    const groupId = currentGroup._id;

    socket.emit("join-group", { groupId });

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
  }, [socket, currentGroup]);

  return (
    <div className="flex">
      
      <div>
        <GroupTab
          user={user}
          groups={groups}
          setGroups={setGroups}
          currentGroup={currentGroup}
          setCurrentGroup={setCurrentGroup}
        />
      </div>
      <div>
        
        <GroupWindow socket={socket} currentGroup={currentGroup} user={user} messages={messages}/>
      </div>
      
    </div>
  );
};

export default HomePage;

