import { useState } from "react";

const GroupWindow = ({ socket, currentGroup, user, messages }) => {
  const [message, setMessage] = useState("");

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

  console.log(messages)
  // messages.map((msg) => (
  //                 console.log(msg[1].content)
  //               ))
  return (
    <div className="fixed  min-w-screen bg-gray-200">
<div
  className="absolute inset-0 w-screen h-screen bg-repeat bg-auto -z-10"
  style={{ backgroundImage: "url('../bg-text.jpeg')" }}
></div>

      <div className="h-full w-full flex">
        {currentGroup && (
          <div className="mt-8">
            <div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat-round ..."></div>
            <div className="min-w-screen p-4 mt-8 pb-32 h-[95vh] overflow-y-scroll">
              {
                
                messages.map((msg) => (
                  
                     msg.sender?._id.toString()===user.id ? <div key={msg._id} className="mb-2 p-2 w-fit bg-white rounded shadow">
                    <p className="text-sm text-orange-400">{msg.sender?.username}</p>
                    <p>{msg.content}</p>
                  </div>:  <div key={msg._id} className="mb-2 p-2 w-fit right-0 bg-white rounded shadow">
                    <p className="text-sm text-orange-400">{msg.sender?.username}</p>
                    <p>{msg.content}</p>
                  </div>
                ))
              }
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
              <button type="submit" className="text-xl bg-orange-400 text-white rounded px-4 py-2">
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

