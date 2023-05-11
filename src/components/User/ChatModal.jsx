import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { fetchConversationsApi, sendConverstaionsApi } from "../../apis/chat";
import { useSelector } from "react-redux";
import { SOCKET_URL } from "../../config/socket";
import { io } from "socket.io-client";

function ChatModal({ open }) {
  const [currentChat, setcurrentChat] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [conversations, setConversations] = useState([]);
  const user = useSelector((state) => state.user.value);
  const scrollref = useRef();
  const inputRef = useRef();
  const socket = useRef();

  // creating web socket connection

  useEffect(() => {
    if (user) {
      socket.current = io(SOCKET_URL);
      socket.current?.on("getMessage", ({ senderId, message, sender }) => {
        setArrivalMessage({
          senderId,
          message,
          sender,
          date: Date.now(),
        });
      });
    }
  }, []);

  useEffect(() => {
    user &&
      socket.current.emit("addUsers", { userId: user?._id, role: "user" });
  }, []);

  useEffect(() => {
    if (user) {
      fetchConversationsApi(user?._id)
        .then(({ data }) => {
          if (data?.result[0]?.conversation) {
            setConversations(data.result[0].conversation);
          }
        })
        .catch((error) => {});
    }
  }, []);

  // socket call for sending message
  const sendMessage = (e) => {
    if (currentChat.trim().length > 1) {
      e.preventDefault();
      socket.current?.emit("send-message", {
        userId: user._id,
        message: currentChat,
        sender: "user",
      });
      //api for saving messages in database
      sendConverstaionsApi("user", user?._id, {
        sender: "user",
        message: currentChat,
      })
        .then(({ data }) => {
          if (data.updated) {
            setcurrentChat("");
          }
        })
        .catch((error) => {
          setcurrentChat("");
        });
    }
  };

  //use Effect for scrolling to last message and focusing input
  useEffect(() => {
    inputRef.current?.focus();
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, open]);

  //to update conversation array
  useEffect(() => {
    arrivalMessage &&
      setConversations((prev) => [
        ...prev,
        { sender: arrivalMessage.sender, message: arrivalMessage.message },
      ]);
  }, [arrivalMessage]);

  if (!open) return null;
  return (
    <div className="chat-container z-20 rounded-xl fixed bottom-24 right-3 md:right-10 md:w-[380px] bg-[#F9FAFB]  shadow-sm  items-center">
      <div className="chat-header bg-dark rounded-t-md h-full">
        <p className="text-center text-white">
          We are live and ready to chat with you now. <br /> Say something to
          start a live chat.
        </p>
      </div>
      <div className="chat-body flex flex-col my-3 w-full  h-[350px] ">
        <ul className="space-y-2 overflow-y-scroll">
          {conversations.map((conversation) => {
            return (
              <div key={conversation?._id}>
                <li
                  ref={scrollref}
                  className={`flex  ${
                    conversation?.sender === "admin"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div className=" mx-2 relative max-w-xl px-4 my-2 bg-light py-2 text-gray-700 rounded ">
                    <span className="block max-w-[200px] break-words">
                      {conversation.message}
                    </span>
                  </div>
                </li>
              </div>
            );
            // <span className="mx-2 break-words my-3 bg-light rounded-lg   max-w-[250px] ">{conversation.message}</span>
          })}
        </ul>
      </div>
      <form onSubmit={sendMessage}>
        <div className="chat-footer  flex justify-between bg-white shadow-md p-3 rounded   ">
          <input
            ref={inputRef}
            type="text"
            name=""
            placeholder="type here"
            value={currentChat}
            onChange={(e) => setcurrentChat(e.target.value)}
            className="focus:outline-none w-11/12 focus:border-0 "
            id=""
          />

          <AiOutlineSend
            onClick={sendMessage}
            className="my-auto  text-dark text-xl"
          />
        </div>
      </form>
    </div>
  );
}

export default ChatModal;
