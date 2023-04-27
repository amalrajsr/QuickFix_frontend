import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { fetchConversationsApi, sendConverstaionsApi } from "../../apis/chat";
import { useSelector } from "react-redux";
import { SOCKET_URL } from "../../config/socket";
import { io } from "socket.io-client";

function ChatModal({ open }) {
  const [currentChat, setcurrentChat] = useState("");
  const [conversations, setConversations] = useState([]);
  const [fetchConversation, setFetchConversations] = useState(false);
  const user = useSelector((state) => state.user.value);
  const scrollref = useRef();
  const inputRef = useRef();
  const socket = useRef();
  console.log("hello world");
  // creating web socket connection
  useEffect(() => {
    console.log("use effect");
    socket.current = io(SOCKET_URL);
  }, []);

  useEffect(() => {
    fetchConversationsApi(user._id)
      .then(({ data }) => {
        if (data.result[0].conversation) {
          setConversations(data.result[0].conversation);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [fetchConversation]);

  const sendMessage = () => {
    socket.current?.emit("send-message", {user:user._id,message:currentChat});

    sendConverstaionsApi("user", user?._id, {
      sender: "user",
      message: currentChat,
    })
      .then(({ data }) => {
        if (data.updated) {
          setcurrentChat("");
          setFetchConversations(!fetchConversation);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //use Effect for scrolling to last message and focusing input
  useEffect(() => {
    inputRef.current?.focus();
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, open]);

  if (!open) return null;
  return (
    <div className="chat-container z-20 rounded-lg fixed bottom-24 right-3 md:right-10 md:w-[380px] bg-[#F9FAFB]  shadow-sm  items-center">
      <div className="chat-header bg-slate-300 t h-1/6">
        <p className="text-center">
          We are live and ready to chat with you now. <br /> Say something to
          start a live chat.
        </p>
      </div>
      <div className="chat-body flex flex-col my-3 w-full  h-[350px] ">
        <ul className="space-y-2 overflow-y-scroll">
          {conversations.map((conversation) => {
            return (
              <div key={conversation._id}>
                <li
                  ref={scrollref}
                  className={`flex  ${
                    conversation?.sender === "admin"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div className=" mx-2 relative max-w-xl px-4 my-2 bg-light py-2 text-gray-700 rounded ">
                    <span className="block">{conversation.message}</span>
                  </div>
                </li>
              </div>
            );
            // <span className="mx-2 break-words my-3 bg-light rounded-lg   max-w-[250px] ">{conversation.message}</span>
          })}
        </ul>
      </div>
      <div className="chat-footer  flex justify-between bg-white shadow-md p-3 rounded   ">
        <input
          ref={inputRef}
          type="text"
          name=""
          placeholder="type here"
          value={currentChat}
          onChange={(e) => setcurrentChat(e.target.value)}
          className="focus:outline-none w-3/4 focus:border-0 "
          id=""
        />
        <AiOutlineSend
          onClick={sendMessage}
          className="my-auto  text-dark text-xl"
        />
      </div>
    </div>
  );
}

export default ChatModal;