import axios from "axios";
import server from "../environment";
import { useState } from "react";

const GroupTab = ({
  user,
  groups,
  setGroups,
  currentGroup,
  setCurrentGroup,
}) => {
  let [joinGroupClicked, setJoinGroupClicked] = useState(false);
  let [createGroupClicked, setCreateGroupClicked] = useState(false);

  const createGroup = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${server.dev}/api/group/create`, {
      name: e.target.name.value,
      password: e.target.password.value,
      userId: user.id,
    });
    console.log(res);
    setGroups((prevGroups) => [...prevGroups, res.data]);
    setCreateGroupClicked(!createGroupClicked)
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
    setJoinGroupClicked(!joinGroupClicked)
  };

  console.log(groups)

  return (
    <div className="bg-orange-300  p-5 not-sm:p-2 rounded-2xl  md:w-[40vw] sm:w-[30vw] not-sm:w-[100w] h-[100vh]">
      <div className="">
        <img className="h-16 w-16" src=".././images.png" alt="" />
      </div>
      <div  className="flex justify-between">
        <h1 className="text-2xl ">All Groups</h1>
        <i
          onClick={() => setCreateGroupClicked(!createGroupClicked)}
          className=" fa-solid fa-plus text-2xl"
        ></i>
        {createGroupClicked && (
          <form
            className="absolute bg-gray-200 flex flex-col z-10 p-5 border rounded-2xl"
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
      
      <div className="fixed bottom-0 align-middle  " onClick={()=>setJoinGroupClicked(!joinGroupClicked)}> <span class="material-symbols-outlined">
link
</span>Join Group</div>
      {joinGroupClicked && (
          <form
            className="absolute bg-gray-200 flex flex-col z-10 p-5 border rounded-2xl"
            action=""
            onSubmit={joinGroup}
          >
            <i
          onClick={() =>setJoinGroupClicked(!joinGroupClicked)}
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
      <div className="mt-4">
        {groups.map((group) => {
          return (
            <div className=" flex ">
              <h1 className="p-3 px-4 my-1 rounded-full font-bold bg-gray-400 h-fit w-fit">{group.groupname.charAt(0)}</h1>
              <h1 className="text-lg rounded p-2 font-semibold" key={group._id} onClick={() => setCurrentGroup(group)}>
                {group.groupname}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupTab;
