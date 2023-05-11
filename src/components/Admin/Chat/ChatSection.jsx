import { useEffect, useRef, useState } from "react";
import { sendConverstaionsApi } from "../../../apis/chat";
import { AiOutlineSend } from "react-icons/ai";
import { SOCKET_URL } from "../../../config/socket";
import { io } from "socket.io-client";
function ChatSection({ user, conversations }) {
  const [currentChat, setcurrentChat] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [reload, setReload] = useState(false);
  const inputRef = useRef();
  const scrollRef = useRef();
  const socket = useRef();
  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (admin) socket.current = io(SOCKET_URL);
  }, []);

  socket.current?.on("getMessage", ({ senderId, message, sender }) => {
    setArrivalMessage({
      senderId,
      message,
      sender,
      date: Date.now(),
    });
  });

  useEffect(() => {
    socket.current.emit("addUsers", { role: "admin" });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [arrivalMessage, currentChat, user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentChat.trim().length > 0) {
      socket.current?.emit("send-message", {
        userId: user?._id,
        message: currentChat,
        sender: "admin",
      });
      setcurrentChat("");
      sendConverstaionsApi("admin", user?._id, {
        sender: "admin",
        message: currentChat,
        time: Date.now(),
      })
        .then(({ data }) => {
          if (data.updated) {
            setcurrentChat("");
            setReload(!reload);
          }
        })
        .catch((error) => {});
    }
  };
  //to update conversation array
  useEffect(() => {
    arrivalMessage &&
      conversations.push({
        message: arrivalMessage.message,
        sender: arrivalMessage.sender,
        time: arrivalMessage.date,
      });
    setReload(!reload);
  }, [arrivalMessage]);

  return (
    <div className=" md:col-span-2 my-4 md:my-0">
      <div className="w-full ">
        {user && (
          <div className="relative flex items-center p-3 border-b border-gray-300">
            <>
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={user.avatar}
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">
                {user.name}
              </span>
              {/* <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span> */}
            </>
          </div>
        )}
        <div className="relative w-full p-6 overflow-y-scroll h-[28rem]">
          {!user ? (
            <div className="flex justify-center  items-center h-full">
              <p>Please select a user to chat with</p>
            </div>
          ) : (
            <ul className="space-y-2 overflow-y-scroll">
              {conversations.length > 0 &&
                conversations.map((conversation, i) => {
                  return (
                    <div key={conversation._id || i}>
                      <li
                        key={conversation?._id}
                        className={`flex  ${
                          conversation?.sender === "admin"
                            ? "justify-end"
                            : "justify-start"
                        } `}
                      >
                        <div
                          ref={scrollRef}
                          className="relative max-w-xl    px-4 my-2 py-2 text-gray-700 rounded shadow"
                        >
                          <span className="block max-w-[400px] break-words">
                            {conversation?.message}
                          </span>
                        </div>
                      </li>
                    </div>
                  );
                })}
            </ul>
          )}
        </div>

        {user && (
          <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
            <form onSubmit={sendMessage} className="w-full flex">
              <input
                ref={inputRef}
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                value={currentChat}
                onChange={(e) => setcurrentChat(e.target.value)}
                required
              />
              <AiOutlineSend
                onClick={sendMessage}
                className="my-auto  text-dark text-xl"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatSection;
