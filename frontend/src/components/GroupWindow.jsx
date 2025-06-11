import { useState } from "react";

const GroupWindow = ({ socket, currentGroup, user, messages }) => {
  const [message, setMessage] = useState("");
  let [showOptions, setShowOptions] = useState(false);

  const sendMessage = (e) => {
    e.preventDefault();
    const content = e.target.message.value;
    if (content.length === 0) return;

    socket.emit("send-message", {
      groupId: currentGroup._id,
      message: content,
      sender: user.id,
    });

    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  console.log(messages);

  return (
    <div className="fixed not-sm:w-[100vw]   bg-gray-200">
      <div
        className="absolute inset-0 w-screen h-screen bg-repeat bg-auto -z-10"
        style={{ backgroundImage: "url('../bg-text.jpeg')" }}
      ></div>

      <div className="h-full w-full flex">
        {currentGroup && (
          <div className="">
            <div className="flex justify-between p-1  bg-orange-300">
              <div className="flex ">
                <h1 className="p-3 px-4 my-1 rounded-full font-bold bg-white text-black h-fit w-fit">
                {currentGroup.groupname.charAt(0).toUpperCase()}
              </h1>
              <div className="p-4  text-2xl text-white">
                {currentGroup.groupname}
              </div>
              </div>
              
              <div>
                  <i onClick={()=>setShowOptions(!showOptions)} class="m-3  text-2xl fa-solid fa-ellipsis-vertical"></i>
              
              </div>
            </div>
              {showOptions && <div className="fixed right-5 top-12   w-fit rounded-2xl bg-yellow-100 p-2 "><p onClick={()=>{navigator.clipboard.writeText(currentGroup._id); setShowOptions(!showOptions)}}>copy group id</p></div>}

            <div className="p-4  md:w-[60vw] sm:w-[70vw] pb-32 h-[85vh] overflow-y-auto space-y-3">
              {messages.map((msg) => {
                const isSender = msg.sender?._id === user.id;
                return (
                  <div
                    key={msg._id}
                    className={`flex w-full ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg shadow ${
                        isSender
                          ? "bg-orange-400 text-white rounded-br-none"
                          : "bg-white text-orange-400 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm font-bold mb-1">
                        {msg.sender?.username}
                      </p>
                      <p className="text-base text-black">{msg.content}</p>
                    </div>
                  </div>
                );
              })}
              
            </div>
              
            <div className=" fixed  bottom-0">
              <form onSubmit={sendMessage} className="flex p-4 ">
                <input
                  type="text"
                  name="message"
                  placeholder="Type your message"
                  value={message}
                  onChange={handleChange}
                  className="p-2 text-2xl border-4 w-[40vw] border-orange-200 rounded-lg bg-white mr-2"
                />
                <button
                  type="submit"
                  className="text-xl bg-orange-400 text-white rounded px-4 py-2"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupWindow;
