import axios from "axios";

import { getAllMessages } from "../utils/APIRoute";

import "../styles/ChatTask.css";
import { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";

const ChatTask = ({ selectedChatUser, userProfile, messages, setMessages }) => {
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const getChatMessages = async () => {
    const idFrom = userProfile._id;
    const idTo = selectedChatUser._id;

    const { data } = await axios.get(`${getAllMessages}/${idFrom}/${idTo}`);

    if (!data.status) console.log(data.message);

    setMessages(data.chat);
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (selectedChatUser) {
      socket.on("receive-message", (receiveMessage) => {
        setArrivalMessage(receiveMessage);
      });
    }
  }, []);

  useEffect(() => {
    const getMessages = () => {
      getChatMessages();
    };
    getMessages();
  }, [selectedChatUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-output-tasks">
      {messages.map((box, index) => (
        <div
          ref={scrollRef}
          key={index}
          className={`chat-task ${box.sender === userProfile._id ? "" : "to"}`}
        >
          <div className="task-container">
            <div className="task">{box.message.text}</div>
            <p className="task-time">
              {new Date(box.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatTask;
