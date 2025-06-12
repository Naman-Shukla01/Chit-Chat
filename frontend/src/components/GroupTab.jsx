import axios from "axios";
import server from "../environment";
import { useState } from "react";

const GroupTab = ({
  user,
  groups,
  setGroups,
  currentGroup,
  setCurrentGroup,
  currentChat,
  setCurrentChat,
  setChats,
  chats
}) => {
  let [joinGroupClicked, setJoinGroupClicked] = useState(false);
  let [createGroupClicked, setCreateGroupClicked] = useState(false);
  let [createChatClicked, setCreateChatClicked] = useState(false);
  const [chatIsOpen, setChatIsOpen] = useState(true);

  const createChat = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${server.dev}/api/chat/create`, {
      userId: e.target.name.value,
      senderId: user.id,
    });

    console.log("created chat : ", res);
    setChats((prevChats) => [...prevChats, res.data]);
    setCreateChatClicked(!createChat);
  };

  const joinChat = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${server.dev}/api/chat/join`, {
      receiverId: e.target.name.value,
    });

    console.log("joined chat : ", res);
    setGroups((prevGroups) => [...prevGroups, res.data.group]);
    setJoinGroupClicked(!joinGroupClicked);
  };

  const createGroup = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${server.dev}/api/group/create`, {
      name: e.target.name.value,
      password: e.target.password.value,
      userId: user.id,
    });
    console.log(res);
    setGroups((prevGroups) => [...prevGroups, res.data]);
    setCreateGroupClicked(!createGroupClicked);
  };

  const joinGroup = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${server.dev}/api/group/join`, {
      name: e.target.name.value,
      password: e.target.password.value,
      userId: user.id,
    });
    console.log(res);
    setGroups((prevGroups) => [...prevGroups, res.data.group]);
    setJoinGroupClicked(!joinGroupClicked);
  };

  console.log(chats);

  return (
    <div className="bg-orange-300 cursor-pointer p-5 not-sm:p-2 overflow-y-auto border-0 border-r-gray-600 md:w-[40vw] sm:w-[30vw] not-sm:w-[100vw] h-[100vh]">
      <div className="flex">
        <i className="fa-regular font-extrabold text-2xl m-2 fa-paper-plane"></i>
        <p className="text-2xl font-extrabold m-2">Chit Chat</p>
      </div>
      <div className="flex justify-between ">
        <h1 className="text-2xl font-bold mt-2">Chats</h1>
          <div onClick={()=>setCreateChatClicked(!createChatClicked)}>
          Create chat
        </div>
        {createGroupClicked && (
          <form
            className="absolute bg-gray-200 flex flex-col w-fit z-10 p-5 not-sm:p-1 border rounded-2xl"
            action=""
            onSubmit={createGroup}
          >
            <i
              onClick={() => setCreateGroupClicked(!createGroupClicked)}
              className="fa-solid fa-plus text-2xl"
            ></i>
            <label htmlFor="" className="text-2xl text-center m-5">
              Create New Group
            </label>
            <input
              className="text-2xl border-4 border-orange-200 rounded-lg bg-white mr-2"
              type="text"
              name="name"
              required
              placeholder="Enter Group name"
            />
            <br />
            <input
              className="text-2xl border-4 border-orange-200 rounded-lg bg-white mr-2"
              type="password"
              name="password"
              placeholder="Enter password"
              required
            />
            <br />
            <button className="p-2 not-sm:p-1 not-sm:text-xl text-2xl text-white bg-orange-400 border-2 border-orange-400 hover:scale-[95%] hover:text-orange-400 hover:bg-white  transition-transform rounded-xl">
              Create
            </button>
          </form>
        )}
      </div>
      <div className="fixed flex not-md:flex-col justify-between bottom-5 align-middle text-lg font-bold">
        <div
          className="  flex hover:bg-yellow-100 rounded-2xl"
          onClick={() => setCreateGroupClicked(!createGroupClicked)}
        >
          <i
            onClick={() => setCreateGroupClicked(!createGroupClicked)}
            className=" fa-solid fa-plus text-xl p-1.5"
          ></i>{" "}
          <p className="text-lg hover:bg-yellow-100 p-0.5">Create Group</p>
        </div>
        <div
          className=" flex  hover:bg-yellow-100 rounded-2xl"
          onClick={() => setJoinGroupClicked(!joinGroupClicked)}
        >
          <span className="material-symbols-outlined rounded-2xl  p-1.5">
            link
          </span>{" "}
          <p className="text-lg  pt-0.5"> Join Group</p>
        </div>
      </div>

      {joinGroupClicked && (
        <form
          className="absolute bg-gray-200 not-sm:p-1 flex flex-col z-10 p-5 border rounded-2xl"
          action=""
          onSubmit={joinGroup}
        >
          <i
            onClick={() => setJoinGroupClicked(!joinGroupClicked)}
            className="fa-solid fa-plus text-2xl"
          ></i>
          <label htmlFor="" className="text-2xl text-center m-5">
            Join Group
          </label>
          <input
            className="text-2xl border-4 border-orange-200 rounded-lg bg-white mr-2"
            type="text"
            name="name"
            required
            placeholder="Enter Group Id"
          />
          <br />
          <input
            className="text-2xl border-4 border-orange-200 rounded-lg bg-white mr-2"
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
          <br />
          <button className="p-2 not-sm:p-1 not-sm:text-xl text-2xl text-white bg-orange-400 border-2 border-orange-400 hover:scale-[95%] hover:text-orange-400 hover:bg-white  transition-transform rounded-xl">
            Join
          </button>
        </form>
      )}

      {createChatClicked && (
        <form
          className="absolute bg-gray-200 not-sm:p-1 flex flex-col z-10 p-5 border rounded-2xl"
          action=""
          onSubmit={createChat}
        >
          <i
            onClick={() => setCreateChatClicked(!createChatClicked)}
            className="fa-solid fa-plus text-2xl"
          ></i>
          <label htmlFor="" className="text-2xl text-center m-5">
            Create Chat
          </label>
          <input
            className="text-2xl border-4 border-orange-200 rounded-lg bg-white mr-2"
            type="text"
            name="name"
            required
            placeholder="Enter User Id"
          />
          <br />
          
          <button className="p-2 not-sm:p-1 not-sm:text-xl text-2xl text-white bg-orange-400 border-2 border-orange-400 hover:scale-[95%] hover:text-orange-400 hover:bg-white  transition-transform rounded-xl">
            Add
          </button>
        </form>
      )}
      <div className="mt-4 ">
        
        <div>
          <div className="p-4 flex justify-between not-sm:p-1">
              <button
                className={
                  chatIsOpen
                    ? "underline decoration-white not-sm:text-2xl  font-semibold md:text-3xl"
                    : "md:text-3xl not-sm:text-2xl  font-semibold"
                }
                onClick={() => {
                  setChatIsOpen(true);
                }}
              >
                Chats
              </button>
              <button
                className={
                  !chatIsOpen
                    ? "underline decoration-white font-semibold not-sm:text-2xl md:text-3xl"
                    : "md:text-3xl not-sm:text-2xl  font-semibold"
                }
                onClick={() => {
                  setChatIsOpen(false);
                }}
              >
                Groups
              </button>
            </div>
          {chatIsOpen ?  <div>
            {chats.map((chat) => {
          return (
            <div className="  align-middle hover:bg-yellow-100 rounded-2xl">
              <div className="flex justify-between">
                <div className=" flex">
                  <h1 className="p-3 px-4 my-1 rounded-full font-bold bg-white h-fit w-fit">
                    {chat.username.charAt(0).toUpperCase()}
                  </h1>
                  <h1
                    className="text-lg rounded p-2 font-semibold"
                    key={chat._id}
                    onClick={() => {setCurrentChat(chat); setCurrentGroup(false)}}
                  >
                    {chat.username}
                  </h1>
                </div>
              </div>
            </div>
          );
        })} </div> :
         <div> 
            {groups.map((group) => {
          return (
            <div className="  align-middle hover:bg-yellow-100 rounded-2xl">
              <div className="flex justify-between">
                <div className=" flex">
                  <h1 className="p-3 px-4 my-1 rounded-full font-bold bg-white h-fit w-fit">
                    {group.groupname.charAt(0).toUpperCase()}
                  </h1>
                  <h1
                    className="text-lg rounded p-2 font-semibold"
                    key={group._id}
                    onClick={() => {setCurrentGroup(group); setCurrentChat(false)}}
                  >
                    {group.groupname}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
         </div>}
        </div>
      
      </div>
    </div>
  );
};

export default GroupTab;
